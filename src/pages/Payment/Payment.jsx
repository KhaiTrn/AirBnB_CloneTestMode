import { DatePicker, Input, Tag } from "antd";
import { formatISO, parse } from "date-fns";
import dayjs from "dayjs";
import React, { useContext, useEffect, useState } from "react";
import CreditCard from "react-credit-cards-2";
import "react-credit-cards-2/dist/es/styles-compiled.css";
import { IoArrowBack } from "react-icons/io5";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { NotificationContext } from "../../App";
import { Icons } from "../../assets/Icons";
import { formatCurrency } from "../../common/formatCurrency";
import { pathDefault } from "../../common/path";
import Counter from "../../components/Counter/Counter";
import { ButtonPrimary } from "../../components/ui/button/ButtonCustom";
import { phongService } from "../../services/phong.service";
import { setRoomService } from "../../services/setRoom.service";
import { useBooking } from "../../store/BookingContext";
const Payment = () => {
  const [roomDetail, setRoomDetail] = useState([]);
  const { rates, currentCurrency, currentSymbol } = useSelector(
    (state) => state.exchangeRate
  );
  const navigate = useNavigate();
  const {
    isBlockMax,
    totalPerson,
    setIsSelectedDay,
    daysSelected,
    setDaysSelected,
    dayStart,
    setDayStart,
    dayEnd,
    setDayEnd,
    price,
    setPrice,
    counterAdult,
    setConterAdult,
    counterChild,
    setCounterChild,
    counterBaby,
    setCounterBaby,
    maxPeople,
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
  const { handleNotification } = useContext(NotificationContext);
  const user = useSelector((state) => state.userSlice.user);

  const [cardInfo, setCardInfo] = useState({
    number: "",
    name: "",
    expiry: "",
    cvc: "",
    focus: "",
  });

  const handleInputChange = (e) => {
    setCardInfo({ ...cardInfo, [e.target.name]: e.target.value });
  };

  const handleFocus = (e) => {
    setCardInfo({ ...cardInfo, focus: e.target.name });
  };
  const handleRangeChange = (dates, dateStrings) => {
    setDayStart(dateStrings[0]);
    setDayEnd(dateStrings[1]);
    const totalDays = calculateTotalDays(dateStrings);
    setDaysSelected(totalDays);
    setIsSelectedDay(totalDays > 0);
  };

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

    const timeDifference = endDate - startDate;
    return Math.abs(timeDifference / (1000 * 60 * 60 * 24));
  }

  function formatDate(date) {
    const parsedDate = parse(date, "dd-MM-yyyy", new Date());
    return formatISO(parsedDate);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!dayStart || !dayEnd)
      return handleNotification("error", "Vui lòng nhập đầy đủ thông tin");
    if (user) {
      const dataDateStart = formatDate(dayStart);
      const dataDateEnd = formatDate(dayEnd);

      setRoomService
        .setRoomService({
          id: 0,
          maPhong: idRoomContext,
          ngayDen: dataDateEnd,
          ngayDi: dataDateStart,
          soLuongKhach: totalPerson,
          maNguoiDung: user.id,
        })
        .then((res) => {
          handleNotification("success", "Bạn đã đặt phòng thành công!");
          setTimeout(() => {
            navigate(pathDefault.homePage);
          }, 3000);
        })
        .catch((err) => {
          console.log(err);
          handleNotification("error", err.response.data.content);
        });
    } else {
      handleNotification("error", "Bạn cần đăng nhập để đặt phòng");
      setIsModalLoginOpen(true);
    }
  };

  useEffect(() => {
    if (!dayStart || !dayEnd || !idRoomContext) {
      navigate(-1);
    }
    phongService
      .getRoomById(idRoomContext)
      .then((res) => {
        console.log(res.data.content);
        setRoomDetail(res.data.content);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="py-10 bg-primary/60 dark:bg-slate-900 min-h-screen flex justify-center items-center">
      <div className="container bg-white dark:bg-slate-800 shadow-lg border rounded-xl p-10">
        <div className="grid grid-cols-1 gap-6 md:gap-0 md:grid-cols-2">
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-4 cursor-pointer">
              <div
                onClick={() => {
                  navigate(-1);
                }}
                className="flex gap-4 items-center"
              >
                <IoArrowBack />
                <Icons.logoFull />
              </div>
              <Tag color="magenta">Test Mode</Tag>
            </div>
            <div className="flex flex-col gap-6 w-full">
              <h3 className="text-xl truncate">{roomDetail.tenPhong}</h3>
              <div>
                <img
                  className="rounded-3xl max-h-96"
                  src={roomDetail.hinhAnh}
                  alt={roomDetail.tenPhong}
                />
              </div>
              <div>
                <DatePicker.RangePicker
                  format={"DD-MM-YYYY"}
                  defaultValue={[
                    dayjs(dayStart, "DD-MM-YYYY"),
                    dayjs(dayEnd, "DD-MM-YYYY"),
                  ]}
                  placeholder={["Nhận phòng", "Trả phòng"]}
                  onChange={handleRangeChange}
                  className="w-full bg-transparent"
                />
              </div>
              <div className="flex justify-between items-center">
                <div className="flex flex-col">
                  <h3 className="font-semibold">Người lớn</h3>
                  <p className="text-sm">Từ 13 tuổi trở lên</p>
                </div>
                <div>
                  <Counter
                    totalDefault={1}
                    max={maxPeople}
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
                <div>
                  <Counter
                    totalDefault={0}
                    max={maxPeople}
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
            <div className="flex flex-col gap-4 mt-4">
              <div className="flex justify-between items-center gap-2">
                <h4 className="text-sm lg:text-base underline">
                  {currentSymbol}
                  {formatCurrency(
                    roomDetail.giaTien * rates[currentCurrency]
                  )}{" "}
                  x {daysSelected} đêm
                </h4>
                <h4 className="text-sm lg:text-base">
                  {currentSymbol}
                  {formatCurrency(
                    roomDetail.giaTien * rates[currentCurrency] * daysSelected
                  )}
                </h4>
              </div>
              <div className="flex justify-between items-center gap-2">
                <h4 className="text-sm lg:text-base underline">Phí vệ sinh</h4>
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
            <div className="flex justify-between items-center gap-2">
              <h4 className="text-sm lg:text-base font-semibold">
                Tổng trước thuế
              </h4>
              <h4 className="text-sm lg:text-base font-semibold">
                {currentSymbol}
                {formatCurrency(
                  roomDetail.giaTien * rates[currentCurrency] * daysSelected +
                    5 * rates[currentCurrency] +
                    2 * rates[currentCurrency]
                )}
              </h4>
            </div>
          </div>
          <div className="flex flex-col items-center gap-6">
            <CreditCard
              number={cardInfo.number}
              name={cardInfo.name}
              expiry={cardInfo.expiry}
              cvc={cardInfo.cvc}
              focused={cardInfo.focus}
            />
            <form className="flex flex-col gap-4">
              <div className="space-y-1">
                <label htmlFor="number" className="text-xs">
                  Card number
                </label>
                <Input
                  type="text"
                  name="number"
                  id="number"
                  placeholder="Card Number"
                  value={cardInfo.number}
                  onChange={handleInputChange}
                  onFocus={handleFocus}
                />
              </div>
              <div>
                <label htmlFor="name" className="text-xs">
                  Name
                </label>
                <Input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Name"
                  value={cardInfo.name}
                  onChange={handleInputChange}
                  onFocus={handleFocus}
                />
              </div>

              <div>
                <label htmlFor="expiry" className="text-xs">
                  Expiry
                </label>
                <Input
                  type="text"
                  id="expiry"
                  name="expiry"
                  placeholder="MM/YY"
                  value={cardInfo.expiry}
                  onChange={handleInputChange}
                  onFocus={handleFocus}
                />
              </div>
              <div>
                <label htmlFor="cvc" className="text-xs">
                  CVC
                </label>
                <Input
                  id="cvc"
                  type="text"
                  name="cvc"
                  placeholder="CVC"
                  value={cardInfo.cvc}
                  onChange={handleInputChange}
                  onFocus={handleFocus}
                />
              </div>
              <ButtonPrimary
                type="submit"
                onClick={handleSubmit}
                className={"w-full mt-8 py-6"}
              >
                Xác nhận
              </ButtonPrimary>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
