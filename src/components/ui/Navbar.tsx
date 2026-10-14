import { Link, useLocation } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'

type InstallPromptEvent = Event & { prompt: () => Promise<void> }

const tutorialLinks = [
    ['/tutorials/python', 'Python'],
    ['/tutorials/java', 'Java'],
    ['/tutorials/cpp', 'C++'],
    ['/tutorials/web', 'Basic Web Stack'],
    ['/tutorials/databases', 'Databases'],
    ['/tutorials/electronics-and-it-basics', 'Electronics & IT Basics'],
]

function Navbar({ sidebarToggled, tutorialsOpen, setTutorialsOpen, contentRef, height }: {
    sidebarToggled: boolean, tutorialsOpen: boolean, setTutorialsOpen: (value: boolean) => void, contentRef: React.RefObject<HTMLDivElement | null>, height: number }) {
    const location = useLocation()
    const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
    const isTutorialsActive = location.pathname.startsWith('/tutorials')
    const [installPrompt, setInstallPrompt] = useState<InstallPromptEvent | null>(null)
    const [bottomTutorialsOpen, setBottomTutorialsOpen] = useState(false)

    useEffect(() => setBottomTutorialsOpen(false), [location.pathname])

    useEffect(() => {
        const handlePrompt = (e: Event) => { e.preventDefault(); setInstallPrompt(e as InstallPromptEvent) }
        const handleInstalled = () => setInstallPrompt(null)
        window.addEventListener('beforeinstallprompt', handlePrompt)
        window.addEventListener('appinstalled', handleInstalled)
        return () => {
            window.removeEventListener('beforeinstallprompt', handlePrompt)
            window.removeEventListener('appinstalled', handleInstalled)
        }
    }, [])

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
                            {tutorialLinks.map(([to, label]) => <Link key={to} className="collapse-item" to={to} onClick={handleTutorialLinkClick}>{label}</Link>)}
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
                {installPrompt && (
                    <>
                        <hr className="sidebar-divider my-0 d-md-none"/>
                        <li className="nav-item d-md-none">
                            <a className="nav-link" href="#" onClick={(e) => { e.preventDefault(); installPrompt.prompt().then(() => setInstallPrompt(null)) }}>
                                <i className="fa fa-download"></i>
                                <span>Install App</span>
                            </a>
                        </li>
                    </>
                )}
                <hr className="sidebar-divider"/>
            </ul>

            {bottomTutorialsOpen && (
                <div className="bottom-nav-menu">
                    {tutorialLinks.map(([to, label]) => <Link key={to} to={to} className={location.pathname.startsWith(to) ? 'active' : ''}>{label}</Link>)}
                </div>
            )}
            <nav className="bottom-nav">
                <Link to="/" className={location.pathname === '/' ? 'active' : ''}><i className="icon-home"></i><span>Home</span></Link>
                <button className={bottomTutorialsOpen || isTutorialsActive ? 'active' : ''} onClick={() => setBottomTutorialsOpen(!bottomTutorialsOpen)}><i className="icon-th-list"></i><span>Tutorials</span></button>
                <Link to="/about-me" className={location.pathname === '/about-me' ? 'active' : ''}><i className="icon-adult"></i><span>About Me</span></Link>
                <Link to="/portfolio-projects" className={location.pathname === '/portfolio-projects' ? 'active' : ''}><i className="icon-docs"></i><span>Projects</span></Link>
                <Link to="/search" className={location.pathname === '/search' ? 'active' : ''}><i className="icon-search"></i><span>Search</span></Link>
            </nav>
        </>
    )
}

export default Navbar