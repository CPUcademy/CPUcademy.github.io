import React from "react";

function InputFieldExample() {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log("Current value:", event.target.value);
  };

  return (
    <input type="text" id="inputField" placeholder="Write something..." onChange={handleChange} />
  );
}

export default InputFieldExample;