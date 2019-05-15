import React from "react";

const RadioInput = ({ name, id, value, onChange, type, disabled }) => {
  return (
    <input
      name={name}
      id={id}
      type="radio"
      placeholder="Enter question..."
      className="mr-1"
      value={value}
      checked={type}
      onChange={onChange}
      disabled={disabled}
    />
  );
};

export default RadioInput;
