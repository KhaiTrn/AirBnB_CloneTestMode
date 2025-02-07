import { DatePicker, Dropdown } from "antd";
import React, { useEffect, useMemo, useState } from "react";
import { useHeaderContext } from "../../../store/HeaderContext";
import removeVietnameseTones from "../../../common/removeVietnameseTones";
import { IoCloseCircle } from "react-icons/io5";
import { useDebounce } from "use-debounce";
import dayjs from "dayjs";
import { useBooking } from "../../../store/BookingContext";

const HeaderSearchMobile = () => {
  const { dayStart, setDayStart, dayEnd, setDayEnd } = useBooking();
  const [isOpenDropdown, setIsOpenDropdown] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [listSearch, setListSearch] = useState([]);
  const [isUserSelecting, setIsUserSelecting] = useState(false);
  const [value] = useDebounce(keyword, 1000);

  const { listLocation, setKeySearch } = useHeaderContext();

  const handleChangeKeyword = (e) => {
    setKeyword(e.target.value);
    const dataSearch = searchLocation(listLocation, e.target.value);
    setListSearch(dataSearch);
  };

  useEffect(() => {
    if (!isUserSelecting && value.trim() !== "") {
      setIsOpenDropdown(true);
    } else {
      setIsOpenDropdown(false);
    }
    setIsUserSelecting(false);
  }, [value]);

  const itemListSearch = useMemo(() => {
    return listSearch.slice(0, 4).map((item) => {
      return {
        key: item.id,
        label: (
          <div
            className="flex gap-4 items-center hover:bg-gray-200 w-full pr-4 rounded-md"
            onClick={() => {
              setIsUserSelecting(true);
              setKeyword(
                `${item.tenViTri}, ${item.tinhThanh}, ${item.quocGia}`
              );
              setIsOpenDropdown(false);
              setKeySearch(item.id);
            }}
          >
            <img src={item.hinhAnh} className="w-10 h-10 rounded-md " alt="" />
            <span className="truncate">
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

  const handleChangeDayStart = (date, dateString) => {
    setDayStart(dateString);
  };

  const handleChangeDayEnd = (date, dateString) => {
    setDayEnd(dateString);
  };

  return (
    <div className="flex flex-col gap-4 py-3">
      <div className="flex flex-col gap-2">
        <h3>Bạn sẽ đi đâu?</h3>
        <Dropdown
          trigger={["click"]}
          overlayClassName="dropdown-suggest"
          menu={{
            items: itemListSearch,
            onMouseLeave: () => {
              setIsOpenDropdown(false);
            },
          }}
          open={isOpenDropdown}
        >
          <div
            className="relative"
            onClick={() => {
              //   setIsOpenDropdown(true);
            }}
          >
            <input
              type="text"
              placeholder="Tìm kiếm điểm đến"
              className="p-2 px-4 border border-gray-200 rounded-md w-full"
              onChange={handleChangeKeyword}
              value={keyword}
            />
            {keyword && (
              <div
                className="absolute top-1/2 -translate-y-1/2 right-4"
                onClick={() => {
                  setKeyword("");
                  setIsOpenDropdown(false);
                }}
              >
                <IoCloseCircle />
              </div>
            )}
          </div>
        </Dropdown>
      </div>
      <div className="flex flex-col gap-2">
        <h3>Thời gian</h3>
        <div className="grid grid-cols-2 gap-4">
          <DatePicker
            placeholder="Ngày đi"
            onChange={handleChangeDayStart}
            format={"DD-MM-YYYY"}
            defaultValue={dayjs(dayStart, "DD-MM-YYYY")}
          />
          <DatePicker
            placeholder="Ngày về"
            onChange={handleChangeDayEnd}
            format={"DD-MM-YYYY"}
            defaultValue={dayEnd ? dayjs(dayEnd, "DD-MM-YYYY") : null}
          />
        </div>
      </div>
    </div>
  );
};

export default HeaderSearchMobile;
