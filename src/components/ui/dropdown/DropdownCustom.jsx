import { Avatar, Badge, Dropdown, Space } from "antd";
import { useState } from "react";
import { DownOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import "./DropdownCustom.scss";

export const DropdownCustom = ({
  items = [{ label: "The function is not working yet" }],
  children,
  icon = false,
  rounded = true,
  className,
  ...props
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleOpenChange = (flag) => {
    setIsOpen(flag);
  };
  return (
    <Dropdown
      menu={{ items: items }}
      trigger={["click"]}
      open={isOpen}
      onOpenChange={handleOpenChange}
      className={`border border-gray-200 ${
        rounded ? "!rounded-full" : ""
      } ${className}`}
      {...props}
    >
      <button
        onClick={() => {
          setIsOpen(!isOpen);
        }}
        className={`text-[#222222] dark:text-white capitalize py-2 px-4 hover:bg-gray-100 dark:hover:bg-slate-900 rounded-md`}
      >
        {children}
        <span className="ml-2">
          <DownOutlined
            className={`${
              isOpen ? "rotate-180" : "rotate-0"
            } transition-all duration-300 text-xs text-[#222222] dark:text-white`}
          />
        </span>
      </button>
    </Dropdown>
  );
};
export const DropdownNoti = ({ icon }) => {
  const items = [
    {
      label: <Link>Notication 1</Link>,
      key: "0",
    },
    {
      type: "divider",
    },
    {
      label: <Link>Notication 2</Link>,
      key: "1",
    },
    {
      type: "divider",
    },
    {
      label: <Link>Notication 3</Link>,
      key: "3",
    },
  ];
  return (
    <Badge count={0} showZero className="align-middle">
      <Dropdown
        placement="bottom"
        menu={{
          items,
        }}
        trigger={["click"]}
      >
        <a onClick={(e) => e.preventDefault()}>{icon}</a>
      </Dropdown>
    </Badge>
  );
};
export const DropdownNormal = ({ content, icon, className }) => {
  const items = [
    {
      label: "The function is not working yet",
    },
  ];
  return (
    <Dropdown
      placement="bottom"
      menu={{
        items,
      }}
      trigger={["click"]}
    >
      <a
        onClick={(e) => e.preventDefault()}
        className={`space-x-3 border p-3 rounded-3xl font-bold ${className}`}
      >
        <Avatar
          src={
            "http://purecatamphetamine.github.io/country-flag-icons/3x2/US.svg"
          }
        />
        <p className="inline">{content}</p>
        {icon}{" "}
      </a>
    </Dropdown>
  );
};
