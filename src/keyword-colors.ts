import type { ShikiTransformer } from 'shiki'
import keywordColors from './keyword-colors.json' with { type: 'json' }

type Category = { color: string; words?: string[]; signs?: string[] }
type LanguageConfig = { comments: Category; text: Category; signs: Category; keywords: Category; commands: Category; embeddedTags?: string[] }

export const languageColors = keywordColors as Record<string, LanguageConfig>

const pythonContextWords = new Map([['e', /\bmath\.$/], ['gcd', /\bmath\.$/], ['key', /\bsort(?:ed)?\b/], ['encrypt', /\b(?:cipher|public_key)\.$/], ['decrypt', /\b(?:cipher|private_key)\.$/], ['public_key', /\bprivate_key\.$/], ['name', /(?:\bp\.|\.filter_by\()\s*$|\bUser\(/], ['age', /\bUser\(/]])

const defaultCodeColor = '#E1E4E8'
function escapeRegExp(value: string): string { return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') }

export const languageCategoryTransformer: ShikiTransformer = {
  name: 'language-category-colors',
  tokens(lines) {
    const language = this.options.lang.toLowerCase()
    const config = languageColors[language]
    if (!config) return
    if (language === 'hjson') return lines.map(line => line.map(token => ({ ...token, color: defaultCodeColor })))
    const keywordColors = new Map([...(config.keywords.words ?? []).map(word => [word, config.keywords.color] as const), ...(config.commands.words ?? []).map(word => [word, config.commands.color] as const)])
    const embeddedTags = new Set(config.embeddedTags ?? [])
    const markupWords = new Set(language === 'html' ? [...keywordColors.keys()] : embeddedTags)
    for (const tag of embeddedTags) if (!keywordColors.has(tag)) keywordColors.set(tag, config.commands.color)
    const cssProperties = new Set(language === 'css' ? config.keywords.words : [])
    const words = [...keywordColors.keys()].sort((a, b) => b.length - a.length).map(escapeRegExp)
    const signPattern = /(?<!\w)_(?!\w)|[!#$%&*+/:;<=>?@[\]\\^`{|}~-]/
    const isSql = language === 'sql' || language === 'mysql'
    const sqlFlagPattern = /(?<![\w-])--?[A-Za-z][\w-]*/
    const spreadPattern = ['java', 'javascript', 'typescript', 'cpp', 'php'].includes(language) ? `\\.{3}|${language === 'php' ? '&#?\\w+;|' : ''}` : isSql ? `${sqlFlagPattern.source}|` : language === 'html' ? '&#?\\w+;|' : ''
    const pattern = new RegExp(`${words.length ? `(?<![-\\w])(?:${words.join('|')})\\b` : '(?!x)x'}|${spreadPattern}${signPattern.source}`, 'g')
    let activeQuote: string | null = null
    let activeTripleQuote: string | null = null
    let tripleQuotePrefix = ''
    let insideTripleQuoteComment = false
    let lastStringPrefix = ''
    let insideEmbeddedTag = false
    let cssBraceDepth = 0
    let insideBlockComment = false
    let insideLineComment = false
    const stringPrefixPattern = /(?<!\w)(?:[fFrRbBuU]|[fFrRbB][rRbB])$/
    const stringPrefixes = new Set<unknown>()
    let activeHeredoc: string | null = null
    const heredocTokens = new Set<unknown>()
    const markHeredoc = (line: (typeof lines)[number]) => {
      const text = line.map(token => token.content).join('')
      const closing = activeHeredoc ? text.match(new RegExp(`^\\s*${activeHeredoc}\\b`)) : null
      const opening = activeHeredoc ? null : text.match(/<<<\s*(['"]?)(\w+)\1\s*$/)
      if (!activeHeredoc && !opening) return line
      const textStart = opening?.index ?? 0
      const textEnd = closing ? closing[0].length : text.length
      activeHeredoc = opening ? opening[2] : closing ? null : activeHeredoc
      let lineOffset = 0
      return line.flatMap(token => {
        const start = lineOffset
        lineOffset += token.content.length
        const cuts = [start, Math.min(Math.max(textStart, start), lineOffset), Math.min(Math.max(textEnd, start), lineOffset), lineOffset]
        return cuts.slice(1).flatMap((cut, part) => {
          if (cut === cuts[part]) return []
          const piece = { ...token, content: token.content.slice(cuts[part] - start, cut - start), offset: token.offset + cuts[part] - start }
          if (part === 1) heredocTokens.add(piece)
          return [piece]
        })
      })
    }
    return lines.map(line => (language === 'python' ? line.flatMap((token, index) => {
      const prefix = /^["']/.test(line[index + 1]?.content ?? '') ? token.content.match(stringPrefixPattern) : null
      if (!prefix) return [token]
      const head = token.content.slice(0, token.content.length - prefix[0].length)
      const tail = { ...token, content: prefix[0], offset: token.offset + head.length }
      stringPrefixes.add(tail)
      return head ? [{ ...token, content: head }, tail] : [tail]
    }) : isSql ? line.flatMap(token => {
      const commentStart = /^\s*--[A-Za-z]/.test(token.content) ? token.content.search(/\s--(?:\s|$)/) : -1
      if (commentStart === -1) return [token]
      return [{ ...token, content: token.content.slice(0, commentStart) }, { ...token, content: token.content.slice(commentStart), offset: token.offset + commentStart }]
    }).reduce<typeof line>((merged, token) => {
      const last = merged[merged.length - 1]
      if (last && /(?:^|\s)-$/.test(last.content) && /^[A-Za-z]/.test(token.content)) merged[merged.length - 1] = { ...last, content: last.content + token.content }
      else merged.push(token)
      return merged
    }, []) : language === 'php' ? markHeredoc(line.reduce<typeof line>((merged, token) => {
      const last = merged[merged.length - 1]
      if (last && /&#?\w*$/.test(last.content) && /^[#\w;]/.test(token.content)) merged[merged.length - 1] = { ...last, content: last.content + token.content }
      else merged.push(token)
      return merged
    }, [])) : line).flatMap((token, index, lineTokens) => {
      if (index === 0) insideTripleQuoteComment = false
      if (index === 0) insideLineComment = false
      if (insideLineComment) return [{ ...token, color: config.comments.color }]
      if (heredocTokens.has(token)) return [{ ...token, color: config.text.color }]
      if (stringPrefixes.has(token)) {
        lastStringPrefix = token.content
        return [{ ...token, color: config.text.color }]
      }
      const tokenPrefix = lastStringPrefix
      lastStringPrefix = ''
      const isSqlArgument = language === 'sql' && token.color === config.comments.color && /^\s*--[A-Za-z]/.test(token.content)
      if (insideBlockComment || ((token.type === 1 || token.color === config.comments.color) && !isSqlArgument)) {
        const start = token.content.lastIndexOf('/*')
        const end = token.content.lastIndexOf('*/')
        if (end > start) insideBlockComment = false
        else if (start !== -1 && config.comments.signs?.includes('/*')) insideBlockComment = true
        return [{ ...token, color: config.comments.color }]
      }
      const source = { ...token, color: defaultCodeColor }
      const result: typeof source[] = []
      const updateTagState = (text: string, following: string) => {
        for (let i = 0; i < text.length; i++) {
          const character = text[i]
          if (character === '<' && /^[A-Za-z/!]/.test(text[i + 1] ?? following)) insideEmbeddedTag = true
          if (character === '>') insideEmbeddedTag = false
          if (language === 'css' && character === '{') cssBraceDepth++
          if (language === 'css' && character === '}') cssBraceDepth = Math.max(0, cssBraceDepth - 1)
        }
      }
      let position = 0
      while (position < source.content.length) {
        if (activeTripleQuote) {
          const end = source.content.indexOf(activeTripleQuote, position)
          const bodyEnd = end === -1 ? source.content.length : end
          if (!tripleQuotePrefix) result.push({ ...source, content: source.content.slice(position, end === -1 ? bodyEnd : end + 3), offset: source.offset + position, color: config.comments.color })
          else {
            const body = source.content.slice(position, bodyEnd)
            const commentStart = !/r/i.test(tripleQuotePrefix) ? -1 : insideTripleQuoteComment ? 0 : body.search(/(?<!\\)#/)
            const split = commentStart === -1 ? body.length : commentStart
            if (split) result.push({ ...source, content: body.slice(0, split), offset: source.offset + position, color: config.text.color })
            if (split < body.length) {
              insideTripleQuoteComment = true
              result.push({ ...source, content: body.slice(split), offset: source.offset + position + split, color: config.comments.color })
            }
            if (end !== -1) result.push({ ...source, content: activeTripleQuote, offset: source.offset + end, color: config.text.color })
          }
          if (end === -1) break
          activeTripleQuote = null
          insideTripleQuoteComment = false
          position = end + 3
          continue
        }
        if (activeQuote) {
          const end = source.content.indexOf(activeQuote, position)
          const textEnd = end === -1 ? source.content.length : end + 1
          result.push({ ...source, content: source.content.slice(position, textEnd), offset: source.offset + position, color: config.text.color })
          if (end === -1) break
          activeQuote = null
          position = textEnd
          continue
        }

        const quotePattern = language === 'php' || language === 'html' ? /["`]|'(?!\w)|(?<!\w)'/g : /["'`]/g
        const previousCharacter = index ? lineTokens[index - 1].content.slice(-1) : ''
        quotePattern.lastIndex = position + previousCharacter.length
        const quoteMatch = quotePattern.exec(previousCharacter + source.content + (lineTokens[index + 1]?.content[0] ?? ''))
        const quoteStart = quoteMatch && quoteMatch.index - previousCharacter.length < source.content.length ? quoteMatch.index - previousCharacter.length : -1
        const commentPattern = /(?<![:\w/])\/\//g
        commentPattern.lastIndex = position + previousCharacter.length
        const commentMatch = config.comments.signs?.includes('//') ? commentPattern.exec(previousCharacter + source.content) : null
        const commentStart = commentMatch ? commentMatch.index - previousCharacter.length : -1
        const isCommentFirst = commentStart !== -1 && (quoteStart === -1 || commentStart < quoteStart)
        const normalEnd = isCommentFirst ? commentStart : quoteStart === -1 ? source.content.length : quoteStart
        const normalSource = { ...source, content: source.content.slice(position, normalEnd), offset: source.offset + position }
        const matches = [...normalSource.content.matchAll(pattern)]
        let normalPosition = 0
        for (const match of matches) {
          const start = match.index ?? 0
          updateTagState(normalSource.content.slice(normalPosition, start), match[0])
          const tagAtMatch = insideEmbeddedTag
          if (start > normalPosition) result.push({ ...normalSource, content: normalSource.content.slice(normalPosition, start), offset: normalSource.offset + normalPosition })
          const lineBefore = lineTokens.slice(0, index).map(t => t.content).join('') + source.content.slice(0, position + start)
          const lineAfter = source.content.slice(position + start + match[0].length) + lineTokens.slice(index + 1).map(t => t.content).join('')
          const isCssProperty = language === 'css' && cssProperties.has(match[0]) && /^\s*:/.test(lineAfter) && (cssBraceDepth > 0 || /\(\s*$/.test(lineBefore))
          const isEmbeddedOnly = markupWords.has(match[0]) && (language === 'html' || (!config.commands.words?.includes(match[0]) && !config.keywords.words?.includes(match[0])))
          const isCssPercent = language === 'css' && match[0] === '%'
          const isMarkupText = embeddedTags.size > 0 && keywordColors.has(match[0]) && /(?:<(?!script\b|style\b)[A-Za-z][^<>]*>|\?>)[^<>{}]*$/i.test(lineBefore) && /^[^<>{}]*<[/?]/.test(lineAfter)
          const isCssOutOfContext = language === 'css' &&!tagAtMatch && !isEmbeddedOnly && !isCssProperty && keywordColors.has(match[0]) && !match[0].startsWith('@') && !/:$/.test(lineBefore) && !(cssBraceDepth > 0 && /:[^;{}]*$/.test(lineBefore))
          const contextPrefix = language === 'python' ? pythonContextWords.get(match[0]) : undefined
          const isOutOfContext = contextPrefix !== undefined && !contextPrefix.test(lineBefore)
          const color = isCssProperty ? config.keywords.color : isSql && new RegExp(`^${sqlFlagPattern.source}$`).test(match[0]) ? config.commands.color : keywordColors.get(match[0]) ?? config.signs.color
          result.push({ ...normalSource, content: match[0], offset: normalSource.offset + start, color: (isEmbeddedOnly && !tagAtMatch) || isOutOfContext || isCssOutOfContext || isCssPercent || isMarkupText ? defaultCodeColor : color })
          normalPosition = start + match[0].length
          updateTagState(match[0], lineAfter)
        }
        updateTagState(normalSource.content.slice(normalPosition), source.content.slice(normalEnd) + (lineTokens[index + 1]?.content ?? ''))
        if (normalPosition < normalSource.content.length) result.push({ ...normalSource, content: normalSource.content.slice(normalPosition), offset: normalSource.offset + normalPosition })
        if (isCommentFirst) {
          result.push({ ...source, content: source.content.slice(commentStart), offset: source.offset + commentStart, color: config.comments.color })
          insideLineComment = true
          break
        }
        if (quoteStart === -1) break
        const tripleQuote = source.content.slice(quoteStart, quoteStart + 3)
        if (language === 'python' && (tripleQuote === '"""' || tripleQuote === "'''")) {
          activeTripleQuote = tripleQuote
          const isStatement = !/\S/.test(lineTokens.slice(0, index).map(t => t.content).join('') + source.content.slice(0, quoteStart))
          tripleQuotePrefix = quoteStart === 0 && tokenPrefix ? tokenPrefix : isStatement ? '' : '"'
          result.push({ ...source, content: tripleQuote, offset: source.offset + quoteStart, color: tripleQuotePrefix ? config.text.color : config.comments.color })
          position = quoteStart + 3
          continue
        }
        activeQuote = source.content[quoteStart]
        const end = source.content.indexOf(activeQuote, quoteStart + 1)
        const textEnd = end === -1 ? source.content.length : end + 1
        result.push({ ...source, content: source.content.slice(quoteStart, textEnd), offset: source.offset + quoteStart, color: config.text.color })
        if (end === -1) break
        activeQuote = null
        position = textEnd
      }
      return result.length ? result : [source]
    }))
  },
}
