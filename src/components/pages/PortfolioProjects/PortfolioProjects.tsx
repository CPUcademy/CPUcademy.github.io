import { useEffect } from 'react'
import './PortfolioProjects.css'
import projects from '../../../content/websiteData/projects.json'
import type { Project } from '../../../content/types'

const projectsTyped = projects as Project[]

function PortfolioProjects() {
  useEffect(() => {
    document.title = 'Portfolio Projects'
  }, [])

  return (
    <>
      <div className="col-lg-12 mb-4">
        <div className="card shadow mb-4">
          <div className="card-header py-3"><h5 className="m-0 font-weight-bold">Portfolio Projects</h5></div>
          <div className="card-body row">
            {projectsTyped.map((project) => (
              <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6" key={project.title}>
                <a href={project.url} className="a-project" target="_blank" rel="noreferrer">
                  <div className="project-card card shadow mb-4">
                    <img src={project.logo} alt="Icon" className="i-project" style={{ marginTop: "5px" }} />
                    <span className="p-project">
                      <p style={{ marginBottom: "-2px" }}><b>{project.title}:</b> <span dangerouslySetInnerHTML={{ __html: project.description }} /></p>
                    </span>
                    <div className="project-tags">
                      {project.tags.map((tag) => (
                        <span className={`tag tag-${tag.color}`} key={tag.label}>{tag.label}</span>
                      ))}
                    </div>
                  </div>
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default PortfolioProjects