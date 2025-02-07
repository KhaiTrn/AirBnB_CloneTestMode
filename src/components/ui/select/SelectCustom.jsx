import { Select } from "antd";

export const SelectCustom = ({
  labelContent,
  handleChange,
  options,
  mode,
  error,
  touched,
  value,
  placeholder,
}) => {
  return (
    <div className="space-y-1">
      <label htmlFor="" className="text-sm font-semibold">
        {labelContent}
      </label>
      <Select
        options={options}
        onChange={handleChange}
        mode={mode && mode}
        className="block"
        placeholder={placeholder}
        value={value}
        error={error}
        touched={touched}
      />
      {error && touched && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
};
