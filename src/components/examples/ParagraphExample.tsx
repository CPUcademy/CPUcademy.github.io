import { useState } from "react";

function ParagraphExample() {
  const [message, setMessage] = useState(
    "Hover over this paragraph and move your mouse!"
  );

  const handleMouseMove = (event: React.MouseEvent<HTMLParagraphElement>) => {
    console.log(`Mouse moved to X: ${event.clientX}, Y: ${event.clientY}`);
  };

  const handleMouseEnter = () => {
    setMessage("Mouse entered the paragraph!");
  };

  const handleMouseLeave = () => {
    setMessage("Mouse left the paragraph!");
  };

  return (
    <p
      id="paragraph"
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {message}
    </p>
  );
}

export default ParagraphExample;