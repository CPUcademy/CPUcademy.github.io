import { useParams, Link } from 'react-router-dom'
import { useEffect } from 'react'
import { tutorialPages } from '../../content'
import { SECTION_ORDER, sectionTitle } from '../../content/sections'
import { scrollToTop } from '../buttons/LessonNavButtons'

function TutorialCategory() {
  const { category } = useParams<{ category: string }>()

  useEffect(() => {
    if (category) document.title = sectionTitle(category)
  }, [category])

  if (!category) return null

  const sectionsForCategory = SECTION_ORDER[category] ?? []
  const pagesInCategory = tutorialPages.filter(p => p.category === category)

  return (
    <>
      {sectionsForCategory.map(section => {
        const items = pagesInCategory
          .filter(p => p.section === section)
          .sort((a, b) => a.order - b.order)

        if (items.length === 0) return null

        return (
          <div className="col-md-6 col-lg-4 mb-4" key={section}>
            <div className="card shadow mb-4">
              <div className="card-header py-3"><h5 className="m-0 font-weight-bold">{sectionTitle(section)}</h5></div>
              <div className="card-body">
                <ol className="tutorial-list">
                  {items.map(item => (
                    <li key={item.slug}>
                      <Link to={`/tutorials/${category}/${item.slug}`} className="linkh" onClick={scrollToTop}>{item.title}</Link>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        )
      })}
    </>
  )
}

export default TutorialCategory