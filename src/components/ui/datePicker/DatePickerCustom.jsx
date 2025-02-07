import { DatePicker } from "antd";
import dayjs from "dayjs";
import { CalendarOutlined, CloseCircleOutlined } from "@ant-design/icons";
import { useTheme } from "../../../store/ThemeContext";
export const DatePickerCustom = ({
  id,
  name,
  handleChange,
  value,
  error,
  touched,
  labelContent,
  handleBlur,
  format,
  disabledDate,
}) => {
  const { isDarkMode, setIsDarkMode } = useTheme();
  return (
    <div className="space-y-1">
      <label htmlFor="" className="block font-medium text-sm">
        {labelContent}
      </label>
      <DatePicker
        suffixIcon={<CalendarOutlined className="dark:text-white" size={20} />}
        allowClear={
          isDarkMode
            ? {
                clearIcon: <CloseCircleOutlined className="dark:text-white" />,
              }
            : true
        }
        disabledDate={disabledDate}
        className="w-full dark:focus-within:bg-slate-800"
        id={id}
        name={name}
        format={format}
        onChange={handleChange}
        value={value}
        onBlur={handleBlur}
      />
      {error && touched ? (
        <p className="text-red-500 text-sm">{error}</p>
      ) : null}
    </div>
  );
};
