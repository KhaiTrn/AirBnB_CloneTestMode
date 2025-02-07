import React from "react";
import CategoryNavbar from "../../templates/HomeTemplate/components/CategoryNavbar";
import Experience from "./components/Experience";
import { Helmet } from "react-helmet";

const HomePage = () => {
  return (
    <>
      <Helmet>
        <title>
          Airbnb | Nhà nghỉ dưỡng cho thuê, cabin, nhà trên bãi biển, v.v.
        </title>
      </Helmet>
      <CategoryNavbar />
      <Experience />
      <section className="mb-10"></section>
    </>
  );
};

export default HomePage;
