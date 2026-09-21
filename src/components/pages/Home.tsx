import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import courses from "../../content/websiteData/courses.json"
import projects from "../../content/websiteData/projects.json"
import type { Project } from "../../content/types"
import MediaButton from "../buttons/MediaButton"

type Course = { title: string, slug: string, folder: string, iconClass: string }

const coursesTyped = courses as Course[]
const featuredProjects = (projects as Project[]).filter((p) => p.featured)

function Home() {
    const [emailModalOpen, setEmailModalOpen] = useState(false)
    const [emailModalVisible, setEmailModalVisible] = useState(false)

    const openEmailModal = () => {
        setEmailModalVisible(true)
        requestAnimationFrame(() => setEmailModalOpen(true))
    }

    const closeEmailModal = () => {
        setEmailModalOpen(false)
        setTimeout(() => setEmailModalVisible(false), 200)
    }

    useEffect(() => {
        document.title = 'CPUcademy'
    }, [])

    return (
        <>
            <div className="col-lg-6 mb-4 noBottomMargin">
                <div className="card shadow mb-4">
                    <div className="card-header py-3">
                        <h5 className="m-0 font-weight-bold">Tutorials</h5>
                    </div>
                    <div className="card-body">
                        {coursesTyped.map((course) => (
                            <Link className="collapse-item" to={`/tutorials/${course.slug}`} style={{ textDecoration: "none" }} key={course.slug}>
                                <div className="tutorial-div">
                                    <h5 className="m-0 font-weight-bold tut" style={{ textDecoration: "none" }} dangerouslySetInnerHTML={{ __html: course.title }} />
                                    <img src={`${course.folder}/${course.slug}-icon.png`} alt="Icon" className={`st ${course.iconClass}`} />
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>

            <div className="col-lg-6 mb-4">
                <div className="card shadow mb-4">
                    <div className="card-header py-3">
                        <h5 className="m-0 font-weight-bold">Portfolio Projects</h5>
                        <div className="w-100 d-flex justify-content-start" style={{ padding: "8px 0", paddingBottom: "0px" }}>
                            <Link to="/about-me" className="small-button">Read More About Me</Link>
                        </div>
                    </div>
                    <div className="card-body row">
                        {featuredProjects.map((project) => (
                            <div className="col-lg-5 col-md-6 col-sm-6" key={project.title}>
                                <a href={project.url} className="a-project" target="_blank" rel="noreferrer">
                                    <div className="project-card card shadow mb-4">
                                        <img src={project.logo} alt="Icon" className="i-project i-project2" style={{ marginTop: "5px" }} />
                                        <span className="p-project">
                                            <p><b>{project.title}:</b> <span dangerouslySetInnerHTML={{ __html: project.description }} /></p>
                                        </span>
                                    </div>
                                </a>
                            </div>
                        ))}
                    </div>
                    <div className="w-100 d-flex justify-content-end" style={{ padding: "12px 13px" }}>
                        <Link to="/portfolio-projects" className="small-button">See All</Link>
                    </div>
                </div>

                <div className="row">
                    <MediaButton name="github" url="https://github.com/CPUcademy" openEmailModal={openEmailModal} />
                    <MediaButton name="medium" url="https://medium.com/@cpucademy" openEmailModal={openEmailModal} />
                    <MediaButton name="pypi" url="https://pypi.org/user/CPUcademy/" openEmailModal={openEmailModal} />
                    <MediaButton name="linkedin" url="https://www.linkedin.com/in/tymoteusz-ko%C5%82odziejczyk-828123344/" openEmailModal={openEmailModal} />
                    <MediaButton name="youtube" url="https://www.youtube.com/@cpu-cademy/" openEmailModal={openEmailModal} />
                    <MediaButton name="gmail" url="" openEmailModal={openEmailModal} />

                    {emailModalVisible && (
                        <>
                            <div className="modal fade" style={{ display: 'block', opacity: emailModalOpen ? 1 : 0, transition: 'opacity 0.2s ease' }} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                <div className="modal-dialog" role="document" style={{ transform: emailModalOpen ? 'none' : 'translate(0, -50px)', transition: 'transform 0.2s ease' }}>
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <h5 className="modal-title" id="exampleModalLabel">E-mail address</h5>
                                            <button type="button" className="close" aria-label="Close" onClick={closeEmailModal}>
                                                <span aria-hidden="true">&times;</span>
                                            </button>
                                        </div>
                                        <div className="modal-body">If you have any suggestions, requests, corrections, ideas, or business matters, please contact me at <b>cpucademy@gmail.com</b></div>
                                        <div className="modal-footer">
                                            <button type="button" className="btn btn-secondary" onClick={closeEmailModal}>Close</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="modal-backdrop fade" style={{ opacity: emailModalOpen ? 0.5 : 0, transition: 'opacity 0.2s ease' }} onClick={closeEmailModal}></div>
                        </>
                    )}
                </div>
            </div>
        </>
    )
}

export default Home