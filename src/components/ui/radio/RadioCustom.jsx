import { Radio } from "antd";
import { useState } from "react";

export const RadioCustom = ({
  labelContent,
  handleChange,
  value,
  errors,
  touched,
}) => {
  return (
    <div className="space-y-1 block">
      <label htmlFor="" className="block text-sm font-semibold">
        {labelContent}
      </label>
      <Radio.Group onChange={handleChange} value={value}>
        <Radio className="dark:text-white" value="USER">
          USER
        </Radio>
        <Radio className="dark:text-white" value="ADMIN">
          ADMIN
        </Radio>
      </Radio.Group>
      {errors && touched && <p className="text-red-500 text-sm">{errors}</p>}
    </div>
  );
};
