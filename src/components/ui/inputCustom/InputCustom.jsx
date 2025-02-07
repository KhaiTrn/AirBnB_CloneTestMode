import { Input } from "antd";
import React from "react";

const InputCustom = ({
  type = "text",
  placeholder,
  handleChange,
  handleBlur,
  name,
  value,
  error,
  touched,
}) => {
  return (
    <>
      <Input
        type={type}
        placeholder={placeholder}
        className="py-3"
        onChange={handleChange}
        onBlur={handleBlur}
        name={name}
        value={value}
      />
      {error && touched && (
        <p className="text-red-500 text-sm mt-1 text-left">{error}</p>
      )}
    </>
  );
};

export default InputCustom;
