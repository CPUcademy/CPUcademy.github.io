import { useEffect } from "react"

export default function CodeClickExample() {
    useEffect(() => {
        const handleClick = () => {
            console.log("click")
        }

        document.addEventListener("click", handleClick)

        return () => {
            document.removeEventListener("click", handleClick)
        }
    }, [])

    return <p>Click anywhere and check the console.</p>
}