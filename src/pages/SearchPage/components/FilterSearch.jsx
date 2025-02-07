import React, { useState } from "react";
import { DropdownCustom } from "../../../components/ui/dropdown/DropdownCustom";
import {
  ButtonOutLine,
  ButtonPrimary,
} from "../../../components/ui/button/ButtonCustom";
import { Icons } from "../../../assets/Icons";
import { InputNumber, Slider } from "antd";
import { useSearchPageContext } from "../../../store/SearchPageContext";
import { useSelector } from "react-redux";

const currencySettings = {
  VND: {
    step: 100e3,
    max: 2e6,
    locale: "vi-VN",
  },
  USD: {
    step: 10,
    max: 1e3,
    locale: "en-US",
  },
  THB: {
    step: 50,
    max: 5e3,
    locale: "th-TH",
  },
  JPY: {
    step: 100,
    max: 10e3,
    locale: "ja-JP",
  },
  KRW: {
    step: 1000,
    max: 1e5,
    locale: "ko-KR",
  },
  SGD: {
    step: 5,
    max: 5e3,
    locale: "en-SG",
  },
};

const FilterSearch = () => {
  const { rates, currentCurrency } = useSelector((state) => state.exchangeRate);
  const { setListRoom, originalListRoom } = useSearchPageContext();
  const [range, setRange] = useState([0, 200e3]);
  const { step, max, locale } = currencySettings[currentCurrency];

  const handleFilterPrice = () => {
    const [min, max] = range;
    const dataFilter = originalListRoom.filter((room) => {
      return (
        room.giaTien >= min / rates[currentCurrency] &&
        room.giaTien <= max / rates[currentCurrency]
      );
    });
    setListRoom(dataFilter);
  };

  const handleSliderChange = (value) => {
    setRange(value);
  };

  const handleInputChange = (value, index) => {
    const newRange = [...range];
    newRange[index] = value || 0;
    setRange(newRange);
  };

  return (
    <div className="shadow-sm px-4 relative lg:sticky lg:top-24 hidden md:flex bg-white dark:bg-slate-800 items-center dark:shadow-white py-4 lg:z-10">
      <div className="container flex space-x-4">
        <div className="border-r pr-4 border-gray-200 flex flex-wrap gap-2">
          <DropdownCustom
            items={[
              {
                label: (
                  <div
                    className="p-6 w-96"
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                  >
                    <p className="text-lg mb-4">
                      Tìm theo khoảng{" "}
                      <span className="font-semibold">giá / đêm</span>
                    </p>
                    <div className="flex items-center gap-2">
                      <p>Giá từ</p>
                      <InputNumber
                        min={0}
                        max={max}
                        step={step}
                        value={range[0]}
                        formatter={(value) =>
                          `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ".")
                        }
                        parser={(value) => value.replace(/\./g, "")}
                        onChange={(value) => handleInputChange(value, 0)}
                      />
                    </div>
                    <Slider
                      className="w-full"
                      range
                      value={range}
                      step={step}
                      max={max}
                      onChange={handleSliderChange}
                      tooltip={{
                        formatter: (value) =>
                          value.toLocaleString(
                            currentCurrency === "USD" ? "en-US" : "vi-VN",
                            {
                              style: "currency",
                              currency: currentCurrency,
                            }
                          ),
                      }}
                    />

                    {/* Input bên phải */}
                    <div className="flex items-center gap-2">
                      <p>Giá đến</p>
                      <InputNumber
                        min={0}
                        max={max}
                        step={step}
                        value={range[1]}
                        formatter={(value) =>
                          `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ".")
                        }
                        parser={(value) => value.replace(/\./g, "")}
                        onChange={(value) => handleInputChange(value, 1)}
                      />
                    </div>
                    <div className="flex justify-end gap-4 mt-4">
                      <ButtonPrimary
                        className={""}
                        onClick={handleFilterPrice}
                        children={<span>Lọc</span>}
                      />
                    </div>
                  </div>
                ),
              },
            ]}
            icon={true}
          >
            <span>Giá</span>
          </DropdownCustom>
          <DropdownCustom icon={true}>Thời gian trong ngày</DropdownCustom>
          <DropdownCustom icon={true}>Ngôn ngữ có thể sử dụng</DropdownCustom>
        </div>
        <div className="flex flex-wrap gap-2">
          <ButtonOutLine className={"text-base !py-5"} roundedfull={true}>
            Nghệ thuật và văn hóa
          </ButtonOutLine>
          <ButtonOutLine className={"text-base !py-5"} roundedfull={true}>
            Giải trí
          </ButtonOutLine>
          <ButtonOutLine className={"text-base !py-5"} roundedfull={true}>
            Thức ăn và đồ uống
          </ButtonOutLine>
          <ButtonOutLine className={"text-base !py-5"} roundedfull={true}>
            Thể thao
          </ButtonOutLine>
          <ButtonOutLine className={"text-base !py-5"} roundedfull={true}>
            Tour
          </ButtonOutLine>
          <ButtonOutLine className={"text-base !py-5"} roundedfull={true}>
            Tham quan
          </ButtonOutLine>
          <ButtonOutLine className={"text-base !py-5"} roundedfull={true}>
            <Icons.filter />
            Bộ lọc
          </ButtonOutLine>
        </div>
      </div>
    </div>
  );
};

export default FilterSearch;
