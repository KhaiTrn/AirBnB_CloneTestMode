import React, { useContext, useEffect, useRef, useState } from "react";
import { Button, Input, Modal, Popconfirm, Table } from "antd";
import { NotificationContext } from "../../App";
import { useSelector } from "react-redux";
import { locationService } from "../../services/viTri.service";
import { ButtonAdmin } from "../../components/ui/button/ButtonCustom";
import { LuPencilLine, LuTrash } from "react-icons/lu";
import FormAddLocation from "./FormAddLocation/FormAddLocation";
import { BiSolidLocationPlus } from "react-icons/bi";
import { CloseOutlined } from "@ant-design/icons";
import useViewPort from "../../hooks/useViewPort";
import TableCustom from "../../components/ui/table/TableCustom";
const ManagerLocation = () => {
  const { width } = useViewPort();
  const [initialValues, setInitialValues] = useState({
    id: 0,
    tenViTri: "",
    tinhThanh: "",
    quocGia: "",
    hinhAnh: "",
  });
  const resetFormRef = useRef(null);
  const handleResetForm = (resetForm) => {
    resetFormRef.current = resetForm;
  };
  const resetLocationForm = () => {
    if (resetFormRef.current) {
      resetFormRef.current();
    }
  };

  const [previewImage, setPreviewImage] = useState(null);
  //Xử lý phần add , edit
  const [isOnSubmit, setIsOnSubmit] = useState(true);
  const { user, token } = useSelector((state) => state.userSlice);
  const { handleNotification } = useContext(NotificationContext);
  //Xử lý phần Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  //Xử lý current Page,render giao diện
  const [currentPage, setCurrentPage] = useState(1);

  const [totalRow, setTotalRow] = useState(0);
  // Xử lý InputSearch
  const [keyword, setKeyword] = useState("");
  const [value, setValue] = useState("");
  const timeOutRef = useRef(null);
  // Xử lý phần vị trí
  const [location, setLocation] = useState([]);
  // handleChange InputSearch
  const handleChangeKeyword = (e) => {
    const newValue = e.target.value;
    setValue(newValue);
    if (timeOutRef) {
      clearTimeout(timeOutRef.current);
    }
    timeOutRef.current = setTimeout(() => {
      setKeyword(newValue);
      setCurrentPage(1);
    }, 1000);
  };
  //handleChange khi bấm chuyển page
  const handlePageChange = (page, pageSize) => {
    setCurrentPage(page);
  };
  const renderLocation = (res) => {
    const setLocationbyID = res.data.content.data.map((location) => ({
      ...location,
      key: location.id,
    }));
    setLocation(setLocationbyID);
    setTotalRow(res.data.content.totalRow);
  };
  const getAllLocation = () => {
    locationService
      .getAllLocation(currentPage, keyword)
      .then((res) => {
        renderLocation(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      width: 100,
    },
    {
      title: "Image",
      dataIndex: "hinhAnh",
      key: "hinhAnh",
      render: (text, record, index) => {
        return (
          <div className="flex gap-5 items-center">
            <img
              src={text}
              className="w-36 h-16 object-cover mr-2 rounded-md"
              alt=""
            />
            <p className="text-lg font-medium">{record.tenViTri}</p>
          </div>
        );
      },
    },
    {
      title: "Province",
      dataIndex: "tinhThanh",
      key: "tinhThanh",
      render: (text, record, index) => {
        return <p className="text-base font-medium">{text}</p>;
      },
    },
    {
      title: "Country",
      dataIndex: "quocGia",
      key: "quocGia",
      render: (text, record, index) => {
        return <p className="text-base font-medium underline">{text}</p>;
      },
    },
    {
      title: "Action",
      key: "action",
      fixed: "right",
      width: 150,
      render: (text, record, index) => {
        return (
          <div className="space-x-1">
            {/* Nút sửa */}
            <Button
              icon={
                <LuPencilLine
                  className="dark:text-white dark:hover:text-white"
                  size={25}
                />
              }
              color="default"
              type="text"
              onClick={() => {
                setIsModalOpen(true);
                setIsOnSubmit(false);
                locationService
                  .getLocationByID(record.id)
                  .then((res) => {
                    setInitialValues(res.data.content);
                    setPreviewImage(record.hinhAnh);
                  })
                  .catch((err) => {
                    console.log(err);
                  });
              }}
            />
            {/* Nút xóa */}
            <Popconfirm
              title="Thực hiện xóa vị trí"
              description="Bạn có chắc muốn xóa vị trí này không?"
              onConfirm={() => {
                locationService
                  .deleteLocation(record.id, token)
                  .then((res) => {
                    getAllLocation();
                    handleNotification("success", res.data.message);
                  })
                  .catch((err) => {
                    getAllLocation();
                    handleNotification("error", err.response.data.content);
                  });
              }}
              onCancel={() => {}}
              okText="Yes"
              cancelText="No"
            >
              <Button type="text">
                <LuTrash size={25} color="red" />
              </Button>
            </Popconfirm>
          </div>
        );
      },
    },
  ];
  useEffect(() => {
    getAllLocation();
  }, [currentPage, keyword]);
  useEffect(() => {}, [getAllLocation]);
  return (
    <div className="space-y-5">
      <div className="lg:flex lg:justify-between items-center border-gray-500 border-b-2 py-3">
        <h1
          className="xl:text-3xl md:2xl text-xl font-bold text-gray-800 dark:text-white mb-3
        "
        >
          Manager List Location
        </h1>
        <div className="flex space-x-3 lg:w-1/2 w-full">
          <Input.Search
            placeholder="enter search location..."
            value={value}
            onChange={handleChangeKeyword}
            className=""
            size="large"
            onSearch={(value) => {
              setKeyword(value);
            }}
          />
          {/* Nút thêm */}
          <ButtonAdmin
            content={width > 768 && "Add New Location"}
            icon={<BiSolidLocationPlus size={20} />}
            onClick={() => {
              setIsModalOpen(true);
              setIsOnSubmit(true);
              setInitialValues({
                id: 0,
                tenViTri: "",
                tinhThanh: "",
                quocGia: "",
                hinhAnh: "",
              });
              setPreviewImage(null);
              resetLocationForm();
            }}
          />
          <Modal
            title={
              <h2 className="dark:text-white text-2xl text-center">
                {isOnSubmit ? "Add Location" : "Edit Location"}
              </h2>
            }
            closeIcon={<CloseOutlined size={20} className="dark:text-white" />}
            open={isModalOpen}
            onCancel={() => {
              setIsModalOpen(false);
            }}
            footer={null}
          >
            <FormAddLocation
              handleCloseModal={() => {
                setIsModalOpen(false);
              }}
              previewImage={previewImage}
              setPreviewImage={setPreviewImage}
              getAllLocation={() => {
                getAllLocation();
              }}
              location={location}
              isOnSubmit={isOnSubmit}
              initialValues={initialValues}
              onResetForm={handleResetForm}
            />
          </Modal>
        </div>
      </div>
      <TableCustom
        dataSource={location}
        columns={columns}
        pagination={{
          total: totalRow,
          current: currentPage,
          pageSize: 3,
          onChange: handlePageChange,
        }}
      />
    </div>
  );
};

export default ManagerLocation;
