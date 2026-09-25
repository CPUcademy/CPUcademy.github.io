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
  return text.replace(
    /<h[1-6][^>]*>[\s\S]*?<\/h[1-6]>/gi,
    ''
  )
}

function removeCodeBlocks(text: string): string {
  return text.replace(/^\s*(```|~~~)[^\r\n]*\r?\n[\s\S]*?^\s*\1\s*$/gm, '')
}

function getBodyContent(content: string): string {
  return removeHtmlHeadings(
    removeMarkdownHeadings(
      removeCodeBlocks(
        removeFrontmatter(content)
      )
    )
  )
}

function getExcerpt(
  text: string,
  query: string
): string {
  const cleaned = cleanText(text)

  const index = cleaned
    .toLowerCase()
    .indexOf(query.toLowerCase())

  if (index === -1) {
    return cleaned.slice(0, 160)
  }

  const start = Math.max(
    0,
    index - 70
  )

  const end = Math.min(
    cleaned.length,
    index + query.length + 90
  )

  let excerpt = cleaned.slice(
    start,
    end
  )

  if (start > 0) {
    excerpt = '…' + excerpt
  }

  if (end < cleaned.length) {
    excerpt += '…'
  }

  return excerpt
}

export function searchContent(
  query: string
): SearchResult[] {
  const q = query
    .trim()
    .toLowerCase()

  if (!q) {
    return []
  }

  const wordRegex = new RegExp(`(?<!\\w)${q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}(?!\\w)`)
  const results: SearchResult[] = []

  for (const document of documents) {
    /*
     * 1. LESSON TITLE
     */
    if (
      document.title
        .toLowerCase()
        .includes(q)
    ) {
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
      if (
        heading.text
          .toLowerCase()
          .includes(q)
      ) {
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
        })
      }
    }

    /*
     * 3. REST OF THE MDX CONTENT
     */
    const body = cleanText(
      getBodyContent(document.content)
    )

    if (
      body
        .toLowerCase()
        .includes(q)
    ) {
      results.push({
        path: document.path,
        category: document.category,
        section: document.section,
        slug: document.slug,
        title: document.title,
        type: 'content',
        text: document.title,
        excerpt: getExcerpt(
          body,
          q
        ),
        priority: 2,
        wholeWord: wordRegex.test(body.toLowerCase()),
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

    return a.title.localeCompare(
      b.title
    )
  })
}
