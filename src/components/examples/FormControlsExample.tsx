import { useState } from "react"
import "../../App.css"

export default function FormControlsExample() {
  const [backgroundColor, setBackgroundColor] = useState("")
  const [fontColor, setFontColor] = useState("black")
  const [fontSize, setFontSize] = useState("100%")
  const [listStyle, setListStyle] = useState("disc")
  const [border, setBorder] = useState(false)

  return (
    <div
      id="example"
      style={{
        backgroundColor,
        color: fontColor,
        fontSize,
        border: border ? "5px solid black" : "none",
      }}
    >
      <p>Background color</p>

      <div>
        <input
          type="button"
          id="orange"
          value="Orange"
          onClick={() => setBackgroundColor("orange")}
        />
        <input
          type="button"
          id="lightblue"
          value="Lightblue"
          onClick={() => setBackgroundColor("lightblue")}
        />
        <input
          type="button"
          id="green"
          value="Green"
          onClick={() => setBackgroundColor("green")}
        />
      </div>

      <p>Font color</p>

      <div>
        <select
          name="font"
          id="font"
          value={fontColor}
          onChange={(event) => setFontColor(event.target.value)}
        >
          <option value="black">Black</option>
          <option value="red">Red</option>
          <option value="yellow">Yellow</option>
          <option value="purple">Purple</option>
        </select>
      </div>

      <p>Font size, e.g., 200%</p>

      <div>
        <input
          type="text"
          id="size"
          name="size"
          value={fontSize}
          onChange={(event) => setFontSize(event.target.value)}
        />
      </div>

      <p>Change the list style type</p>

      <div>
        <input
          type="radio"
          id="disc"
          name="r"
          value="disc"
          checked={listStyle === "disc"}
          onChange={(event) => setListStyle(event.target.value)}
        />
        <label htmlFor="disc">Disc</label>

        <input
          type="radio"
          id="square"
          name="r"
          value="square"
          checked={listStyle === "square"}
          onChange={(event) => setListStyle(event.target.value)}
        />
        <label htmlFor="square">Square</label>

        <input
          type="radio"
          id="circle"
          name="r"
          value="circle"
          checked={listStyle === "circle"}
          onChange={(event) => setListStyle(event.target.value)}
        />
        <label htmlFor="circle">Circle</label>
      </div>

      <ul id="list" style={{ listStyleType: listStyle }}>
        <li>a</li>
        <li>b</li>
        <li>c</li>
      </ul>

      <div>
        <input
          type="checkbox"
          id="border"
          name="border"
          checked={border}
          onChange={(event) => setBorder(event.target.checked)}
        />
        <label htmlFor="border">
          Add border to the <code>&lt;div&gt;</code>
        </label>
      </div>
    </div>
  )
}