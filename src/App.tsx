import { useEffect, useRef, useState } from 'react'
import './App.css'
import Footer from './components/ui/Footer'
import Navbar from './components/ui/Navbar'
import { Outlet, ScrollRestoration } from 'react-router-dom'
import usePageTracking from './hooks/usePageTracking'

function App() {
    const [tutorialsOpen, setTutorialsOpen] = useState(false)
    const contentRef = useRef<HTMLDivElement>(null)
    const [height, setHeight] = useState(0)
    const [sidebarToggled, setSidebarToggled] = useState(false)

    useEffect(() => {
    if (contentRef.current) setHeight(tutorialsOpen ? contentRef.current.scrollHeight : 0)
    }, [tutorialsOpen])

    useEffect(() => {
        const handleResize = () => { setSidebarToggled(window.innerWidth < 768) }
        handleResize()
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    usePageTracking()

    return (
        <>
            <div id="wrapper" className={sidebarToggled ? 'sidebar-toggled' : ''}>
                <Navbar sidebarToggled={sidebarToggled} tutorialsOpen={tutorialsOpen} setTutorialsOpen={setTutorialsOpen} contentRef={contentRef} height={height} />
                <div id="content-wrapper" className="d-flex flex-column">
                    <div id="content">
                        <button id="sidebarToggleTop" className="btn btn-link d-md-none rounded-circle mr-3" onClick={() => setSidebarToggled(!sidebarToggled)}>
                            <i className="fa fa-bars colorAppPrimary"></i>
                        </button>
                        <div className="container-fluid">
                                <div className="row">
                                    <Outlet />
                                </div>
                            </div>  
                        </div>
                    <Footer/>
                </div>
            </div>
            <ScrollRestoration />
        </>
    )
}

export default App