import React from "react";
import { useSelector } from "react-redux";
import RoomSearch from "../SearchPage/components/RoomSearch";

const FavoriteRoom = () => {
  const favoriteRooms = useSelector((state) => state.favoriteRooms);

  console.log(favoriteRooms);
  if (favoriteRooms.length > 0) {
    return (
      <div className="container py-4 px-6 md:px-10 lg:px-4">
        <div className="flex flex-col">
          <h3 className="text-xl font-semibold">Yêu thích</h3>
          <p>{favoriteRooms.length} chỗ ở được yêu thích</p>
          <div className="grid grid-cols-1 py-10 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {favoriteRooms.map((phong, index) => (
              <RoomSearch
                key={index}
                title={phong.title}
                description={phong.description}
                giuong={phong.giuong}
                id={phong.id}
                image={phong.image}
                price={phong.price}
              />
            ))}
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="flex flex-col container py-4 px-6 md:px-10 lg:px-4">
        <h2 className="text-xl font-semibold">
          Không có chỗ ở nào được yêu thích
        </h2>
        <div className="flex justify-center">
          <img
            src="/nodatafound.png"
            className="w-full py-10 lg:w-1/2"
            alt="nodata"
          />
        </div>
      </div>
    ); // Đảm bảo return JSX
  }
};

export default FavoriteRoom;
