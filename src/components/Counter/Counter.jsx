import React from "react";
import { FaMinus, FaPlus } from "react-icons/fa6";

const Counter = ({
  total,
  onIncrease,
  onDecrease,
  totalDefault,
  max,
  isBlockMax,
}) => {
  return (
    <div className="flex items-center gap-2">
      <div
        className={`p-2 border border-[#6A6A6A] rounded-full hover:border-[#222222] group ${
          total === totalDefault
            ? "cursor-not-allowed border-[#EBEBEB] text-[#EBEBEB] hover:border-[#EBEBEB]"
            : ""
        }`}
        onClick={onDecrease}
      >
        <FaMinus
          size={12}
          className={`${
            total === totalDefault
              ? ""
              : "text-[#6A6A6A] group-hover:text-[#222222]"
          }`}
        />
      </div>
      <span className="text-lg font-semibold">{total}</span>
      <div
        className={`p-2 border border-[#6A6A6A] rounded-full hover:border-[#222222] group ${
          total === max || isBlockMax
            ? "cursor-not-allowed border-[#EBEBEB] text-[#EBEBEB] hover:border-[#EBEBEB]"
            : ""
        }`}
        onClick={() => {
          if (!isBlockMax) {
            onIncrease();
          }
        }}
      >
        <FaPlus
          size={12}
          className={`${
            total === max || isBlockMax
              ? ""
              : "text-[#6A6A6A] group-hover:text-[#222222]"
          }`}
        />
      </div>
    </div>
  );
};

export default Counter;
