import React from "react";

const DetailRoom = ({ description }) => {
  return (
    <div className="space-y-4">
      <h3 className="text-2xl font-semibold">Giới thiệu về chỗ ở này</h3>
      <p>{description}</p>
    </div>
  );
};

export default DetailRoom;
