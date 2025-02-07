import { ConfigProvider, Table } from "antd";
import React from "react";
import { useTheme } from "../../../store/ThemeContext";

const TableCustom = ({ dataSource, columns, pagination }) => {
  const { isDarkMode } = useTheme();
  return (
    <ConfigProvider
      theme={{
        components: {
          Pagination: {
            itemSize: 35,
            colorPrimary: "#3b82f6",
            colorBgContainer: isDarkMode ? "black" : "white",
            colorText: isDarkMode ? "white" : "#374151",
          },
        },
      }}
    >
      <Table
        dataSource={dataSource}
        scroll={{ x: 1300 }}
        columns={columns}
        pagination={pagination}
      />
    </ConfigProvider>
  );
};

export default TableCustom;
