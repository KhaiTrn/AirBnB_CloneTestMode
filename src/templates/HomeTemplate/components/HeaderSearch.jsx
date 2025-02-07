import { DatePicker, Dropdown } from "antd";
import React, { useEffect, useMemo, useState } from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";
import "./HeaderSearch.scss";
import { useNavigate } from "react-router-dom";
import { useDebounce } from "use-debounce";
import { pathDefault } from "../../../common/path";
import removeVietnameseTones from "../../../common/removeVietnameseTones";
import Counter from "../../../components/Counter/Counter";
import LineSpace from "../../../pages/RoomDetail/components/LineSpace";
import useViewPort from "../../../hooks/useViewPort";
import { useHeaderContext } from "../../../store/HeaderContext";
import { IoCloseCircle } from "react-icons/io5";
import { useBooking } from "../../../store/BookingContext";
import dayjs from "dayjs";

const HeaderSearch = () => {
  const { dayStart, setDayStart, dayEnd, setDayEnd } = useBooking();
  const { width } = useViewPort();
  const [keyword, setKeyword] = useState("");
  const [value] = useDebounce(keyword, 1000);
  const [isOpenDropdown, setIsOpenDropdown] = useState(false);
  const [isOpenDropdownPerson, setIsOpenDropdownPerson] = useState(false);
  const [listSearch, setListSearch] = useState([]);
  const [isUserSelecting, setIsUserSelecting] = useState(false);
  const {
    handleDecreasesAdult,
    handleDecreasesBaby,
    handleDecreasesChild,
    handleIncreasesAdult,
    handleIncreasesBaby,
    handleIncreasesChild,
    max,
    totalPerson,
    isBlockMax,
    counterAdult,
    counterBaby,
    counterChild,
    listLocation,
    keySearch,
    setKeySearch,
  } = useHeaderContext();

  const navigate = useNavigate();

  const handleChangeDayStart = (date, dateString) => {
    setDayStart(dateString);
  };

  const handleChangeDayEnd = (date, dateString) => {
    setDayEnd(dateString);
  };

  const handleChangeKeyword = (e) => {
    setKeyword(e.target.value);
    const dataSearch = searchLocation(listLocation, e.target.value);
    // console.log(dataSearch);
    setListSearch(dataSearch);
  };

  const handleSearchButton = () => {
    if (keySearch) {
      navigate(`${pathDefault.searchPage}?key=${keySearch}`);
    }
  };

  const itemListSearch = useMemo(() => {
    return listSearch.slice(0, 4).map((item) => {
      return {
        key: item.id,
        label: (
          <div
            className="flex gap-4 items-center hover:bg-gray-200 w-full pr-4 rounded-md"
            onClick={() => {
              setIsUserSelecting(false);
              setKeyword(
                `${item.tenViTri}, ${item.tinhThanh}, ${item.quocGia}`
              );
              setIsOpenDropdown(false);
              setKeySearch(item.id);
            }}
          >
            <img src={item.hinhAnh} className="w-10 h-10 rounded-md " alt="" />
            <span>
              {item.tenViTri}, {item.tinhThanh}, {item.quocGia}
            </span>
          </div>
        ),
      };
    });
  }, [listSearch]);

  function searchLocation(list, keyword) {
    if (!keyword) return [];
    const normalizedKeyword = removeVietnameseTones(
      keyword.toLowerCase().trim()
    );
    return list.filter((item) => {
      const tenViTriNormalized = removeVietnameseTones(
        item.tenViTri.toLowerCase().trim()
      );
      const tinhThanhNormalized = removeVietnameseTones(
        item.tinhThanh.toLowerCase().trim()
      );
      return (
        tenViTriNormalized.includes(normalizedKeyword) ||
        tinhThanhNormalized.includes(normalizedKeyword)
      );
    });
  }

  return width < 1024 ? (
    <Dropdown
      trigger={["click"]}
      menu={{
        items: itemListSearch,
        onMouseLeave: () => {
          setIsOpenDropdown(false);
        },
      }}
      open={isOpenDropdown}
    >
      <div className=" rounded-3xl bg-white dark:bg-slate-800 py-4 pl-4 flex-1 relative flex border border-gray-200 shadow-md">
        <input
          type="text"
          className="border-none outline-none bg-transparent"
          placeholder="Tìm kiếm điểm đến"
          value={keyword}
          onChange={handleChangeKeyword}
          onClick={() => {
            setIsOpenDropdown(true);
          }}
        />

        <div
          className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-white self-center absolute right-2 cursor-pointer"
          onClick={() => {
            handleSearchButton();
          }}
        >
          <FaMagnifyingGlass size={16} />
        </div>
        {keyword && (
          <div
            className="absolute top-1/2 -translate-y-1/2 right-14"
            onClick={() => {
              setIsUserSelecting(true);
              setKeyword("");
              setIsOpenDropdown(false);
            }}
          >
            <IoCloseCircle className="text-gray-400" />
          </div>
        )}
      </div>
    </Dropdown>
  ) : (
    <div className="border border-gray-200 rounded-3xl flex justify-between relative">
      <label
        htmlFor="inpt_location"
        className="w-1/3 py-2 px-6 flex flex-col rounded-3xl hover:bg-[#EBEBEB] dark:hover:bg-slate-400 cursor-pointer justify-between"
        onClick={() => {
          setIsOpenDropdown(true);
        }}
      >
        <p className="text-xs">Địa điểm</p>
        <Dropdown
          trigger={["click"]}
          menu={{
            items: itemListSearch,
            onMouseLeave: () => {
              setIsOpenDropdown(false);
            },
          }}
          open={isOpenDropdown}
        >
          <div className="relative">
            <input
              type="text"
              id="inpt_location"
              value={keyword}
              onChange={handleChangeKeyword}
              placeholder="Tìm kiếm điểm đến"
              className="w-full flex-1 outline-none bg-transparent text-sm pr-5 truncate"
            />
            {keyword && (
              <div
                className="absolute top-1/2 -translate-y-1/2 right-0 text-gray-400 hover:text-gray-500 transition-all duration-200"
                onClick={() => {
                  setIsUserSelecting(true);
                  setKeyword("");
                  setIsOpenDropdown(false);
                }}
              >
                <IoCloseCircle />
              </div>
            )}
          </div>
        </Dropdown>
      </label>
      <div className="w-1/3 flex gap-2 px-2">
        <label
          htmlFor="inpt_daystart"
          className="w-1/2 py-2 px-4 flex flex-col justify-between rounded-3xl hover:bg-[#EBEBEB] dark:hover:bg-slate-400 cursor-pointer"
        >
          <p className="text-xs">Nhận phòng</p>
          <DatePicker
            onChange={handleChangeDayStart}
            className="!w-full !border-none !p-0"
            format={"DD-MM-YYYY"}
            id="inpt_daystart"
            placeholder="Ngày nhận"
            defaultValue={dayjs(dayStart, "DD-MM-YYYY")}
            suffixIcon={null}
          />
        </label>
        <label
          htmlFor="inpt_dayend"
          className="w-1/2 py-2 px-4 flex flex-col justify-between rounded-3xl hover:bg-[#EBEBEB] dark:hover:bg-slate-400 cursor-pointer"
        >
          <p className="text-xs">Trả phòng</p>
          <DatePicker
            id="inpt_dayend"
            onChange={handleChangeDayEnd}
            format={"DD-MM-YYYY"}
            className="!w-full !border-none !p-0"
            placeholder="Ngày trả"
            defaultValue={dayEnd ? dayjs(dayEnd, "DD-MM-YYYY") : null}
            suffixIcon={null}
          />
        </label>
      </div>
      <label
        htmlFor="inpt_person"
        className="w-1/3 py-2 pr-16 px-6 flex flex-col rounded-3xl hover:bg-[#EBEBEB] dark:hover:bg-slate-400 cursor-pointer"
        onClick={() => {
          setIsOpenDropdownPerson(true);
        }}
      >
        <p className="text-xs">Khách</p>
        <Dropdown
          trigger={["click"]}
          overlayClassName="dropdown-suggest"
          menu={{
            items: [
              {
                label: (
                  <div className="p-6">
                    <div className="flex justify-between gap-10">
                      <div>
                        <h3 className="font-semibold">Người lớn</h3>
                        <p className="text-sm text-[#6a6a6a]">
                          Từ 13 tuổi trở lên
                        </p>
                      </div>
                      <div>
                        <Counter
                          totalDefault={0}
                          max={max}
                          onDecrease={handleDecreasesAdult}
                          onIncrease={handleIncreasesAdult}
                          total={counterAdult}
                          isBlockMax={isBlockMax}
                        />
                      </div>
                    </div>
                    <LineSpace />
                    <div className="flex justify-between gap-10">
                      <div>
                        <h3 className="font-semibold">Trẻ em</h3>
                        <p className="text-sm text-[#6a6a6a]">Độ tuổi 2 - 12</p>
                      </div>
                      <div>
                        <Counter
                          totalDefault={0}
                          max={max}
                          onDecrease={handleDecreasesChild}
                          onIncrease={handleIncreasesChild}
                          total={counterChild}
                          isBlockMax={isBlockMax}
                        />
                      </div>
                    </div>
                    <LineSpace />
                    <div className="flex justify-between gap-10">
                      <div>
                        <h3 className="font-semibold">Em bé</h3>
                        <p className="text-sm text-[#6a6a6a]">Dưới 2 tuổi</p>
                      </div>
                      <div>
                        <Counter
                          totalDefault={0}
                          max={5}
                          onDecrease={handleDecreasesBaby}
                          onIncrease={handleIncreasesBaby}
                          total={counterBaby}
                        />
                      </div>
                    </div>
                  </div>
                ),
              },
            ],
            onMouseLeave: () => {
              setIsOpenDropdownPerson(false);
            },
          }}
          open={isOpenDropdownPerson}
        >
          <input
            id="inpt_person"
            type="text"
            placeholder="Thêm khách"
            value={`${totalPerson} khách, ${counterBaby} em bé`}
            onChange={() => {}}
            readOnly
            className="w-full flex-1 outline-none bg-transparent text-sm"
          />
        </Dropdown>
      </label>
      <div
        className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-white self-center absolute right-2 cursor-pointer"
        onClick={() => {
          handleSearchButton();
        }}
      >
        <FaMagnifyingGlass size={16} />
      </div>
    </div>
  );
};

export default HeaderSearch;
