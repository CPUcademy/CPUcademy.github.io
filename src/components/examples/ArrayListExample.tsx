export default function ArrayListExample() {
    const arr = ["a", "b", "c", "d", "e"]

    return (
        <ol>
            {arr.map((item, i) => (
                <li key={i}>{item}</li>
            ))}
        </ol>
    )
}