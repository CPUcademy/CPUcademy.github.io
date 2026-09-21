import { Link, useParams } from 'react-router-dom'
import { useEffect } from 'react'
import { tutorialPages, getNextPage, getPreviousPage  } from '../../content'
import LessonNavButtons, { scrollToTop } from '../buttons/LessonNavButtons'

function TutorialLesson() {
  const { category, topic, slug } = useParams<{ category: string; topic?: string; slug: string }>()

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
          <div className="card-header py-3">
            <h5 className="m-0 font-weight-bold">{page.title}</h5>
          </div>
          <div className="card-body">
            <Content />
            <ol className="tutorial-list">
              {subLessons.map(sub => (
                <li key={sub.slug}>
                  <Link to={`/tutorials/${category}/${page.slug}/${sub.slug}`} className="linkh" onClick={scrollToTop}>
                    {sub.title}
                  </Link>
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
            <div className="card-header py-3">
                <h5 className="m-0 font-weight-bold">{page.title}</h5>
            </div>
            <div className="card-body">
                <LessonNavButtons current={page} previous={previous} next={next} topic={topic} top />
                <Content />
                <LessonNavButtons current={page} previous={previous} next={next} topic={topic} />
            </div>
        </div>
    </div>
  )
}

export default TutorialLesson