import React from "react";
import { Outlet } from "react-router-dom";
import HeaderHomeTemplate from "./components/HeaderHomeTemplate";
import FooterHomeTemplate from "./components/FooterHomeTemplate";
import { HeaderProvider } from "../../store/HeaderContext";

const HomeTemplate = () => {
  return (
    <>
      <HeaderProvider>
        <HeaderHomeTemplate />
      </HeaderProvider>
      <main>
        <Outlet />
      </main>
      <FooterHomeTemplate />
    </>
  );
};

export default HomeTemplate;
