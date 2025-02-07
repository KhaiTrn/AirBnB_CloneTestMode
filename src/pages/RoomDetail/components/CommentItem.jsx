import React from "react";
import { FaRegStar, FaStar } from "react-icons/fa6";
import { formatDistanceToNow } from "date-fns";
import { vi } from "date-fns/locale";
const CommentItem = ({
  avatar,
  tenNguoiBinhLuan,
  noiDung,
  ngayBinhLuan,
  saoBinhLuan,
}) => {
  function renderTime(ngayBinhLuan) {
    const date = new Date(ngayBinhLuan);

    // Kiểm tra nếu giá trị ngày không hợp lệ
    if (isNaN(date)) {
      return "";
    }
    return `${formatDistanceToNow(new Date(ngayBinhLuan), {
      locale: vi,
    })} trước`;
  }
  return (
    <div className="flex flex-col">
      <div className="flex gap-4">
        <div className="mb-2">
          <img
            src={avatar || "/default_avatar.jpg"}
            className="w-12 h-12 rounded-full"
            alt={tenNguoiBinhLuan}
          />
        </div>
        <div>
          <h3 className="font-semibold">{tenNguoiBinhLuan}</h3>
          <p className="text-sm">1 năm hoạt động trên Airbnb</p>
        </div>
      </div>
      <div className="flex items-center gap-1">
        <div className="flex items-center min-h-6">
          {Array.from({ length: 5 }, (_, index) =>
            index < saoBinhLuan ? (
              <FaStar key={index} size={8} />
            ) : (
              <FaRegStar key={index} size={8} />
            )
          )}
        </div>
        {renderTime(ngayBinhLuan) && <p>·</p>}
        <p className="text-xs fontsemi">{renderTime(ngayBinhLuan)}</p>
      </div>
      <div>
        <p>{noiDung}</p>
      </div>
    </div>
  );
};

export default CommentItem;
