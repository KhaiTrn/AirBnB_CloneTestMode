import React, { useEffect, useState } from "react";
import { phongService } from "../../../services/phong.service";
import RoomSearch from "../../SearchPage/components/RoomSearch";
import SkeletonRoom from "./SkeletonRoom";

const Experience = () => {
  const [listPhong, setListPhong] = useState([]);
  const [visiblePhong, setVisiblePhong] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  const itemsPerPage = window.innerWidth < 768 ? 4 : 8;

  useEffect(() => {
    setIsLoading(true);
    phongService
      .getListPhong()
      .then((res) => {
        setListPhong(res.data.content);
        setVisiblePhong(res.data.content.slice(0, itemsPerPage));
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Lỗi tải danh sách phòng:", err);
        setIsLoading(false);
      });
  }, []);

  const loadMoreItems = () => {
    if (isFetchingMore || visiblePhong.length >= listPhong.length) return;

    setIsFetchingMore(true);
    const nextItems = listPhong.slice(
      visiblePhong.length,
      visiblePhong.length + itemsPerPage
    );

    setTimeout(() => {
      setVisiblePhong((prev) => [...prev, ...nextItems]);
      setIsFetchingMore(false);
    }, 1000); // Giữ độ trễ để tạo hiệu ứng mượt
  };

  const handleScroll = () => {
    const scrollThreshold = window.innerWidth < 768 ? 600 : 100;
    if (
      window.innerHeight + document.documentElement.scrollTop >=
      document.documentElement.offsetHeight - scrollThreshold
    ) {
      loadMoreItems();
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [visiblePhong, isFetchingMore]);

  return isLoading ? (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
      {Array.from({ length: itemsPerPage }).map((_, index) => (
        <SkeletonRoom key={index} />
      ))}
    </div>
  ) : (
    <div className="container py-4 px-6 md:px-10 lg:px-4">
      <h2 className="text-3xl font-semibold mb-4">Trải nghiệm đã qua</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        {visiblePhong.map((phong, index) => (
          <RoomSearch
            key={index}
            title={phong.tenPhong}
            description={phong.moTa}
            giuong={phong.phongNgu}
            id={phong.id}
            image={phong.hinhAnh}
            price={phong.giaTien}
          />
        ))}
      </div>
      {isFetchingMore && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mt-6">
          {Array.from({ length: itemsPerPage }).map((_, index) => (
            <SkeletonRoom key={`loading-${index}`} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Experience;
