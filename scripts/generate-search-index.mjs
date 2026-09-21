// node scripts/generate-search-index.mjs

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const contentDir = path.resolve(__dirname, '../src/content')
const outputFile = path.resolve(contentDir, 'search-index.json')

function getFiles(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true })
  const files = []

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name)

    if (entry.isDirectory()) {
      files.push(...getFiles(fullPath))
    } else if (entry.isFile() && entry.name.endsWith('.mdx')) {
      files.push(fullPath)
    }
  }

  return files
}

function cleanText(text) {
  return text
    .replace(/<[^>]+>/g, ' ')
    .replace(/[*_`~]/g, '')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/\s+/g, ' ')
    .trim()
}

function getTitle(source, filename) {
  const frontmatter = source.match(/^---\s*\n([\s\S]*?)\n---/)?.[1]

  if (frontmatter) {
    const match = frontmatter.match(
      /^title:\s*(?:"([^"]+)"|'([^']+)'|(.+))$/m
    )

    if (match) {
      return match[1] ?? match[2] ?? match[3]?.trim() ?? filename
    }
  }

  const heading = source.match(/^#\s+(.+)$/m)

  if (heading) {
    return cleanText(heading[1])
  }

  return filename
}

function getHeadings(source) {
  const headings = []
  const lines = source.split(/\r?\n/)
  let inCodeBlock = false

  for (const line of lines) {
    if (/^\s*(```|~~~)/.test(line)) {
      inCodeBlock = !inCodeBlock
      continue
    }

    if (inCodeBlock) {
      continue
    }

    const match = line.match(
      /^\s{0,3}(#{1,6})\s+(.+?)\s*#*\s*$/
    )

    if (match) {
      headings.push({
        level: match[1].length,
        text: cleanText(match[2]),
      })
    }
  }

  const htmlRegex = /<h([1-6])[^>]*>([\s\S]*?)<\/h\1>/gi
  let match

  while ((match = htmlRegex.exec(source)) !== null) {
    headings.push({
      level: Number(match[1]),
      text: cleanText(match[2]),
    })
  }

  return headings
}

function getFileInfo(file) {
  const relative = path
    .relative(contentDir, file)
    .replace(/\.mdx$/, '')
    .replaceAll(path.sep, '/')

  const parts = relative.split('/')

  return {
    category: parts[0] ?? '',
    section: parts.length >= 3 ? parts[1] : '',
    slug: parts.at(-1) ?? '',
    path: './' + relative + '.mdx',
  }
}

const files = getFiles(contentDir)

const index = files.map(file => {
  const source = fs.readFileSync(file, 'utf8')
  const info = getFileInfo(file)

  return {
    ...info,
    title: getTitle(source, info.slug),
    headings: getHeadings(source),
    content: source,
  }
})

fs.writeFileSync(
  outputFile,
  JSON.stringify(index, null, 2),
  'utf8'
)

console.log(`Search index generated: ${index.length} MDX files`)