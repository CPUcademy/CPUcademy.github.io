import { Link } from "react-router-dom"

function Footer() {
    return (
        <>
            <footer className="sticky-footer bg-white" style={{ marginTop: "1.5rem" }}>
                <div className="container my-auto">
                    <div className="copyright text-center my-auto">
                        <span>Copyright &copy; CPUcademy All Rights Reserved | <Link to="/license-and-sources" className="link">License &amp; Sources</Link></span>
                    </div>
                </div>
            </footer>
        </>
    )
}

export default Footer