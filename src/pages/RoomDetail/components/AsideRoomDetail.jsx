import React, { useContext, useEffect, useState } from "react";

import { DatePicker, Modal } from "antd";
import { formatISO, parse } from "date-fns";
import { AiFillFlag } from "react-icons/ai";
import { IoMdClose } from "react-icons/io";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { NotificationContext } from "../../../App";
import { formatCurrency } from "../../../common/formatCurrency";
import { pathDefault } from "../../../common/path";
import Counter from "../../../components/Counter/Counter";
import ModalLogin from "../../../components/ModalLogin/ModalLogin";
import { ButtonPrimary } from "../../../components/ui/button/ButtonCustom";
import { DropdownCustom } from "../../../components/ui/dropdown/DropdownCustom";
import useViewPort from "../../../hooks/useViewPort";
import { setRoomService } from "../../../services/setRoom.service";
import { useBooking } from "../../../store/BookingContext";
import LineSpace from "./LineSpace";
import dayjs from "dayjs";
const AsideRoomDetail = ({ max, priceRoom, idRoom }) => {
  const { width } = useViewPort();
  const user = useSelector((state) => {
    return state.userSlice.user;
  });
  const { rates, currentCurrency, currentSymbol } = useSelector(
    (state) => state.exchangeRate
  );

  const {
    isBlockMax,
    totalPerson,
    isSelectedDay,
    setIsSelectedDay,
    daysSelected,
    setDaysSelected,
    dayStart,
    setDayStart,
    dayEnd,
    setDayEnd,
    counterAdult,
    counterChild,
    counterBaby,
    setMaxPeople,
    handleDecreasesAdult,
    handleIncreasesAdult,
    handleDecreasesChild,
    handleIncreasesChild,
    handleDecreasesBaby,
    handleIncreasesBaby,
    idRoomContext,
    setIdRoomContext,
  } = useBooking();

  useEffect(() => {
    setMaxPeople(max);
  }, []);
  const navigate = useNavigate();
  const { handleNotification } = useContext(NotificationContext);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalLoginOpen, setIsModalLoginOpen] = useState(false);

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleOk = () => {
    const totalDays = calculateTotalDays([dayStart, dayEnd]);
    setDaysSelected(totalDays);
    setIsSelectedDay(totalDays > 0);
    setIsModalOpen(false);
  };

  const handleChangeDayStart = (date, dateString) => {
    setDayStart(dateString);
  };

  const handleChangeDayEnd = (date, dateString) => {
    setDayEnd(dateString);
  };

  const handleRangeChange = (dates, dateStrings) => {
    console.log(dateStrings);
    setDayStart(dateStrings[0]);
    setDayEnd(dateStrings[1]);
    const totalDays = calculateTotalDays([dateStrings]);
    setDaysSelected(totalDays);
    setIsSelectedDay(totalDays > 0);
  };

  const handleSetRoom = () => {
    if (user) {
      const dataDateStart = formatDate(dayStart);
      const dataDateEnd = formatDate(dayEnd);

      setRoomService
        .setRoomService({
          id: 0,
          maPhong: idRoom,
          ngayDen: dataDateEnd,
          ngayDi: dataDateStart,
          soLuongKhach: totalPerson,
          maNguoiDung: user.id,
        })
        .then((res) => {
          handleNotification("success", "Bạn đã đặt phòng thành công!");
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      handleNotification("error", "Bạn cần đăng nhập để đặt phòng");
      setIsModalLoginOpen(true);
    }
  };

  function formatDate(date) {
    const parsedDate = parse(date, "dd-MM-yyyy", new Date());
    return formatISO(parsedDate);
  }

  function calculateTotalDays(dateArray) {
    if (dateArray.length !== 2) {
      return 0;
    }

    function convertToDateFormat(dateString) {
      const [day, month, year] = dateString.split("-");
      return `${year}-${month}-${day}`;
    }

    const startDate = new Date(convertToDateFormat(dateArray[0]));
    const endDate = new Date(convertToDateFormat(dateArray[1]));

    if (isNaN(startDate) || isNaN(endDate)) {
      return 0;
    }

    // Tính số ngày giữa hai ngày
    const timeDifference = endDate - startDate;
    return Math.abs(timeDifference / (1000 * 60 * 60 * 24));
  }

  return width < 768 ? (
    <>
      <div className="fixed bottom-0 w-full bg-white z-50 dark:bg-slate-900 border-t border-gray-200 flex gap-4 justify-between p-6">
        <div className="w-1/2 flex items-center ">
          {isSelectedDay ? (
            <h2 className="text-lg font-semibold">
              {currentSymbol}
              {formatCurrency(priceRoom * rates[currentCurrency])}{" "}
              <span className="font-normal text-base">/ đêm</span>
            </h2>
          ) : (
            <span className="">Thêm ngày để xem giá</span>
          )}
        </div>
        <div className="w-1/2 cursor-pointer">
          {isSelectedDay ? (
            <ButtonPrimary
              className={"w-full text-wrap py-6"}
              onClick={handleSetRoom}
            >
              <span className="text-sm">Đặt phòng</span>
            </ButtonPrimary>
          ) : (
            <ButtonPrimary
              className={"w-full text-wrap py-6"}
              onClick={() => {
                setIsModalOpen(true);
              }}
            >
              <span className="text-sm">Kiểm tra tình trạng còn phòng</span>
            </ButtonPrimary>
          )}
        </div>
      </div>
      <Modal
        title={<span className="dark:text-white">Chọn ngày</span>}
        open={isModalOpen}
        closeIcon={<IoMdClose className="text-black dark:text-slate-200" />}
        onCancel={handleCancel}
        onOk={handleOk}
        okText="Xác nhận"
        cancelText="Hủy"
      >
        <div className="flex flex-col space-y-4 py-4">
          <div className="flex flex-col space-y-1">
            <h2 className="text-sm">Ngày nhận phòng</h2>
            <DatePicker
              format={"DD-MM-YYYY"}
              placeholder="Ngày nhận phòng"
              defaultValue={dayjs(dayStart, "DD-MM-YYYY")}
              onChange={handleChangeDayStart}
            />
          </div>
          <div className="flex flex-col space-y-1">
            <h2 className="text-sm">Ngày trả phòng</h2>
            <DatePicker
              format={"DD-MM-YYYY"}
              defaultValue={dayEnd ? dayjs(dayEnd, "DD-MM-YYYY") : null}
              placeholder="Ngày trả phòng"
              onChange={handleChangeDayEnd}
            />
          </div>
        </div>
      </Modal>
    </>
  ) : (
    <div className="sticky top-24 hidden md:flex justify-end self-start">
      <div className="mt-6 w-4/5">
        <div className="border w-full border-gray-200 shadow-lg rounded-xl p-6 space-y-6">
          {isSelectedDay ? (
            <h2 className="text-xl font-semibold">
              {currentSymbol}
              {formatCurrency(priceRoom * rates[currentCurrency])}{" "}
              <span className="font-normal text-base">/ đêm</span>
            </h2>
          ) : (
            <h2 className="text-2xl">Thêm ngày để xem giá</h2>
          )}
          <div className="space-y-2">
            <DatePicker.RangePicker
              defaultValue={[
                dayjs(dayStart, "DD-MM-YYYY"),
                dayEnd ? dayjs(dayEnd, "DD-MM-YYYY") : null,
              ]}
              format={"DD-MM-YYYY"}
              placeholder={["Nhận phòng", "Trả phòng"]}
              onChange={handleRangeChange}
              className="w-full"
            />
            <DropdownCustom
              rounded={false}
              className={"w-full flex justify-between items-center relative"}
              items={[
                {
                  label: (
                    <div className="flex flex-col gap-4 w-full">
                      <div className="flex justify-between items-center">
                        <div className="flex flex-col">
                          <h3 className="font-semibold">Người lớn</h3>
                          <p className="text-sm">Từ 13 tuổi trở lên</p>
                        </div>
                        <div
                          onClick={(e) => {
                            e.stopPropagation(); // Chặn sự kiện đóng dropdown
                          }}
                        >
                          <Counter
                            totalDefault={1}
                            max={max}
                            onDecrease={handleDecreasesAdult}
                            onIncrease={handleIncreasesAdult}
                            total={counterAdult}
                            isBlockMax={isBlockMax}
                          />
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="flex flex-col">
                          <h3 className="font-semibold">Trẻ em</h3>
                          <p className="text-sm">Độ tuổi 2-12</p>
                        </div>
                        <div
                          onClick={(e) => {
                            e.stopPropagation();
                          }}
                        >
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
                      <div className="flex justify-between items-center">
                        <div className="flex flex-col">
                          <h3 className="font-semibold">Em bé</h3>
                          <p className="text-sm">Dưới 2 tuổi</p>
                        </div>
                        <div
                          onClick={(e) => {
                            e.stopPropagation();
                          }}
                        >
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
              ]}
            >
              <div className="absolute top-2 left-3 text-xs font-semibold">
                Khách
              </div>
              <div className="pt-5 text-sm lowercase">
                {totalPerson} khách
                {counterBaby > 0 ? `, ${counterBaby} em bé` : ""}
              </div>
            </DropdownCustom>
          </div>

          <div className="">
            {isSelectedDay ? (
              <Link
                onClick={(e) => {
                  if (!user) {
                    e.preventDefault();
                    handleNotification(
                      "error",
                      "Bạn cần đăng nhập để đặt phòng"
                    );
                  } else {
                    setIdRoomContext(idRoom);
                  }
                }}
                to={pathDefault.payment}
              >
                <ButtonPrimary className={"w-full py-6"}>
                  Đặt phòng
                </ButtonPrimary>
              </Link>
            ) : (
              <ButtonPrimary
                className={"w-full md:py-10 lg:py-6 text-wrap"}
                onClick={() => {
                  handleNotification(
                    "error",
                    "Vui lòng chọn ngày nhận, trả phòng"
                  );
                }}
              >
                <span className="md:text-sm">
                  Kiểm tra tình trạng còn phòng
                </span>
              </ButtonPrimary>
            )}
            {isSelectedDay && (
              <>
                <div className="text-center text-sm mt-4">
                  Bạn vẫn chưa bị trừ tiền
                </div>
                <div className="flex flex-col gap-4 mt-4">
                  <div className="flex justify-between items-center gap-2">
                    <h4 className="text-sm lg:text-base underline">
                      {currentSymbol}
                      {formatCurrency(
                        priceRoom * rates[currentCurrency]
                      )} x {daysSelected} đêm
                    </h4>
                    <h4 className="text-sm lg:text-base">
                      {currentSymbol}
                      {formatCurrency(
                        priceRoom * rates[currentCurrency] * daysSelected
                      )}
                    </h4>
                  </div>
                  <div className="flex justify-between items-center gap-2">
                    <h4 className="text-sm lg:text-base underline">
                      Phí vệ sinh
                    </h4>
                    <h4 className="text-sm lg:text-base">
                      {currentSymbol}
                      {formatCurrency(5 * rates[currentCurrency])}
                    </h4>
                  </div>
                  <div className="flex justify-between items-center">
                    <h4 className="text-sm lg:text-base underline">
                      Phí dịch vụ AirBnb
                    </h4>
                    <h4 className="text-sm lg:text-base">
                      {currentSymbol}
                      {formatCurrency(2 * rates[currentCurrency])}
                    </h4>
                  </div>
                </div>
                <LineSpace />
                <div className="flex justify-between items-center gap-2">
                  <h4 className="text-sm lg:text-base font-semibold">
                    Tổng trước thuế
                  </h4>
                  <h4 className="text-sm lg:text-base font-semibold">
                    {currentSymbol}
                    {formatCurrency(
                      priceRoom * rates[currentCurrency] * daysSelected +
                        5 * rates[currentCurrency] +
                        2 * rates[currentCurrency]
                    )}
                  </h4>
                </div>
              </>
            )}
          </div>
        </div>
        <div className="flex items-center justify-center gap-2 mt-4">
          <AiFillFlag fill="#6A6A6A" />
          <Link className="underline text-sm text-[#6A6A6A]">
            Báo cáo nhà/phòng cho thuê này
          </Link>
        </div>
      </div>
      <Modal
        title=""
        open={isModalLoginOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <ModalLogin setIsModalLoginOpen={setIsModalLoginOpen} />
      </Modal>
    </div>
  );
};

export default AsideRoomDetail;
