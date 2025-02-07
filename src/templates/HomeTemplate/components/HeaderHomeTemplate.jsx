import { Dropdown, InputNumber, Modal, Slider } from "antd";
import React, { useState } from "react";
import { FaBars, FaRegHeart, FaRegUserCircle } from "react-icons/fa";
import { FaArrowLeft, FaMagnifyingGlass } from "react-icons/fa6";
import { FiMoon, FiSun } from "react-icons/fi";
import { IoIosClose } from "react-icons/io";
import { RiGlobalLine } from "react-icons/ri";
import { useSelector } from "react-redux";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { Icons } from "../../../assets/Icons";
import { pathDefault } from "../../../common/path";
import Counter from "../../../components/Counter/Counter";
import {
  ButtonGhost,
  ButtonPrimary,
} from "../../../components/ui/button/ButtonCustom";
import useViewPort from "../../../hooks/useViewPort";
import LineSpace from "../../../pages/RoomDetail/components/LineSpace";
import { useHeaderContext } from "../../../store/HeaderContext";
import { useSearchPageContext } from "../../../store/SearchPageContext";
import { useTheme } from "../../../store/ThemeContext";
import HeaderSearch from "./HeaderSearch";
import HeaderSearchMobile from "./HeaderSearchMobile";

const HeaderHomeTemplate = () => {
  const { width } = useViewPort();
  const { setListRoom, originalListRoom } = useSearchPageContext();
  const { rates, currentCurrency, currentSymbol } = useSelector(
    (state) => state.exchangeRate
  );
  const { isDarkMode, setIsDarkMode } = useTheme();
  const user = useSelector((state) => state.userSlice.user);
  const location = useLocation();
  const { keySearch } = useHeaderContext();
  const isSearchRoom = location.pathname.includes("/search");
  const isRoomDetail = location.pathname.includes("/rooms");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isOpenFilterMobile, setIsOpenFilterMobile] = useState(false);
  const [range, setRange] = useState([0, 400e3]);

  const [counterBedroom, setConterBedroom] = useState(1);
  const [counterBed, setCounterBed] = useState(1);
  const [counterBathroom, setCounterBathroom] = useState(1);
  const navigate = useNavigate();

  const handleDecreasesBedroom = () => {
    if (counterBedroom > 1) {
      setConterBedroom((prev) => prev - 1);
    }
  };

  const handleIncreasesBedroom = () => {
    if (counterBedroom < 3) {
      setConterBedroom((prev) => prev + 1);
    }
  };

  const handleDecreasesBed = () => {
    if (counterBed > 1) {
      setCounterBed((prev) => prev - 1);
    }
  };

  const handleIncreasesBed = () => {
    if (counterBed < 3) {
      setCounterBed((prev) => prev + 1);
    }
  };
  const handleDecreasesBathroom = () => {
    if (counterBathroom > 1) {
      setCounterBathroom((prev) => prev - 1);
    }
  };

  const handleIncreasesBathroom = () => {
    if (counterBathroom < 3) {
      setCounterBathroom((prev) => prev + 1);
    }
  };

  const handleOk = () => {
    navigate(`${pathDefault.searchPage}/?key=${keySearch}`);
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleFilterPrice = () => {
    const [min, max] = range;
    const dataFilter = originalListRoom.filter((room) => {
      return (
        room.giaTien >= min / rates[currentCurrency] &&
        room.giaTien <= max / rates[currentCurrency]
      );
    });
    setListRoom(dataFilter);
    setIsOpenFilterMobile(false);
  };

  // Hàm xử lý khi thay đổi Slider
  const handleSliderChange = (value) => {
    setRange(value);
  };

  // Hàm xử lý khi thay đổi InputNumber
  const handleInputChange = (value, index) => {
    const newRange = [...range];
    newRange[index] = value || 0; // Xử lý giá trị null
    setRange(newRange);
  };
  return width < 768 && !isRoomDetail ? (
    <>
      <header className="sticky top-0 w-full bg-white dark:bg-slate-800 z-20 flex items-center justify-between py-3 px-6 border-b border-gray-200">
        {isSearchRoom && (
          <div className="p-3">
            <Link to={pathDefault.homePage}>
              <FaArrowLeft />
            </Link>
          </div>
        )}
        <div className="p-3">
          <Link to={pathDefault.homePage}>
            <Icons.logoFull />
          </Link>
        </div>
        {isSearchRoom ? (
          <>
            <div
              className="p-3 border-[#222222] dark:border-white border rounded-full"
              onClick={() => {
                setIsOpenFilterMobile(true);
              }}
            >
              <Icons.filter />
            </div>
            <div
              className={`fixed bottom-0 right-0 left-0 bg-white dark:bg-slate-800 min-h-[95vh] z-[99] transition-all duration-500 rounded-t-2xl px-4 ${
                isOpenFilterMobile ? "" : "translate-y-full"
              }`}
            >
              <div
                className="flex items-center justify-center relative mt-4"
                onClick={() => {
                  setIsOpenFilterMobile(false);
                }}
              >
                <div className="p-2 absolute left-0">
                  <IoIosClose size={30} className="" />
                </div>
                <h3 className="text-lg font-semibold">Bộ lọc</h3>
              </div>
              <LineSpace className="my-1" />
              <div className="py-4">
                <h4 className="font-semibold">Khoảng giá</h4>
                <p className="text-sm">Giá theo đêm chưa bao gồm phí và thuế</p>
                <div>
                  {/* Thanh slider */}
                  <div className="flex justify-center">
                    <Slider
                      className="w-2/3"
                      range
                      value={range}
                      step={100e3}
                      max={1e6}
                      onChange={handleSliderChange}
                      tooltip={{
                        formatter: (value) =>
                          value.toLocaleString("vi-VN", {
                            style: "currency",
                            currency: "VND",
                          }),
                      }}
                    />
                  </div>
                  <div className="flex justify-between">
                    <div className="flex flex-col items-start gap-2">
                      <p className="text-sm">Giá từ</p>
                      <InputNumber
                        min={0}
                        max={1e6}
                        step={100e3}
                        value={range[0]}
                        formatter={(value) =>
                          `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ".")
                        }
                        parser={(value) => value.replace(/\./g, "")}
                        onChange={(value) => handleInputChange(value, 0)}
                      />
                    </div>
                    {/* Input bên phải */}
                    <div className="flex flex-col items-end gap-2">
                      <p className="text-sm">Giá đến</p>
                      <InputNumber
                        min={0}
                        max={1e6}
                        step={100e3}
                        value={range[1]}
                        formatter={(value) =>
                          `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ".")
                        }
                        parser={(value) => value.replace(/\./g, "")}
                        onChange={(value) => handleInputChange(value, 1)}
                      />
                    </div>
                  </div>
                </div>
                <LineSpace />
                <h4 className="font-semibold mb-6">Phòng và phòng ngủ</h4>
                <div className="space-y-6">
                  <div className="flex justify-between">
                    <h5>Phòng ngủ</h5>
                    <div>
                      <Counter
                        total={counterBedroom}
                        onIncrease={handleIncreasesBedroom}
                        onDecrease={handleDecreasesBedroom}
                        max={3}
                        totalDefault={1}
                      />
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <h5>Giường</h5>
                    <div>
                      <Counter
                        total={counterBed}
                        onDecrease={handleDecreasesBed}
                        onIncrease={handleIncreasesBed}
                        max={3}
                        totalDefault={1}
                      />
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <h5>Phòng tắm</h5>
                    <div>
                      <Counter
                        onDecrease={handleDecreasesBathroom}
                        onIncrease={handleIncreasesBathroom}
                        total={counterBathroom}
                        max={3}
                        totalDefault={1}
                      />
                    </div>
                  </div>
                </div>
                <ButtonPrimary
                  className={"w-full py-6 mt-6"}
                  onClick={handleFilterPrice}
                >
                  Tìm kiếm
                </ButtonPrimary>
              </div>
            </div>
            <div
              onClick={() => {
                setIsOpenFilterMobile(false);
              }}
              className={`fixed bg-black/70 inset-0 z-20 ${
                isOpenFilterMobile ? "opacity-100" : "opacity-0 hidden"
              }`}
            ></div>
          </>
        ) : (
          <>
            <div
              className="p-3 border-[#222222] dark:border-white border rounded-full"
              onClick={() => {
                setIsModalOpen(true);
              }}
            >
              <FaMagnifyingGlass />
            </div>
            <Modal
              title="Tìm kiếm"
              open={isModalOpen}
              onOk={handleOk}
              onCancel={handleCancel}
            >
              <HeaderSearchMobile />
            </Modal>
          </>
        )}
      </header>
      <nav className="fixed bottom-0 left-0 right-0 w-full z-30 py-2 bg-white dark:bg-slate-800 flex items-center justify-center gap-6 border-t border-gray-200">
        <NavLink
          to={pathDefault.homePage}
          className={({ isActive }) =>
            isActive
              ? "flex flex-col items-center gap-1 text-primary"
              : "flex flex-col items-center gap-1"
          }
        >
          <div className="w-10 flex justify-center">
            <FaMagnifyingGlass size={20} />
          </div>
          <h3 className="text-[10px]">Khám phá</h3>
        </NavLink>
        <NavLink
          to={pathDefault.favorite}
          className={({ isActive }) =>
            isActive
              ? "flex flex-col items-center gap-1 text-primary"
              : "flex flex-col items-center gap-1"
          }
        >
          <div className="w-10 flex justify-center">
            <FaRegHeart size={20} />
          </div>
          <h3 className="text-[10px]">Yêu thích</h3>
        </NavLink>
        <div
          className="flex flex-col items-center gap-1"
          onClick={() => {
            setIsDarkMode(!isDarkMode);
          }}
        >
          {isDarkMode ? (
            <>
              <div className="w-10 flex justify-center">
                <FiMoon size={20} stroke="white" />
              </div>
              <h3 className="text-[10px]">Tối</h3>
            </>
          ) : (
            <>
              <div className="w-10 flex justify-center">
                <FiSun size={20} />
              </div>
              <h3 className="text-[10px]">Sáng</h3>
            </>
          )}
        </div>
        {user ? (
          <NavLink
            to={pathDefault.Profile}
            className={({ isActive }) =>
              isActive
                ? "flex flex-col items-center gap-1 text-primary"
                : "flex flex-col items-center gap-1"
            }
          >
            <div className="w-10 flex justify-center">
              <FaRegUserCircle size={20} />
            </div>
            <h3 className="text-[10px]">Hồ sơ</h3>
          </NavLink>
        ) : (
          <NavLink
            to={`${pathDefault.AuthPage}?type=signin`}
            className="flex flex-col items-center gap-1"
          >
            <div className="w-10 flex justify-center">
              <FaRegUserCircle size={20} />
            </div>
            <h3 className="text-[10px]">Đăng nhập</h3>
          </NavLink>
        )}
      </nav>
    </>
  ) : (
    <header
      className={`sticky bg-white shadow-sm dark:shadow-white z-20 h-[96px] py-4 top-0 items-center hidden dark:bg-slate-800 dark:text-white md:flex`}
    >
      <div className="container flex gap-4 justify-between items-center px-10 lg:px-6">
        <div>
          <Link to={pathDefault.homePage}>
            {width < 1024 ? (
              <Icons.logo fill="#FF385C" />
            ) : (
              <Icons.logoFull fill="#FF385C" />
            )}
          </Link>
        </div>
        <HeaderSearch />
        <div className="flex items-center space-x-2">
          <ButtonGhost
            className={"!px-2 !py-5 font-semibold rounded-full"}
            onClick={() => {
              setIsDarkMode(!isDarkMode);
            }}
          >
            {isDarkMode ? (
              <FiMoon size={20} stroke="white" />
            ) : (
              <FiSun size={20} />
            )}
          </ButtonGhost>
          <ButtonGhost className={"!px-2 py-5 rounded-full"}>
            <RiGlobalLine color={isDarkMode ? "white" : "black"} size={20} />
          </ButtonGhost>
          {!user ? (
            <Dropdown
              menu={{
                items: [
                  {
                    label: (
                      <div className="flex flex-col">
                        <Link
                          to={`${pathDefault.AuthPage}?type=signup`}
                          className="py-2 px-4 hover:bg-gray-100 font-semibold hover:text-current"
                        >
                          Đăng ký
                        </Link>
                        <Link
                          to={`${pathDefault.AuthPage}?type=signin`}
                          className="py-2 px-4 hover:bg-gray-100 hover:text-current"
                        >
                          Đăng nhập
                        </Link>
                        <Link
                          to={`${pathDefault.favorite}`}
                          className="py-2 px-4 hover:bg-gray-100 hover:text-current"
                        >
                          Đã yêu thích
                        </Link>
                        <LineSpace className="my-1" />
                        <div className="py-2 px-4 hover:bg-gray-100">
                          Cho thuê chỗ ở qua Airbnb
                        </div>
                        <div className="py-2 px-4 hover:bg-gray-100">
                          Tổ chức trải nghiệm
                        </div>
                        <div className="py-2 px-4 hover:bg-gray-100">
                          Trung tâm hỗ trợ
                        </div>
                      </div>
                    ),
                  },
                ],
              }}
              overlayClassName="header-dropdown-menu"
              placement="bottomRight"
              trigger={["click"]}
            >
              <a
                onClick={() => {
                  (e) => e.preventDefault();
                }}
                className="py-2 px-4 rounded-full border border-gray-200 shadow-sm flex items-center space-x-4 cursor-pointer hover:shadow-md"
              >
                <FaBars size={18} />
                <div className="w-8 h-8 text-[#6A6A6A]">
                  <Icons.avatar />
                </div>
              </a>
            </Dropdown>
          ) : (
            <Dropdown
              menu={{
                items: [
                  {
                    label: (
                      <div className="flex flex-col">
                        <div className="py-2 px-4 hover:bg-gray-100 font-semibold">
                          Xin Chào, {user.name}
                        </div>
                        <Link
                          to={pathDefault.Profile}
                          className="py-2 px-4 hover:bg-gray-100 hover:text-current"
                        >
                          Quản lý hồ sơ
                        </Link>
                        <Link
                          to={`${pathDefault.favorite}`}
                          className="py-2 px-4 hover:bg-gray-100 hover:text-current"
                        >
                          Đã yêu thích
                        </Link>
                        <LineSpace className="my-1" />
                        <div className="py-2 px-4 hover:bg-gray-100">
                          Cho thuê chỗ ở qua Airbnb
                        </div>
                        <div className="py-2 px-4 hover:bg-gray-100">
                          Tổ chức trải nghiệm
                        </div>
                        <div className="py-2 px-4 hover:bg-gray-100">
                          Trung tâm hỗ trợ
                        </div>
                        <LineSpace className="my-1" />
                        {user.role === "ADMIN" && (
                          <>
                            <Link
                              to={pathDefault.admin}
                              className="py-2 px-4 hover:bg-gray-100 hover:text-current"
                            >
                              Admin dashboard
                            </Link>
                            <LineSpace className="my-1" />
                          </>
                        )}
                        <div
                          className="py-2 px-4 hover:bg-gray-100"
                          onClick={() => {
                            localStorage.removeItem("userInfo");
                            navigate(pathDefault.homePage);
                            window.location.reload();
                          }}
                        >
                          Đăng xuất
                        </div>
                      </div>
                    ),
                  },
                ],
              }}
              overlayClassName="header-dropdown-menu"
              placement="bottomRight"
              trigger={["click"]}
            >
              <a
                onClick={() => {
                  (e) => e.preventDefault();
                }}
                className="py-2 px-4 rounded-full border border-gray-200 shadow-sm flex items-center space-x-4 cursor-pointer hover:shadow-md"
              >
                <FaBars size={18} />
                <div className="w-8 h-8 text-[#6A6A6A]">
                  <img
                    src={user.avatar || "/default_avatar.jpg"}
                    className="rounded-full"
                    alt=""
                  />
                </div>
              </a>
            </Dropdown>
          )}
        </div>
      </div>
    </header>
  );
};

export default HeaderHomeTemplate;
