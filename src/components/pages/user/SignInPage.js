import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useUser } from "../../../context/userContext";
import Button from "../../atoms/Button";
import SignInForm from "../../organisms/form/SignInForm";
import "./userPage.scss";

const SignInPage = () => {
  let navigate = useNavigate();
  const userContext = useUser();
  return !userContext.user ? (
    <div className="sign-in-page">
      <div className="container">
        <div className="mx-auto content max-w-[600px] flex flex-col justify-center items-center mt-10 mb-20 border border-[#d0c8cd33]">
          <div className="flex items-center w-full font-bold uppercase bg-white shadow user-nav justify-evenly">
            <NavLink to="/user/signin" activeclassname="active">
              Đăng nhập
            </NavLink>
            <NavLink to="/user/signup" activeclassname="active">
              Đăng ký
            </NavLink>
          </div>
          <div className="w-full px-10 py-4 form">
            <SignInForm></SignInForm>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div className="container flex flex-col items-center justify-center my-10">
      <p className="mb-5 font-bold text-green-500">
        Bạn đã đăng nhập thành công
      </p>
      <Button
        className="max-w-[300px] hover:bg-secondary"
        onClick={() => navigate("/")}
      >
        Quay lại trang chủ
      </Button>
    </div>
  );
};

export default SignInPage;
