import { Pagination } from "antd";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import PageNotFound from "../../components/PageNotFound";
import LoadingCustom from "../../components/ui/loading/LoadingCustom";
import { phongService } from "../../services/phong.service";
import { useSearchPageContext } from "../../store/SearchPageContext";
import FilterSearch from "./components/FilterSearch";
import RoomSearch from "./components/RoomSearch";
import MapSearch from "./components/MapSearch";
import { Helmet } from "react-helmet";

const SearchPage = () => {
  const { listRoom, setListRoom, originalListRoom, setOriginalListRoom } =
    useSearchPageContext();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const queryParams = new URLSearchParams(location.search);
  const keyValue = queryParams.get("key");

  // console.log(keyValue);
  useEffect(() => {
    setIsLoading(true);
    if (keyValue) {
      phongService
        .getListRoomById(keyValue)
        .then((res) => {
          // console.log(res.data.content);
          setListRoom(res.data.content);
          setOriginalListRoom(res.data.content);
          setIsLoading(false);
        })
        .catch((err) => {
          // console.log(err);
          setIsError(true);
        });
    }
  }, [keyValue, location.search]);

  return keyValue && !isError ? (
    <div className="min-h-screen">
      <FilterSearch />
      {isLoading ? (
        <LoadingCustom />
      ) : listRoom.length === 0 ? (
        <div className="my-6 px-6 md:px-10 flex flex-col items-center justify-center gap-10">
          <Helmet>
            <title>AirBnb - Không có kết quả nào</title>
          </Helmet>
          <h2 className="text-center font-semibold">Không có kết quả nào</h2>
          <img src="/nodatafound.png" className="w-1/2" alt="" />
        </div>
      ) : (
        <div className="flex flex-col-reverse md:grid lg:grid-cols-3 sticky lg:relative top-1/2">
          <div className="px-6 col-span-2">
            <h2 className="my-6 font-semibold text-center md:text-left">
              {listRoom.length} chỗ ở
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {listRoom.map((item, index) => {
                return (
                  <RoomSearch
                    key={index}
                    id={item.id}
                    image={item.hinhAnh}
                    title={item.tenPhong}
                    price={item.giaTien}
                    giuong={item.phongNgu}
                    description={item.moTa}
                  />
                );
              })}
            </div>
            <div className="flex justify-center mt-20 mb-8">
              <Pagination defaultCurrent={1} total={1} />
            </div>
          </div>
          <MapSearch />
        </div>
      )}
    </div>
  ) : (
    <PageNotFound />
  );
};

export default SearchPage;
