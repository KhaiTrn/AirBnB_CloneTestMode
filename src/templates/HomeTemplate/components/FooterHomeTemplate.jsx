import React from "react";
import { dataFooter } from "../../../common/constant";
import { Link } from "react-router-dom";
import { RiGlobalLine } from "react-icons/ri";
import { FaFacebookSquare } from "react-icons/fa";
import { FaSquareInstagram, FaSquareTwitter } from "react-icons/fa6";
import CurrencyConverter from "./CurrencyConverter";

const FooterHomeTemplate = () => {
  return (
    <>
      <footer className="bg-[#F7F7F7] dark:bg-slate-700 dark:text-slate-200 text-[#222222] py-10">
        <div className="container px-6 lg:px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {dataFooter.map((item, i) => {
              return (
                <ul key={i} className="space-y-3 text-sm">
                  <h3 className="font-semibold">{item.title}</h3>
                  {item.children.map((child, i) => {
                    return (
                      <li key={i}>
                        <Link className="hover:underline transition-all duration-200">
                          {child.title}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              );
            })}
          </div>
        </div>
      </footer>
      <div className="relative md:sticky border-t py-2 bg-[#F7F7F7] dark:bg-slate-700 dark:text-slate-200 text-[#222222] bottom-0 md:z-50">
        <div className="container flex px-6 md:px-10 flex-col-reverse gap-6 md:gap-0 lg:flex-row justify-between items-center ">
          <div className="">
            <span className="text-sm">
              © 2024 Airbnb, Inc.<span className="mx-2">·</span>
              <Link className="hover:underline transition-all duration-200">
                Quyền riêng tư
              </Link>
              <span className="mx-2">·</span>
              <Link className="hover:underline transition-all duration-200">
                Điều khoản
              </Link>
              <span className="mx-2">·</span>
              <Link className="hover:underline transition-all duration-200">
                Sơ đồ trang web
              </Link>
            </span>
          </div>
          <div className="space-x-4 items-center flex">
            <button className="flex items-center justify-center space-x-2 hover:underline transition-all duration-300 font-semibold">
              <RiGlobalLine /> <span>Tiếng Việt (VN)</span>
            </button>
            <CurrencyConverter />
            <div>
              <Link>
                <FaFacebookSquare size={20} />
              </Link>
            </div>
            <div>
              <Link>
                <FaSquareTwitter size={20} />
              </Link>
            </div>
            <div>
              <Link>
                <FaSquareInstagram size={20} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FooterHomeTemplate;
