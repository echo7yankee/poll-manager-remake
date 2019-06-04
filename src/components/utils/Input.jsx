import React from "react";

const RadioInput = ({
  name,
  id,
  value,
  onChange,
  type,
  inputType,
  placeHolder,
  className,
  disabled
}) => {
  return (
    <input
      name={name}
      id={id}
      type={inputType}
      placeholder={placeHolder}
      className={className}
      value={value}
      checked={type}
      onChange={onChange}
      disabled={disabled}
    />
  );
};

export default RadioInput;
