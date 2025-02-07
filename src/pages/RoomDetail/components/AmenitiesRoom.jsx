import React from "react";
import { Icons } from "../../../assets/Icons";

const AmenitiesRoom = ({
  mayGiat,
  banLa,
  tivi,
  dieuHoa,
  wifi,
  bep,
  doXe,
  hoBoi,
  banUi,
}) => {
  const amenities = [
    {
      key: "mayGiat",
      label: "Máy giặt",
      icon: Icons.mayGiat,
      isAvailable: mayGiat,
    },
    { key: "banLa", label: "Bàn là", icon: Icons.banLa, isAvailable: banLa },
    { key: "tivi", label: "Tivi", icon: Icons.tivi, isAvailable: tivi },
    {
      key: "dieuHoa",
      label: "Điều hòa",
      icon: Icons.dieuHoa,
      isAvailable: dieuHoa,
    },
    { key: "wifi", label: "Wi-fi", icon: Icons.wifi, isAvailable: wifi },
    { key: "bep", label: "Bếp", icon: Icons.bep, isAvailable: bep },
    {
      key: "doXe",
      label: "Chỗ đỗ xe miễn phí tại nơi ở",
      icon: Icons.doXe,
      isAvailable: doXe,
    },
    { key: "hoBoi", label: "Hồ bơi", icon: Icons.hoBoi, isAvailable: hoBoi },
    { key: "banUi", label: "Bàn ủi", icon: Icons.banUi, isAvailable: banUi },
  ];

  return (
    <div className="flex flex-col py-6">
      <h2 className="text-2xl font-semibold mb-6">
        Nơi này có những gì cho bạn
      </h2>
      <div className="grid grid-cols-2 gap-4">
        {amenities
          .filter((amenity) => amenity.isAvailable)
          .map((amenity) => (
            <div className="flex gap-4" key={amenity.key}>
              <div>
                <amenity.icon />
              </div>
              <div className="flex-1">{amenity.label}</div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default AmenitiesRoom;
