import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "../organisms/footer/Footer";
import Header from "../organisms/header/Header";

const Main = () => {
  return (
    <>
      <Header></Header>
      {/* là những cái nested route bên trong thằng Main */}
      <Outlet></Outlet>
      <Footer></Footer>
    </>
  );
};

export default Main;
