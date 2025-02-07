import { Button, Dropdown, Input, Modal, Popconfirm, Table } from "antd";
import React, { useContext, useEffect, useRef, useState } from "react";
import { phongService } from "../../services/phong.service";
import { ButtonAdmin } from "../../components/ui/button/ButtonCustom";
import { NotificationContext } from "../../App";
import { useSelector } from "react-redux";
import FormAddRoom from "./components/FormAddRoom/FormAddRoom";
import { LuPencilLine, LuTrash } from "react-icons/lu";
import { locationService } from "../../services/viTri.service";
import { TbHomePlus } from "react-icons/tb";
import { CloseOutlined } from "@ant-design/icons";
import useViewPort from "../../hooks/useViewPort";
import TableCustom from "../../components/ui/table/TableCustom";
const ManagerRoom = () => {
  const { width } = useViewPort();
  const [initialValues, setInitialValues] = useState({
    id: 0,
    tenPhong: "",
    khach: 0,
    phongNgu: 0,
    giuong: 0,
    phongTam: 0,
    moTa: "",
    giaTien: 0,
    mayGiat: true,
    banLa: true,
    tivi: true,
    dieuHoa: true,
    wifi: true,
    bep: true,
    doXe: true,
    hoBoi: true,
    banUi: true,
    maViTri: 0,
    hinhAnh: "",
  });
  // Xử lý resetForm
  const resetFormRef = useRef(null);
  const handleResetForm = (resetForm) => {
    resetFormRef.current = resetForm;
  };
  const resetRoomForm = () => {
    if (resetFormRef.current) {
      resetFormRef.current();
    }
  };
  //Xử lý hình ảnh
  const [previewImage, setPreviewImage] = useState(null);
  //Xử lý phần add , edit
  const [isOnSubmit, setIsOnSubmit] = useState(true);
  const { user, token } = useSelector((state) => state.userSlice);
  const [listRoom, setListRoom] = useState([]);
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
  // Xử lý input Search
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
  const handlePageChange = (page, pageSize) => {
    setCurrentPage(page);
  };
  const Render = (res) => {
    const setRoom = res.data.content.data.map((room) => ({
      ...room,
      key: room.id,
    }));
    setListRoom(setRoom);
    setTotalRow(res.data.content.totalRow);
  };
  const getAllRoom = () => {
    phongService
      .searchByKeyword(currentPage, keyword)
      .then((res) => {
        Render(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getAllLocation = () => {
    locationService
      .getViTri()
      .then((res) => {
        setLocation(res.data.content);
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
      title: "Room's Name",
      dataIndex: "tenPhong",
      key: "tenPhong",
      render: (text, record, index) => {
        return text ? <p className="uppercase font-bold">{text}</p> : "";
      },
    },
    {
      title: "Image",
      dataIndex: "hinhAnh",
      key: "hinhAnh",
      render: (text, record, index) => {
        return (
          <img
            src={text}
            className="w-36 h-16 object-cover mr-2 rounded-xl"
            alt=""
          />
        );
      },
    },
    {
      title: "Location",
      dataIndex: "maViTri",
      key: "maViTri",
      render: (text, record, index) => {
        const Obj = location.find((loc) => loc.id === record.maViTri);
        return Obj ? (
          <div>
            <p className="font-semibold text-base">{Obj.tenViTri}</p>
          </div>
        ) : (
          <p>No location found</p>
        );
      },
    },
    {
      title: "Information",
      dataIndex: "moTa",
      key: "moTa",
      render: (text, record, index) => {
        const items = [{ key: record.id, label: <p>{text}</p> }];
        return (
          <Dropdown
            placement="top"
            menu={{
              items,
            }}
            overlayStyle={{ width: 600 }}
          >
            <a
              onClick={(e) => e.preventDefault()}
              className="uppercase text-sm font-bold underline"
            >
              Infomation
            </a>
          </Dropdown>
        );
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
                  className="dark:text-white dark:hover:text-white "
                  size={25}
                />
              }
              color="default"
              type="text"
              onClick={() => {
                setIsModalOpen(true);
                setIsOnSubmit(false);
                phongService
                  .getRoomById(record.id)
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
              title="Thực hiện xóa phòng"
              description="Bạn có chắc muốn xóa phòng này không?"
              onConfirm={() => {
                phongService
                  .deleteRoom(record.id, token)
                  .then((res) => {
                    getAllRoom();
                    handleNotification("success", res.data.message);
                  })
                  .catch((err) => {
                    getAllRoom();
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
    getAllRoom();
  }, [currentPage, keyword]);
  useEffect(() => {}, [getAllRoom]);
  useEffect(() => {
    getAllLocation();
  }, []);
  return (
    <div className="space-y-5">
      <div className="lg:flex lg:justify-between items-center border-gray-500 border-b-2 py-3">
        <h1
          className="xl:text-3xl md:2xl text-xl font-bold text-gray-800 dark:text-white mb-3
        "
        >
          Manager List Room
        </h1>
        <div className="flex space-x-3 lg:w-1/2 w-full">
          <Input.Search
            placeholder="enter search room's name..."
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
            content={width > 768 && "Add New Room"}
            icon={<TbHomePlus size={20} />}
            onClick={() => {
              setIsModalOpen(true);
              setIsOnSubmit(true);
              setInitialValues({
                id: 0,
                tenPhong: "",
                khach: "",
                phongNgu: "",
                giuong: "",
                phongTam: "",
                moTa: "",
                giaTien: "",
                mayGiat: true,
                banLa: true,
                tivi: true,
                dieuHoa: true,
                wifi: true,
                bep: true,
                doXe: true,
                hoBoi: true,
                banUi: true,
                maViTri: "",
                hinhAnh: "",
              });
              setPreviewImage(null);
              resetRoomForm();
            }}
          />
          <Modal
            title={
              <h2 className="dark:text-white text-2xl text-center">
                {isOnSubmit ? "Add New Room" : "Edit Room Information"}
              </h2>
            }
            closeIcon={<CloseOutlined size={20} className="dark:text-white" />}
            open={isModalOpen}
            onCancel={() => {
              setIsModalOpen(false);
            }}
            footer={null}
          >
            <FormAddRoom
              handleCloseModal={() => {
                setIsModalOpen(false);
              }}
              previewImage={previewImage}
              setPreviewImage={setPreviewImage}
              getAllRoom={() => {
                getAllRoom();
              }}
              onResetForm={handleResetForm}
              location={location}
              isOnSubmit={isOnSubmit}
              initialValues={initialValues}
            />
          </Modal>
        </div>
      </div>
      <TableCustom
        dataSource={listRoom}
        columns={columns}
        pagination={{
          total: totalRow,
          current: currentPage,
          pageSize: 10,
          onChange: handlePageChange,
        }}
      />
      ;
    </div>
  );
};

export default ManagerRoom;
