import { Link, useLocation } from 'react-router-dom'
import { useEffect, useRef } from 'react'

function Navbar({ sidebarToggled, tutorialsOpen, setTutorialsOpen, contentRef, height }: {
    sidebarToggled: boolean, tutorialsOpen: boolean, setTutorialsOpen: (value: boolean) => void, contentRef: React.RefObject<HTMLDivElement | null>, height: number }) {
    const location = useLocation()
    const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
    const isTutorialsActive = location.pathname.startsWith('/tutorials')

    const handleTutorialLinkClick = () => {
        closeTimeoutRef.current = setTimeout(() => {
            setTutorialsOpen(false)
        }, 50)
    }

    useEffect(() => {
        if (!isTutorialsActive && tutorialsOpen)
            setTutorialsOpen(false)
    }, [isTutorialsActive])

    useEffect(() => {
        return () => {
            if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current)
        }
    }, [])

    return (
        <>
            <ul className={`navbar-nav sidebar sidebar-dark accordion ${sidebarToggled ? 'toggled' : ''}`} id="accordionSidebar" style={{ backgroundColor: "#157267" }}>
                <Link className="sidebar-brand d-flex align-items-center justify-content-center" to="/">
                    <img src="/icons/main/logo.png" alt="Logo" id="logo" />
                    <div className="sidebar-brand-text mx-3">CPUcademy</div>
                </Link>

                <hr className="sidebar-divider my-0"/>
                <li className={`nav-item ${location.pathname === '/' ? 'active' : ''}`}>
                    <Link className="nav-link" to="/">
                        <i className="icon-home"></i>
                        <span>Home</span>
                    </Link>
                </li>
                <hr className="sidebar-divider" style={{ marginBottom: "0px" }} />
                <li className={`nav-item ${tutorialsOpen || isTutorialsActive ? 'active' : ''}`}>
                    <a className="nav-link collapsed" href="#" onClick={(e) => { e.preventDefault(); setTutorialsOpen(!tutorialsOpen) }} aria-expanded={tutorialsOpen} aria-controls="collapseTwo">
                        <i className="icon-th-list"></i>
                        <span>Tutorials</span>
                    </a>
                    <div id="collapseTwo" ref={contentRef} className="collapse" style={{ display: 'block', height: `${height}px`, overflow: 'hidden', transition: 'height 0.35s ease' }} aria-labelledby="headingTwo">
                        <div className="bg-white py-2 collapse-inner rounded">
                            <Link className="collapse-item" to="/tutorials/python" onClick={handleTutorialLinkClick}>Python</Link>
                            <Link className="collapse-item" to="/tutorials/java" onClick={handleTutorialLinkClick}>Java</Link>
                            <Link className="collapse-item" to="/tutorials/cpp" onClick={handleTutorialLinkClick}>C++</Link>
                            <Link className="collapse-item" to="/tutorials/web" onClick={handleTutorialLinkClick}>Basic Web Stack</Link>
                            <Link className="collapse-item" to="/tutorials/databases" onClick={handleTutorialLinkClick}>Databases</Link>
                            <Link className="collapse-item" to="/tutorials/electronics-and-it-basics" onClick={handleTutorialLinkClick}>Electronics &amp; IT Basics</Link>
                        </div>
                    </div>
                </li>
                <hr className="sidebar-divider my-0"/>
                <li className={`nav-item ${location.pathname === '/about-me' ? 'active' : ''}`}>
                    <Link className="nav-link" to="/about-me">
                        <i className="icon-adult"></i>
                        <span>About Me</span>
                    </Link>
                </li>
                <hr className="sidebar-divider my-0"/>
                <li className={`nav-item ${location.pathname === '/portfolio-projects' ? 'active' : ''}`}>
                    <Link className="nav-link" to="/portfolio-projects">
                        <i className="icon-docs"></i>
                        <span>Portfolio Projects</span>
                    </Link>
                </li>
                <hr className="sidebar-divider my-0"/>
                <li className={`nav-item ${location.pathname === '/search' ? 'active' : ''}`}>
                    <Link className="nav-link" to="/search">
                        <i className="icon-search"></i>
                        <span>Search Tutorials</span>
                    </Link>
                </li>
                <hr className="sidebar-divider"/>
            </ul>
        </>
    )
}

export default Navbar