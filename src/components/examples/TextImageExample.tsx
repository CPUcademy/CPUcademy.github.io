import { useEffect, useRef } from "react"

export default function TextImageExample() {
    const textRef = useRef<HTMLParagraphElement>(null)
    const imageRef = useRef<HTMLImageElement>(null)

    useEffect(() => {
        if (textRef.current) {
            textRef.current.innerHTML = "TEXT"
            textRef.current.style.color = "orange"
            textRef.current.style.backgroundColor = "black"
            textRef.current.style.fontSize = "20px"
        }

        if (imageRef.current) {
            imageRef.current.src = "/data/courses/imgCSS.jpeg"
            imageRef.current.style.width = "30%"
        }
    }, [])

    return (
        <>
            <p ref={textRef}>Text</p>

            <img
                ref={imageRef}
                src=""
                alt="Img"
                style={{ marginBottom: 20 }}
            />
        </>
    )
}