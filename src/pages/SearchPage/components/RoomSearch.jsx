import React, { useEffect, useState } from "react";
import { IoIosStar } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { formatCurrency } from "../../../common/formatCurrency";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import {
  addFavoriteRoom,
  removeFavoriteRoom,
} from "../../../store/slice/favoriteRooms.slice";

const RoomSearch = ({ id, image, title, description, price, giuong }) => {
  const { rates, currentCurrency, currentSymbol } = useSelector(
    (state) => state.exchangeRate
  );
  const favoriteRooms = useSelector((state) => state.favoriteRooms);
  const [isFavorite, setIsFavorite] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    setIsFavorite(favoriteRooms.some((room) => room.id === id));
  }, [favoriteRooms]);

  const toggleFavorite = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isFavorite) {
      dispatch(removeFavoriteRoom(id));
    } else {
      dispatch(
        addFavoriteRoom({ id, image, title, description, price, giuong })
      );
    }
  };

  return (
    <Link to={`/rooms/${id}`} className="flex flex-col space-y-4">
      <div className="relative">
        <img
          src={image}
          alt=""
          className="rounded-md h-80 w-full object-cover"
        />
        <div
          className={`absolute top-4 right-4 bg-white p-2 rounded-full border border-gray-200 shadow-sm ${
            isFavorite ? "text-red-500" : "text-gray-500"
          }`}
          onClick={toggleFavorite}
        >
          {isFavorite ? (
            <FaHeart className="text-primary" />
          ) : (
            <FaRegHeart className="text-[#2222222]" />
          )}
        </div>
      </div>
      <div className="space-y-1">
        <div className="flex justify-between gap-4 items-center">
          <h2 className="truncate font-semibold text-[#222222]">{title}</h2>
          <p className="flex items-baseline space-x-1">
            <IoIosStar />
            <span>4,5(14)</span>
          </p>
        </div>
        <p className="text-[#6A6A6A] truncate">{description}</p>
        <p className="text-[#6A6A6A]">{giuong} giường</p>
        <div className="flex space-x-2">
          <p className="text-[#6A6A6A]">
            <strong className="text-[#222222] dark:text-white">
              {currentSymbol}
              {formatCurrency(price * rates[currentCurrency])}
            </strong>
            / đêm
          </p>
        </div>
      </div>
    </Link>
  );
};

export default RoomSearch;
