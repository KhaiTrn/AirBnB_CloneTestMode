import { Switch } from "antd";

export const SwitchRoom = ({
  labelContent,
  handleChange,
  value,
  id,
  name,
  className,
}) => {
  return (
    <div className="space-y-1">
      <label htmlFor="" className="text-sm font-semibold">
        {labelContent}
      </label>
      <Switch
        checkedChildren="Yes"
        unCheckedChildren="No"
        className={`${className} w-1/2 block`}
        onChange={handleChange}
        value={value}
        id={id}
        key={name}
      />
    </div>
  );
};
