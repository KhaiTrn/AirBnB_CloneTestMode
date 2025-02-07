import React from "react";
import "./CategoryNavbar.scss";
import Slider from "react-slick";
import { dataCategory } from "../../../common/constant";
import useViewPort from "../../../hooks/useViewPort";
import { useTheme } from "../../../store/ThemeContext";

const CategoryNavbar = () => {
  const { width } = useViewPort();
  const { isDarkMode } = useTheme();
  var settings = {
    infinite: false,
    arrow: false,
    speed: 500,
    slidesToShow: width < 576 ? 3 : width < 1024 ? 4 : 10,
    slidesToScroll: width < 576 ? 2 : width < 1024 ? 3 : 4,
  };

  return (
    <div className="shadow-sm dark:shadow-white sticky top-[81px] md:top-24 bg-white dark:bg-slate-800 z-10">
      <div className="py-2 container px-10">
        <Slider {...settings}>
          {dataCategory.map((item, index) => {
            return (
              <div
                key={index}
                className="!flex flex-col gap-2 justify-center items-center opacity-70 cursor-pointer hover:opacity-100 transition-all duration-200"
              >
                <img
                  className="w-6 h-6 text-white"
                  src={`${item.icon}${isDarkMode ? "_dark_theme.png" : ".png"}`}
                  alt=""
                />
                <h3 className="text-xs text-center">{item.title}</h3>
              </div>
            );
          })}
        </Slider>
      </div>
    </div>
  );
};

export default CategoryNavbar;
