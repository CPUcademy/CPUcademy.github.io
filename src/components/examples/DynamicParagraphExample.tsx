import { useState } from "react"
import "../../App.css"

export default function DynamicParaphraphExample() {
  const [value, setValue] = useState("")
  const [values, setValues] = useState<string[]>([])

  const add = () => {
    setValues([value, ...values])
    setValue("")
  }

  return (
    <>
      <input
        type="text"
        id="textInput"
        style={{ float: "left", marginRight: 10 }}
        value={value}
        onChange={(event) => setValue(event.target.value)}
      />

      <input
        type="button"
        value="Add"
        onClick={add}
      />

      <h4 style={{ marginTop: 10, clear: "both" }}>
        Values
      </h4>

      <div id="container">
        {values.map((item, index) => (
          <p
            key={index}
            className="newValue"
            style={{ margin: "0px" }}
          >
            {item}
          </p>
        ))}
      </div>
    </>
  )
}