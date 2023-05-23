import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useFavo } from "../../../context/favoContext";
import { useOrder } from "../../../context/orderContext";
import { useUser } from "../../../context/userContext";
import Button from "../../atoms/Button";
import UserInfo from "../../molecules/UserInfo";
import UserFav from "./UserFav";
import UserOrder from "./UserOrder";
import UserPassword from "./UserPassword";
import UserProfile from "./UserProfile";

function useQuery() {
  const { search } = useLocation();
  return React.useMemo(() => new URLSearchParams(search), [search]);
}

const ProfilePage = () => {
  const navigate = useNavigate();
  const userContext = useUser();
  const orderContext = useOrder();
  const favoContext = useFavo();
  const query = useQuery();
  let part = query.get("part");
  const [actPart, setActPart] = useState(Number(part));
  // console.log(userContext.user);
  // useEffect(() => {
  //   if (!userContext.user) navigate("/user/signin");
  // }, [userContext.user]);
  return (
    <div className="container flex flex-col my-10 profile-page">
      {userContext.user && (
        <>
          <div className="flex items-center pb-5 gap-x-2">
            <Link className="hover:text-secondary" to="/">
              Trang chủ
            </Link>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 4.5l7.5 7.5-7.5 7.5"
              />
            </svg>
            <Link
              className="hover:text-secondary"
              onClick={() => setActPart(1)}
            >
              Thông tin tài khoản
            </Link>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 4.5l7.5 7.5-7.5 7.5"
              />
            </svg>
            {actPart === 1 && (
              <Link className="font-bold text-primary">Hồ sơ</Link>
            )}
            {actPart === 2 && (
              <Link className="font-bold text-primary">Thay đổi mật khẩu</Link>
            )}
            {actPart === 3 && (
              <Link className="font-bold text-primary">
                Quản lý lịch sử đơn hàng
              </Link>
            )}
            {actPart === 4 && (
              <Link className="font-bold text-primary">Sản phẩm yêu thích</Link>
            )}
          </div>
          <div className="grid grid-cols-4 content gap-x-10">
            <UserInfo
              name={userContext.user.name}
              actPart={actPart}
              onChangePart={(number) => setActPart(number)}
            ></UserInfo>
            {actPart === 1 && <UserProfile></UserProfile>}
            {actPart === 2 && <UserPassword></UserPassword>}
            {actPart === 3 && (
              <UserOrder
                user={userContext.user}
                orders={orderContext.orders}
                navigate={navigate}
              ></UserOrder>
            )}
            {actPart === 4 && (
              <UserFav
                user={userContext.user}
                favoProds={favoContext.favoProds}
                navigate={navigate}
              ></UserFav>
            )}
          </div>
        </>
      )}
      {!userContext.user && (
        <div className="content bg-[#fff3cd] p-10 border border-[#ffeeba] flex flex-col justify-center items-center rounded-md">
          <p className="mb-3">Qúy khách vui lòng đăng nhập!</p>
          <Button
            className="w-[140px] rounded-md bg-secondary hover:bg-white hover:text-secondary border hover:border-secondary"
            onClick={() => navigate("/user/signin")}
          >
            Đăng nhập
          </Button>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
