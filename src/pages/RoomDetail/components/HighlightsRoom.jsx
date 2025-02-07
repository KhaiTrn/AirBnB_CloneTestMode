import React from "react";
import { Icons } from "../../../assets/Icons";

const DATA_HIGHLIGHTS_ROOM = [
  {
    icon: <Icons.room />,
    title: "Phòng trong căn hộ cho thuê",
    param:
      "Bạn sẽ có phòng riêng trong một ngôi nhà và được sử dụng những khu vực chung.",
  },
  {
    icon: <Icons.door />,
    title: "Tự nhận phòng",
    param: "Bạn có thể gặp nhân viên trực cửa để nhận phòng.",
  },
  {
    icon: <Icons.medal />,
    title: "Minh Nhan là Chủ nhà siêu cấp",
    param:
      "Chủ nhà siêu cấp là những Chủ nhà dày dạn kinh nghiệm, được đánh giá cao.",
  },
];

const HighlightsRoom = () => {
  return (
    <div className="flex flex-col gap-6">
      {DATA_HIGHLIGHTS_ROOM.map((item, index) => {
        return (
          <div className="flex gap-10 items-center" key={index}>
            <div>{item.icon}</div>
            <div className="flex-1 flex flex-col">
              <h3 className="font-semibold">{item.title}</h3>
              <p className="text-[#6a6a6a] text-sm">{item.param}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default HighlightsRoom;
