import { Button } from "antd";

export const ButtonGhost = ({ children, className, onClick, ...props }) => {
  return (
    <Button className={className} type="text" onClick={onClick} {...props}>
      {children}
    </Button>
  );
};

export const ButtonOutLine = ({
  children,
  roundedfull = false,
  className,
  onClick,
  type = "button",
  ...props
}) => {
  return (
    <Button
      type={type}
      className={`py-[10px] px-4 text-[#222222] dark:text-slate-200 dark:hover:!text-black border border-gray-200 hover:!border-black hover:!text-black ${className} ${
        roundedfull ? "rounded-full" : ""
      }`}
      onClick={onClick}
      {...props}
    >
      {children}
    </Button>
  );
};

export const ButtonPrimary = ({
  children,
  type = "button",
  className,
  onClick,
  ...props
}) => {
  return (
    <Button
      className={`!bg-primary text-white font-semibold text-base !outline-none !border-none hover:!text-white hover:!bg-primary/80 ${className}`}
      onClick={onClick}
      htmlType={type}
      {...props}
    >
      {children}
    </Button>
  );
};
export const ButtonIcon = ({ icon, onClick, className }) => {
  return (
    <button
      className={`w-12 bg-slate-200 hover:bg-slate-400 duration-200 rounded-xl ${className}`}
      onClick={onClick}
    >
      <img src={icon} alt="" />
    </button>
  );
};
export const ButtonAdmin = ({ content, icon, onClick, className = "" }) => {
  return (
    <Button
      variant="outlined"
      icon={icon}
      className={`p-5 rounded-xl text-gray-700 dark:text-white font-bold text-lg bg-white dark:bg-slate-900 border-transparent dark:border-white ${className}`}
      onClick={onClick}
    >
      {content}
    </Button>
  );
};
