import { Link, useLocation, useParams } from 'react-router-dom'
import { useEffect, useRef } from 'react'
import { tutorialPages, getNextPage, getPreviousPage  } from '../../content'
import type { SearchAnchor } from '../../content/search'
import LessonNavButtons, { scrollToTop } from '../buttons/LessonNavButtons'

function scrollToAnchor(root: HTMLElement, anchor: SearchAnchor) {
  const normalize = (s: string) => s.replace(/\s+/g, '').toLowerCase()
  const positions: [Text, number][] = []
  let text = ''
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT)

  for (let node = walker.nextNode() as Text | null; node; node = walker.nextNode() as Text | null) {
    for (let i = 0; i < node.data.length; i++) {
      if (/\s/.test(node.data[i])) continue
      text += node.data[i].toLowerCase()
      positions.push([node, i])
    }
  }

  const query = normalize(anchor.query)
  const before = normalize(anchor.before)
  const after = normalize(anchor.after)
  const candidates: [string, number][] = [[before + query + after, before.length], [query + after, 0], [before + query, before.length], [query, 0]]
  let start = -1

  for (const [needle, offset] of candidates) {
    const index = text.indexOf(needle)
    if (index !== -1) {
      start = index + offset
      break
    }
  }

  if (start === -1 || !query) return

  const [endNode, endOffset] = positions[start + query.length - 1]
  const range = document.createRange()
  range.setStart(...positions[start])
  range.setEnd(endNode, endOffset + 1)
  range.startContainer.parentElement?.scrollIntoView({ behavior: 'smooth', block: 'center' })
  CSS.highlights?.set('search', new Highlight(range))
}

function TutorialLesson() {
  const { category, topic, slug } = useParams<{ category: string; topic?: string; slug: string }>()
  const location = useLocation()
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    CSS.highlights?.delete('search')
    const anchor = location.state as SearchAnchor | null
    if (anchor?.query && contentRef.current) scrollToAnchor(contentRef.current, anchor)
  }, [location.key])

  const page = topic
    ? tutorialPages.find(p => p.category === category && p.section === topic && p.slug === slug)
    : tutorialPages.find(p => p.category === category && p.slug === slug)

  const subLessons = !topic && page
    ? tutorialPages.filter(p => p.category === category && p.section === page.slug).sort((a, b) => a.order - b.order)
    : []

  useEffect(() => {
    if (page) document.title = page.title
  }, [page])

  if (!page) return <div>Lesson not found.</div>

  const Content = page.Component

  if (subLessons.length > 0) {
    return (
      <div className="col-lg-12 mb-4">
        <div className="card shadow mb-4">
          <div className="card-header py-3"><h5 className="m-0 font-weight-bold">{page.title}</h5></div>
          <div className="card-body" ref={contentRef}>
            <Content />
            <ol className="tutorial-list">
              {subLessons.map(sub => (
                <li key={sub.slug}>
                  <Link to={`/tutorials/${category}/${page.slug}/${sub.slug}`} className="linkh" onClick={scrollToTop}>{sub.title}</Link>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    )
  }

  const next = topic
    ? tutorialPages.filter(p => p.category === category && p.section === topic).sort((a, b) => a.order - b.order).find(p => p.order > page.order) ?? null
    : getNextPage(page)
  const previous = topic
    ? [...tutorialPages.filter(p => p.category === category && p.section === topic)].sort((a, b) => b.order - a.order).find(p => p.order < page.order) ?? null
    : getPreviousPage(page)

  return (
    <div className="col-lg-12 mb-4">
        <div className="card shadow mb-4">
            <div className="card-header py-3"><h5 className="m-0 font-weight-bold">{page.title}</h5></div>
            <div className="card-body" ref={contentRef}>
                <LessonNavButtons current={page} previous={previous} next={next} topic={topic} top />
                <Content />
                <LessonNavButtons current={page} previous={previous} next={next} topic={topic} />
            </div>
        </div>
    </div>
  )
}

export default TutorialLesson