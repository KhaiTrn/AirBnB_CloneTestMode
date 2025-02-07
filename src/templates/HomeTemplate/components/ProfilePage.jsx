import { CalendarOutlined, CameraOutlined } from "@ant-design/icons";
import { DatePicker, Input } from "antd";
import dayjs from "dayjs";
import React, { useContext, useEffect, useState } from "react";
import { FaCheck } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { pathDefault } from "../../../common/path";
import { phongService } from "../../../services/phong.service";
import { userService } from "../../../services/users.service";
import { handleUpdateUser } from "../../../store/slice/user.slice";
import "./ProfilePage.scss";

import { Helmet } from "react-helmet";
import Slider from "react-slick";
import { NotificationContext } from "../../../App";
import { ButtonPrimary } from "../../../components/ui/button/ButtonCustom";
import { useFormik } from "formik";
import * as yup from "yup";
import {
  InputNormal,
  InputPasswordCustom,
} from "../../../components/ui/input/InputCustom";

const ProfilePage = () => {
  const user = useSelector((state) => state.userSlice.user);

  const { handleNotification } = useContext(NotificationContext);

  const settings = {
    dots: false, // Hiển thị các chấm chuyển slide
    infinite: false, // Không lặp lại carousel
    speed: 500, // Tốc độ chuyển slide
    slidesToShow: 5, // Số item hiển thị mặc định (desktop)
    slidesToScroll: 1, // Số item cuộn mỗi lần
    responsive: [
      {
        breakpoint: 1024, // Tablet
        settings: {
          slidesToShow: 3, // Hiển thị 3 items
          slidesToScroll: 1, // Cuộn 3 items mỗi lần
        },
      },
      {
        breakpoint: 640, // Mobile
        settings: {
          slidesToShow: 2, // Hiển thị 2 items
          slidesToScroll: 1, // Cuộn 2 items mỗi lần
        },
      },
      {
        breakpoint: 480, // Màn hình rất nhỏ
        settings: {
          slidesToShow: 1, // Hiển thị 1 item
          slidesToScroll: 1, // Cuộn 1 item mỗi lần
        },
      },
    ],
  };

  const [rooms, setRooms] = useState([]);
  const [roomDetails, setRoomDetails] = useState({});

  const [valueUser, setValueUser] = useState({
    name: user.name,
    email: user.email,
    phone: user.phone,
  });

  const { handleChange, handleBlur, handleSubmit, values, errors, touched } =
    useFormik({
      initialValues: valueUser,
      onSubmit: (values) => {
        userService
          .thayDoiThongTinNguoiDung(user.id, values)
          .then((res) => {
            const updatedUser = res.data.content;
            dispatch(handleUpdateUser(updatedUser));

            const userInfo = JSON.parse(localStorage.getItem("userInfo"));
            localStorage.setItem(
              "userInfo",
              JSON.stringify({
                ...userInfo,
                user: updatedUser,
              })
            );
            handleNotification("success", "Thông tin đã được cập nhật");
          })
          .catch((err) => {
            handleNotification("error", err.response.data.content);
          });
      },
      validationSchema: yup.object({
        name: yup
          .string()
          .required("Vui lòng không bỏ trống")
          .matches(/^[\p{L}\s]+$/u, "Vui lòng không nhập ký tự đặc biệt, số"),
        email: yup
          .string()
          .required("Vui lòng không bỏ trống")
          .email("Vui lòng nhập đúng định dạng email"),
        phone: yup
          .string()
          .required("Vui lòng không bỏ trống")
          .matches(
            /^(0(3[2-9]|5[6|8|9]|7[0|6-9]|8[1-5]|9[0-9])\d{7})$/,
            "Vui lòng nhập đúng định dạng số điện thoại Việt Nam"
          ),
      }),
    });

  const dispatch = useDispatch();

  const navigate = useNavigate();

  useEffect(() => {
    if (user === null) {
      navigate(pathDefault.homePage);
    }
  }, []);

  const formatDate = (dateString) => {
    return dayjs(dateString).format("DD/MM/YYYY");
  };

  const handleUploadAvt = (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("formFile", file);

    const { token } = JSON.parse(localStorage.getItem("userInfo"));

    userService
      .uploadAvt(formData, token)
      .then((res) => {
        handleNotification(
          "success",
          "Ảnh đại diện đã được tải lên thành công!",
          3000
        );

        const updatedAvatar = res.data.content.avatar;
        const updatedUser = {
          ...user,
          avatar: updatedAvatar,
        };
        dispatch(handleUpdateUser(updatedUser));

        localStorage.setItem(
          "userInfo",
          JSON.stringify({
            ...JSON.parse(localStorage.getItem("userInfo")),
            user: updatedUser,
          })
        );
      })
      .catch((err) => {
        console.error(err);
        handleNotification(
          "error",
          "Đã xảy ra lỗi khi tải lên ảnh đại diện.",
          3000
        );
      });
  };

  useEffect(() => {
    phongService
      .getRoomByNguoiDung(user.id)
      .then((res) => {
        const roomsData = res.data.content;
        setRooms(roomsData);

        // Tạo một bản sao chi tiết của từng phòng
        const roomDetailsTemp = {};

        // Lặp qua các phòng để lấy thông tin chi tiết từng phòng
        const fetchRoomDetails = roomsData.map((room) => {
          return phongService
            .getRoomById(room.maPhong)
            .then((res) => {
              roomDetailsTemp[room.maPhong] = res.data.content;
            })
            .catch((err) =>
              console.error(`Lỗi lấy thông tin phòng ${room.maPhong}:`, err)
            );
        });

        // Đợi tất cả các lời gọi API hoàn tất
        Promise.all(fetchRoomDetails).then(() =>
          setRoomDetails(roomDetailsTemp)
        );
      })
      .catch((err) => console.error("Lỗi lấy danh sách phòng:", err));
  }, [user.id]);

  return (
    <div className="container ">
      <Helmet>
        <title>AirBnb - Quản lý hồ sơ</title>
      </Helmet>
      <div className="block px-5 lg:px-6 lg:grid lg:grid-cols-12 gap-10">
        <div className="col-span-12 lg:col-span-4">
          <div className=" p-10 shadow-xl rounded-3xl my-10">
            <div className="flex flex-col space-y-5">
              <div className="flex items-end gap-10 relative">
                <img
                  src={user.avatar || "/default_avatar.jpg"}
                  alt=""
                  className="w-[105px] h-[105px] object-cover rounded-full"
                />
                <button className="absolute left-1 -bottom-3 bg-white px-4 py-1 rounded-full shadow-xl">
                  <CameraOutlined /> Thêm
                  <input
                    type="file"
                    className="opacity-0 absolute left-0 w-[88px]"
                    onChange={handleUploadAvt}
                  />
                </button>
                <div>
                  <h2 className="font-bold text-2xl">1</h2>
                  <p className="font-medium text-xs">
                    Tháng hoạt động trên Airbnb
                  </p>
                </div>
              </div>
              <div className="ml-6">
                <h1 className="font-bold text-4xl">{user.name}</h1>
                <p className="ml-2">Khách</p>
              </div>
            </div>
          </div>
          <div className=" p-10 rounded-3xl border-2 space-y-3 mb-10">
            <h2 className="text-base sm:text-xl font-medium">
              Thông tin đã được xác nhận của <span>{user.name}</span>
            </h2>
            <div className="flex items-center">
              <FaCheck />
              <p className="ml-3">Địa chỉ email</p>
            </div>
          </div>
        </div>
        <div className="col-span-12 lg:col-span-8 ">
          <h2 className="text-3xl font-bold mt-5">
            Thông tin về <span>{user.name}</span>
          </h2>
          <form className="grid grid-cols-2 gap-5 my-5" onSubmit={handleSubmit}>
            <InputNormal
              labelContent={"Name"}
              id="name"
              name={"name"}
              placeholder={"Vui lòng nhập tên"}
              value={values.name}
              handleChange={handleChange}
              handleBlur={handleBlur}
              error={errors.name}
              touched={touched.name}
            />
            <InputNormal
              labelContent={"Email"}
              id="email"
              name={"email"}
              placeholder={"Vui lòng nhập email"}
              value={values.email}
              handleChange={handleChange}
              handleBlur={handleBlur}
              error={errors.email}
              touched={touched.email}
            />
            <InputNormal
              labelContent={"Phone"}
              id="phone"
              name={"phone"}
              placeholder={"Vui lòng nhập số điện thoại"}
              value={values.phone}
              handleChange={handleChange}
              handleBlur={handleBlur}
              error={errors.phone}
              touched={touched.phone}
            />

            <div className="lg:col-span-2 items-end flex justify-center lg:justify-start">
              <ButtonPrimary type="submit" className={"py-4"}>
                Xác nhận thông tin
              </ButtonPrimary>
            </div>
          </form>
          <h2 className="text-3xl font-bold my-4">Thông tin đặt phòng</h2>

          {rooms.length > 0 ? (
            <div className="px-6 md:px-10 lg:px-6">
              <Slider
                {...settings}
                className="carousel_custom max-w-full mr-0 lg:mr-10"
              >
                {rooms.map((item, index) => {
                  const roomDetail = roomDetails[item.maPhong];
                  return (
                    <div key={index} className="p-3">
                      <Link
                        to={`/rooms/${item.maPhong}`}
                        className="p-3 rounded-xl border space-y-3 border-none"
                      >
                        {roomDetail ? (
                          <>
                            <img
                              src={roomDetail.hinhAnh}
                              alt={roomDetail.tenPhong}
                              className="h-32 w-full object-cover rounded-xl"
                            />
                            <h2 className="font-medium line-clamp-1">
                              {roomDetail.tenPhong}
                            </h2>
                          </>
                        ) : (
                          <p>Đang tải...</p>
                        )}
                        <p>Ngày đặt: {formatDate(item.ngayDen)}</p>
                        <p>Ngày trả: {formatDate(item.ngayDi)}</p>
                      </Link>
                    </div>
                  );
                })}
              </Slider>
            </div>
          ) : (
            <div>
              <h2 className="text-lg">Bạn chưa từng đặt phòng</h2>
              <div className="flex justify-center">
                <img src="/nodatafound.png" alt="" />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
