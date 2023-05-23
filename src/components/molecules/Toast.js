import React from "react";
import ReactDOM from "react-dom";
import { useNavigate } from "react-router-dom";
import Button from "../atoms/Button";

const Toast = ({
  show = false,
  title = "TITLE",
  imgUrl = "https://nhapkhautrungquoc.vn/wp-content/uploads/2021/08/but-bi.jpg",
  handleClose = () => {},
}) => {
  const navigate = useNavigate();
  if (typeof document === "undefined") return <div className="toast"></div>;
  return ReactDOM.createPortal(
    <div
      className={`fixed z-[9999] inset-0 toast ${
        show ? "" : "opacity-0 invisible"
      }`}
    >
      <div
        className="absolute inset-0 w-full h-screen bg-black bg-opacity-30 overlay"
        onClick={handleClose}
      ></div>
      <div className="toast-container transition ease-in-out bg-white relative max-w-[500px] rounded shadow-lg p-5 mx-auto mt-5">
        <div className="flex items-center mb-5 top gap-x-4">
          <img src={imgUrl} alt="" className="w-[68px] h-[68px]" />
          <div className="">
            <p className="font-bold text-green-500">Thêm thành công </p>
            <h2 className="italic font-medium break-line-1">{title}</h2>
            <p className="font-bold text-green-500">vào giỏ hàng!</p>
          </div>
          {/* <i className="text-2xl text-green-500 fa-solid fa-circle-check"></i> */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-8 h-8 text-green-500"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z"
            />
          </svg>
        </div>
        <div className="flex bottom space-between gap-x-4">
          <Button
            className="w-full normal-case rounded-md bg-primary hover:bg-hover"
            onClick={handleClose}
          >
            Tiếp tục mua hàng
          </Button>
          <Button
            className="w-full normal-case rounded-md bg-primary hover:bg-hover"
            onClick={() => navigate("/cart")}
          >
            Xem giỏ hàng
          </Button>
        </div>
      </div>
    </div>,
    document.querySelector("body")
  );
};

export default Toast;
