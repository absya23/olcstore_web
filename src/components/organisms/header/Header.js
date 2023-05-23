import React, { useState } from "react";
import "./Header.scss";
import Logo from "../../../assets/logo.png";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import Cart from "../cart/Cart";
import useHover from "../../../hook/useHover";
import { useCart } from "../../../context/cartContext";
import { useUser } from "../../../context/userContext";
import { useCatalogue } from "../../../context/catalogueContext";
import { removeVietnameseTones } from "../../../handlers/handleConvertUrl";

const Header = () => {
  // cart
  const { hovered: cartHover, nodeRef: cartRef } = useHover();
  // get data from cart context
  const cartContext = useCart();
  const navigate = useNavigate();
  //

  return (
    <header className="w-full header sticky top-0 z-[9999] bg-white">
      {/* content */}
      <div className="header-content h-[80px] shadow-sm w-full">
        <div className="container flex items-center justify-between h-full">
          {/* left */}
          <Link to="/" className="header--left">
            <img src={Logo} alt="" className="h-16 cursor-pointer " />
          </Link>
          {/* center  */}
          <div className="header--center w-[570px] flex flex-col">
            <SearchInput navigate={navigate}></SearchInput>
            <ul className="flex mt-1 research gap-x-3 text-note">
              <li>
                <a href="/product" className="text-sm">
                  Đồ chơi xếp hình
                </a>
              </li>
              <li>
                <a href="/product" className="text-sm">
                  Hộp bút
                </a>
              </li>
              <li>
                <a href="/product" className="text-sm">
                  Túi tote
                </a>
              </li>
              <li>
                <a href="/product" className="text-sm">
                  Sổ tay
                </a>
              </li>
            </ul>
          </div>
          {/* right */}
          <div className="relative flex items-center header--right justify-content gap-x-5">
            <div className="flex items-end justify-between font-bold gap-x-2">
              <HeaderRight navigate={navigate}></HeaderRight>
            </div>
            <div
              className="relative mx-2 cursor-pointer cart-count"
              ref={cartRef}
            >
              <span className="absolute top-0 right-0 flex items-center justify-center w-6 h-6 text-white translate-x-3 -translate-y-2 rounded-full bg-third">
                {cartContext?.totalQuantity()}
              </span>
              <span onClick={() => navigate("/cart")}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-8 h-8"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                  />
                </svg>
              </span>
              {cartHover && <Cart></Cart>}
            </div>
          </div>
        </div>
      </div>
      {/* navigate */}
      <HeaderNav></HeaderNav>
    </header>
  );
};

function useQuery() {
  const { search } = useLocation();
  return React.useMemo(() => new URLSearchParams(search), [search]);
}

const HeaderNav = () => {
  const { catalogue: dataCata } = useCatalogue();
  let query = useQuery();
  let cataId = query.get("cata");
  // console.log(cataId);
  return (
    <div className="w-full header-navigation bg-primary">
      <div className="container max-w-[1280px] text-menu">
        <ul className="flex items-center justify-start header-menu-nav gap-x-3">
          <li className="text-lg">
            <NavLink to={`/product`} className={`${!cataId ? "active1" : ""}`}>
              TẤT CẢ
            </NavLink>
          </li>
          {dataCata.length > 0 &&
            dataCata.map((item, index) => (
              <li key={index} className="text-lg">
                <NavLink
                  to={`/product?cata=${item.id_catalog}`}
                  className={`${
                    Number(cataId) === item.id_catalog ? "active1" : ""
                  }`}
                >
                  {item.name}
                </NavLink>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

const HeaderRight = ({ navigate = () => {} }) => {
  const userContext = useUser();
  const cartContext = useCart();
  const handleLogout = () => {
    // set cart
    cartContext.setCart([]);
    //
    userContext.logOut();
    //
    navigate("/");
  };
  return !userContext.user ? (
    <>
      <NavLink to="/user/signin">Đăng nhập</NavLink>
      <span>|</span>
      <NavLink to="/user/signup">Đăng ký</NavLink>
    </>
  ) : (
    <>
      <NavLink to="/profile?part=1">{userContext.user?.name}</NavLink>
      <span>|</span>
      <div className="cursor-pointer hover:text-red-500" onClick={handleLogout}>
        Thoát
      </div>
    </>
  );
};

const SearchInput = ({ navigate = () => {} }) => {
  // const navigate = useNavigation();
  const [value, setValue] = useState();
  const handleSearch = () => {
    // window.open("/search", "_self");
    navigate(`/search?key=${removeVietnameseTones(value)}`, {
      state: { searchParam: value },
    });
  };
  return (
    <div className="flex items-center justify-between h-10 mt-3 overflow-hidden border-2 rounded-lg input-group max border-primary">
      <input
        type="text"
        placeholder="Tìm kiếm sản phẩm"
        className="flex-1 px-5 py-2 outline-none"
        onChange={(e) => setValue(e.target.value)}
      />
      <button
        className="h-full px-3 border-0 outline-none cursor-pointer bg-primary hover:bg-secondary"
        onClick={() => handleSearch()}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2.6}
          stroke="currentColor"
          className="w-5 h-5 text-white"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
          />
        </svg>
      </button>
    </div>
  );
};

export default Header;
