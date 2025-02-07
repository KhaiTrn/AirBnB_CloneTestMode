import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchExchangeRates,
  setCurrency,
} from "./../../../store/slice/exchangeRateSlice";
import { Modal } from "antd";
import LineSpace from "../../../pages/RoomDetail/components/LineSpace";
import { IoMdClose } from "react-icons/io";

const DATA_CURRENCY = [
  {
    name: "Việt Nam Đồng",
    currencyCode: "VND",
    currencySymbol: "₫",
  },
  {
    name: "Đô la Mỹ",
    currencyCode: "USD",
    currencySymbol: "$",
  },
  {
    name: "Baht Thái Lan",
    currencyCode: "THB",
    currencySymbol: "฿",
  },
  {
    name: "Đô la Singapore",
    currencyCode: "SGD",
    currencySymbol: "$",
  },
  {
    name: "Yên Nhật",
    currencyCode: "JPY",
    currencySymbol: "¥",
  },
  {
    name: "Won Hàn Quốc",
    currencyCode: "KRW",
    currencySymbol: "₩",
  },
];

const CurrencyConverter = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const dispatch = useDispatch();
  const { rates, currentCurrency, currentSymbol, status } = useSelector(
    (state) => state.exchangeRate
  );

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchExchangeRates());
    }
  }, [dispatch, status]);

  const handleCurrencyChange = (currency) => {
    dispatch(setCurrency(currency));
    setIsModalOpen(false);
  };

  return (
    <>
      <div
        onClick={showModal}
        className="flex items-center cursor-pointer justify-center space-x-2 hover:underline transition-all duration-300 font-semibold"
      >
        <span>{currentSymbol}</span>
        <span>{currentCurrency}</span>
      </div>
      <Modal
        title={null}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
        closeIcon={<IoMdClose className="text-black dark:text-slate-200" />}
      >
        <h1 className="text-xl font-semibold mt-6">Chọn loại tiền tệ</h1>
        <LineSpace />
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
          {DATA_CURRENCY.map((item, i) => {
            const isActive = currentCurrency === item.currencyCode;
            return (
              <div
                key={i}
                className={`p-2 border rounded-md ${
                  isActive ? "border-blue-500" : "border-transparent"
                } hover:border-gray-200 hover:cursor-pointer`}
                onClick={() => {
                  handleCurrencyChange(item.currencyCode);
                }}
              >
                <h2>{item.name}</h2>
                <p className="text-[#6a6a6a]">
                  {item.currencyCode} - {item.currencySymbol}
                </p>
              </div>
            );
          })}
        </div>
      </Modal>
    </>
  );
};

export default CurrencyConverter;
