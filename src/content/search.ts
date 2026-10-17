import searchIndex from './search-index.json'

export type SearchResult = {
  path: string
  category: string
  section: string
  slug: string
  title: string
  type: 'title' | 'heading' | 'content'
  headingLevel?: number
  text: string
  excerpt: string
  priority: number
  wholeWord: boolean
  anchor?: SearchAnchor
}

export type SearchAnchor = {
  query: string
  before: string
  after: string
}

type SearchDocument = {
  path: string
  category: string
  section: string
  slug: string
  title: string
  headings: {
    level: number
    text: string
  }[]
  content: string
}

const entityDecoder = document.createElement('textarea')

function decodeEntities(text: string): string {
  entityDecoder.innerHTML = text
  return entityDecoder.value
}

const documents = (searchIndex as SearchDocument[]).map((doc) => ({
  ...doc,
  title: decodeEntities(doc.title),
  headings: doc.headings.map((h) => ({ ...h, text: decodeEntities(h.text) })),
}))

function cleanText(text: string): string {
  return decodeEntities(text.replace(/<[^>]+>/g, ' '))
    .replace(/[*_`~]/g, '')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/\s+/g, ' ')
    .trim()
}

function removeFrontmatter(text: string): string {
  return text.replace(/^---\s*\n[\s\S]*?\n---\s*\n?/, '')
}

function removeMarkdownHeadings(text: string): string {
  return text.replace(/^\s{0,3}#{1,6}\s+.+$/gm, '')
}

function removeHtmlHeadings(text: string): string {
  return text.replace(/<h[1-6][^>]*>[\s\S]*?<\/h[1-6]>/gi, '')
}

function removeCodeBlocks(text: string): string {
  return text.replace(/^\s*(```|~~~)[^\r\n]*\r?\n[\s\S]*?^\s*\1\s*$/gm, '')
}

function getBodyContent(content: string): string {
  return removeHtmlHeadings(removeMarkdownHeadings(removeCodeBlocks(removeFrontmatter(content))))
}

function getAnchor(text: string, index: number, query: string): SearchAnchor {
  return {
    query,
    before: text.slice(Math.max(0, index - 30), index),
    after: text.slice(index + query.length, index + query.length + 30),
  }
}

function getExcerpt(cleaned: string, index: number, length: number): string {
  const start = Math.max(0, index - 70)

  const end = Math.min(cleaned.length, index + length + 90)

  let excerpt = cleaned.slice(start, end)

  if (start > 0) {
    excerpt = '…' + excerpt
  }

  if (end < cleaned.length) {
    excerpt += '…'
  }

  return excerpt
}

export function searchContent(query: string): SearchResult[] {
  const q = query.trim().toLowerCase()

  if (!q) {
    return []
  }

  const wordRegex = new RegExp(`(?<!\\w)${q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}(?!\\w)`)
  const results: SearchResult[] = []

  for (const document of documents) {
    /*
     * 1. LESSON TITLE
     */
    if (document.title.toLowerCase().includes(q)) {
      results.push({
        path: document.path,
        category: document.category,
        section: document.section,
        slug: document.slug,
        title: document.title,
        type: 'title',
        text: document.title,
        excerpt: document.title,
        priority: 0,
        wholeWord: wordRegex.test(document.title.toLowerCase()),
      })
    }

    /*
     * 2. H1-H6 HEADINGS
     */
    for (const heading of document.headings) {
      const headingIndex = heading.text.toLowerCase().indexOf(q)

      if (headingIndex !== -1) {
        results.push({
          path: document.path,
          category: document.category,
          section: document.section,
          slug: document.slug,
          title: document.title,
          type: 'heading',
          headingLevel: heading.level,
          text: heading.text,
          excerpt: heading.text,
          priority: 1,
          wholeWord: wordRegex.test(heading.text.toLowerCase()),
          anchor: getAnchor(heading.text, headingIndex, q),
        })
      }
    }

    /*
     * 3. REST OF THE MDX CONTENT
     */
    const body = cleanText(getBodyContent(document.content))
    const lowerBody = body.toLowerCase()

    for (let index = lowerBody.indexOf(q); index !== -1; index = lowerBody.indexOf(q, index + q.length)) {
      results.push({
        path: document.path,
        category: document.category,
        section: document.section,
        slug: document.slug,
        title: document.title,
        type: 'content',
        text: document.title,
        excerpt: getExcerpt(body, index, q.length),
        priority: 2,
        wholeWord: wordRegex.test(lowerBody.slice(Math.max(0, index - 1), index + q.length + 1)),
        anchor: getAnchor(body, index, q),
      })
    }
  }

  return results.sort((a, b) => {
    if (a.wholeWord !== b.wholeWord) {
      return a.wholeWord ? -1 : 1
    }

    if (a.priority !== b.priority) {
      return a.priority - b.priority
    }

    return a.title.localeCompare(b.title)
  })
}
