import React from "react";
import "./Footer.scss";
import Logo from "../../../assets/logo.png";

const Footer = () => {
  return (
    <footer className="footer w-full bg-primary text-white font-bold py-5 flex flex-col">
      <div className="container flex flex-col justify-between items-start lg:flex-row my-5 gap-y-5">
        {/* part 1 */}
        <div>
          <div className="mb-1">
            <div className="icon"></div>
            <div className="text">
              <h2 className="text-[17px]">Hotline</h2>
              <p className="text-2xl">0123456789</p>
            </div>
          </div>
          <div className="mb-1">
            <div className="icon"></div>
            <div className="text">
              <h2 className="text-[17px]">Email</h2>
              <p className="text-[17px]">cskh@olc.vn</p>
            </div>
          </div>
          <ul>
            <li className="text-sm">CHÍNH SÁCH MUA HÀNG</li>
            <li className="text-sm">HƯỚNG DẪN MUA HÀNG</li>
          </ul>
        </div>
        {/* part 2 */}
        <div>
          <h2 className="uppercase text-[17px] mb-2">Hà nội (9h - 22h)</h2>
          <ul className="list-disc text-sm pl-6">
            <li>81 Bà Triệu, Hai Bà Trưng</li>
            <li>241 Chùa Bộc, Đống Đa</li>
            <li>60 Trần Đại Nghĩa, Hai Bà Trưng</li>
            <li>157 Xuân Thủy, Cầu Giấy</li>
          </ul>
        </div>
        {/* part 3 */}
        <div>
          <h2 className="uppercase text-[17px] mb-2">
            TP Hồ Chí Minh (9h30 - 22h)
          </h2>
          <ul className="list-disc text-sm pl-6">
            <li>92 Hồ Tùng Mậu, P.Bến Nghé, Q1</li>
            <li>708 Sư Vạn Hạnh, P.12, Q.10 (đối diện chéo Vạn Hạnh Mall)</li>
            <li>87 Bàu Cát, P.14, Q.Tân Bình (khúc giao Nguyễn Hồng Đào)</li>
          </ul>
        </div>
        {/* part 4 */}
        <div className="flex flex-col items-center">
          <div className="logo mb-2">
            <img src={Logo} alt="" className="h-16 header--left" />
          </div>
          <div>
            <p className="text-sm mb-1">Hãy kết nối với chúng mình</p>
            <div className="flex gap-x-2">
              <a href="/">
                <i className="fa-brands fa-square-facebook text-xl hover:scale-110 hover:text-hover"></i>
              </a>
              <a href="/">
                <i className="fa-brands fa-square-instagram text-xl hover:scale-110 hover:text-hover"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full h-[3px] bg-white"></div>
      <div className="mt-5">
        <p className="text-center">
          Copyright&copy;{" "}
          <a href="https://moji.vn/" className="text-hover font-bold">
            moji.vn
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
