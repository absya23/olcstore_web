import React from "react";
import { useNavigate } from "react-router-dom";
import notFound from "../../assets/notFound.png";
import Button from "../atoms/Button";
const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div className="container flex flex-col items-center">
      <img src={notFound} alt="" className="max-w-[500px] mx-auto my-5" />
      <Button
        className="w-auto px-3 mb-10 normal-case border rounded-lg bg-primary hover:border-secondary hover:text-secondary hover:bg-white"
        onClick={() => navigate("/")}
      >
        Quay về trang chủ
      </Button>
    </div>
  );
};

export default NotFound;
