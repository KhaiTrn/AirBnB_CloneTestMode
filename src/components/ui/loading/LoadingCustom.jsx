import { Spin } from "antd";
import React from "react";
import { LoadingOutlined } from "@ant-design/icons";

const LoadingCustom = () => {
  return (
    <div className="py-10 flex items-center justify-center">
      <Spin indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} />
    </div>
  );
};

export default LoadingCustom;
