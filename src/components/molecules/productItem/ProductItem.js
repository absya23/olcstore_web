import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../../context/cartContext";
import { useFavo } from "../../../context/favoContext";
import { useUser } from "../../../context/userContext";
import { removeVietnameseTones } from "../../../handlers/handleConvertUrl";
import handleFormatNumber from "../../../handlers/handleFormatNumber";
import LoadingSkeleton from "../../../loading/LoadingSkeleton";
import Toast from "../Toast";
import "./ProductItem.scss";

const ProductItem = ({
  id = 1,
  tag = true,
  title = "EMPTY",
  price = "EMPTY",
  image = "https://img.cdn.vncdn.io/nvn/ncdn/store/7534/ps/20221004/22093331.jpg",
  stock = 0,
  soldQuanity = 0,
}) => {
  //
  const userContext = useUser();
  //
  const [isHover, setIsHover] = useState(false);
  const [showToastMess, setShowToastMess] = useState(false);
  const convertTitle = removeVietnameseTones(title);
  const navigate = useNavigate();
  const cartContext = useCart();
  const favoContext = useFavo();

  //
  const handleAddToCart = async () => {
    if (stock == 0) {
      alert("Sản phẩm đã hết hàng! Không thể thêm sản phẩm");
    } else if (userContext.user) {
      const data = {
        id_prod: id,
        name: title,
        image,
        price,
        // stock: product.stock,
        quantity: 1,
        variantId: 0,
      };
      // call API
      await axios
        .post("http://localhost:8000/api/cart/", {
          id_user: userContext?.user.id_user,
          id_prod: id,
          quantity: 1,
        })
        .then((res) => {
          // alert("Thêm sản phẩm thành công");
        })
        .catch((error) => {
          console.log(error);
        });

      //
      cartContext.addProductToCart(data, 1);
      setShowToastMess(true);
      setTimeout(() => {
        setShowToastMess(false);
      }, 5000);
    } else {
      alert("Vui lòng đăng nhập!");
      navigate("/user/signin");
    }
  };

  const handleAddFavo = async () => {
    // call API
    await axios
      .post(`http://localhost:8000/api/favo`, {
        id_user: userContext?.user.id_user,
        id_prod: id,
      })
      .then((res) => {
        alert("Đã thêm sản phẩm vào phần yêu thích");
      })
      .catch((error) => {
        console.log(error);
      });

    await axios
      .get(`http://localhost:8000/api/favo/${userContext?.user.id_user}`)
      .then((res) => {
        favoContext.setFavoProds(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="cursor-pointer product-item">
      <Toast
        show={showToastMess}
        title={title}
        imgUrl={image}
        handleClose={() => setShowToastMess(false)}
      ></Toast>
      <div className="relative mb-2 image">
        {stock == 0 && (
          <span className="absolute top-0 left-0 z-10 px-2 py-1 text-white bg-gray-500">
            Hết hàng
          </span>
        )}

        {Number(stock) !== 0 && Number(soldQuanity) !== 0 && (
          <span className="absolute top-0 left-0 z-10 px-2 py-1 text-white bg-red-400">
            {soldQuanity} đã bán
          </span>
        )}

        <img
          src={image}
          alt=""
          onClick={() =>
            navigate(`/product/${convertTitle}`, { state: { id } })
          }
        />
        <div className="absolute bottom-0 left-0 flex items-center justify-center w-full py-1 product-action bg-primary opacity-70 gap-x-2">
          <div
            className="text-white cursor-pointer heart"
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
            onClick={handleAddFavo}
          >
            {isHover ? (
              <i className="fa-solid fa-heart text-white text-2xl"></i>
            ) : (
              <i className="fa-regular fa-heart text-2xl"></i>
            )}
          </div>
          <div
            className="text-white bg-transparent cursor-pointer cart"
            onClick={() => handleAddToCart()}
          >
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
                d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
        </div>
      </div>
      <div
        className="flex flex-col"
        onClick={() => navigate(`/product/${convertTitle}`, { state: { id } })}
      >
        <h3 className="mb-3 name break-line-2">{title}</h3>
        <div className="font-extrabold price text-[17px]">
          {handleFormatNumber(price)}đ
        </div>
      </div>
    </div>
  );
};

export const ProductItemMini = ({
  id = 1,
  title = "EMPTY",
  price = "EMPTY",
  image = "https://img.cdn.vncdn.io/nvn/ncdn/store/7534/ps/20221004/22093331.jpg",
}) => {
  const convertTitle = removeVietnameseTones(title);
  const navigate = useNavigate();
  const [showToastMess, setShowToastMess] = useState(false);
  const cartContext = useCart();
  const handleAddToCart = () => {
    const data = {
      id,
      title,
      image,
      price,
      // stock: product.stock,
      quantity: 1,
      variantId: 0,
    };
    cartContext.addProductToCart(data, 1);
    setShowToastMess(true);
    setTimeout(() => {
      setShowToastMess(false);
    }, 5000);
  };
  return (
    <div className="cursor-pointer product-item">
      <Toast
        show={showToastMess}
        title={title}
        imgUrl={image}
        handleClose={() => setShowToastMess(false)}
      ></Toast>
      <div className="relative mb-2 image">
        <img
          src={image}
          alt=""
          onClick={() =>
            navigate(`/product/${convertTitle}`, { state: { id } })
          }
        />
        <div className="absolute bottom-0 left-0 flex items-center justify-center w-full py-1 product-action bg-primary opacity-70 gap-x-2">
          <div className="text-white cursor-pointer heart">
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
                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
              />
            </svg>
          </div>
          <div
            className="text-white cursor-pointer cart"
            onClick={() => handleAddToCart()}
          >
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
                d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
        </div>
      </div>
      <div
        className="flex flex-col"
        onClick={() => navigate(`/${convertTitle}`, { state: { id } })}
      >
        <h3 className="mb-3 name break-line-1">{title}</h3>
        <div className="font-extrabold price text-[17px]">
          {handleFormatNumber(price)}đ
        </div>
      </div>
    </div>
  );
};

export const ProductItemImage = ({
  name = "EMPTY",
  image = "https://img.cdn.vncdn.io/nvn/ncdn/store/7534/ps/20221004/22093331.jpg",
}) => {
  return (
    <div className="cursor-auto product-item-2">
      <div className="relative mb-2 image">
        <img src={image} alt="" />
        <div className="absolute inset-0 flex items-center justify-center w-full h-full bg-white product-action opacity-70">
          <span className="text">{name}</span>
        </div>
      </div>
    </div>
  );
};

export const ProductItemSkeleton = () => {
  return (
    <div className="cursor-pointer product-item min-h-[200px]">
      <LoadingSkeleton
        width="100%"
        height="150px"
        radius="8px"
        className="mb-5"
      ></LoadingSkeleton>
      <div className="flex flex-col">
        <h3 className="mb-3 text-xl font-bold">
          <LoadingSkeleton width="100%" height="20px"></LoadingSkeleton>
        </h3>
        <span>
          <LoadingSkeleton width="50px" height="10px"></LoadingSkeleton>
        </span>
      </div>
    </div>
  );
};

export default ProductItem;
