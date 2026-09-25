import { useEffect, useState } from "react"

export default function ApiExample() {
    const [posts, setPosts] = useState<any[]>([])
    const [error, setError] = useState("")

    useEffect(() => {
        const apiURL = "https://jsonplaceholder.typicode.com/posts"

        fetch(apiURL)
            .then((response) => {
                if (!response.ok)
                    throw new Error(`HTTP error! Status: ${response.status}`)
                return response.json()
            })
            .then((data) => {
                setPosts(data.slice(0, 1))
            })
            .catch(() => {
                setError("Failed to fetch data.")
            })
    }, [])

    if (error) {
        return <p>{error}</p>
    }

    return (
        <div>
            {posts.map((post) => (
                <div key={post.id}>
                    <h5>{post.title}</h5>
                    <p>{post.body}</p>
                </div>
            ))}
        </div>
    )
}