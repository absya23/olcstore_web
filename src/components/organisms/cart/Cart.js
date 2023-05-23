import React, { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../atoms/Button";
import emptyCart from "../../../assets/emptyCart.png";
import InputCombo from "../../molecules/InputCombo";
import { useCart } from "../../../context/cartContext";
import { removeVietnameseTones } from "../../../handlers/handleConvertUrl";
import handleFormatNumber from "../../../handlers/handleFormatNumber";
import { v4 } from "uuid";
import axios from "axios";
import { useUser } from "../../../context/userContext";

const Cart = () => {
  const navigate = useNavigate();
  // get data from cart context
  const cartContext = useCart();
  const userContext = useUser();

  return (
    <div className="cart w-[420px] bg-white rounded shadow-xl shadow-gray-500 flex flex-col absolute top-full -right-5 z-[999999] p-4 cursor-default">
      <ul className="cart-list-ul flex flex-col cart-list gap-y-3 max-h-[400px] overflow-y-auto overflow-x-hidden">
        {cartContext?.cart.length === 0 ? (
          <EmptyCart></EmptyCart>
        ) : (
          cartContext?.cart.map((item) => (
            <CartItem key={v4()} item={item}></CartItem>
          ))
        )}
      </ul>

      {!userContext.user ? (
        <Button
          className="w-full rounded-md bg-primary hover:bg-hover"
          onClick={() => navigate("/user/signin")}
        >
          Đăng nhập ngay
        </Button>
      ) : cartContext?.cart.length === 0 ? (
        <Button
          className="w-full rounded-md bg-primary hover:bg-hover"
          onClick={() => navigate("/product")}
        >
          Mua sắm ngay
        </Button>
      ) : (
        <Fragment>
          <div className="flex items-center justify-between pt-4 pb-3 mt-4 border-t">
            <span>Thành tiền</span>
            <span className="font-bold text-hot">
              {handleFormatNumber(cartContext?.totalMoney())}đ
            </span>
          </div>
          <Button
            className="w-full rounded-md bg-primary hover:bg-hover"
            onClick={() => navigate("/cart")}
          >
            Xem giỏ hàng
          </Button>
        </Fragment>
      )}
    </div>
  );
};

//id, title, image, price, quantity, stock

const CartItem = ({ item }) => {
  const navigate = useNavigate();
  const cartContext = useCart();
  const removeProductFromCart = cartContext?.removeProductFromCart || null;
  const updateQuantityFromCart = cartContext?.updateQuantityFromCart || null;
  //
  //
  const handleRemoveProductFromCart = async (item) => {
    // call API
    await axios
      .delete("http://localhost:8000/api/cart/" + item.id_cd)
      .then((res) => {
        if (res.data.status === 1) {
          // alert("Xóa sản phẩm thành công");
        }
      })
      .catch((error) => {
        console.log(error);
      });
    removeProductFromCart(item.id_prod);
  };
  //
  const handleChangeQuantityFromCart = async (item, quantity) => {
    await axios
      .put("http://localhost:8000/api/cart/" + item.id_cd, {
        id_cd: item.id_cd,
        id_prod: item.id_prod,
        quantity,
      })
      .then((res) => {
        if (res.data.status === 1) {
          // alert("Update sl sản phẩm thành công");
        }
      })
      .catch((error) => {
        console.log(error);
      });
    updateQuantityFromCart(item.id_prod, quantity);
  };
  return (
    <li className="flex items-center justify-between cursor-pointer cart-item">
      <img
        src={item.image}
        alt=""
        className="w-[88px] h-[88px] mr-3 cursor-pointer"
        onClick={() =>
          navigate(`/product/${removeVietnameseTones(item.name)}`, {
            state: { id: item.id_prod },
          })
        }
      />
      <div className="flex-1 item-info">
        <h4
          className="font-bold cursor-pointer break-line-2 hover:text-secondary"
          onClick={() =>
            navigate(`/product/${removeVietnameseTones(item.name)}`, {
              state: { id: item.id_prod },
            })
          }
        >
          {item.name}
        </h4>
        <p className="font-bold price text-hot">
          Đơn giá: {handleFormatNumber(item.price)}
        </p>
        <div className="flex items-center quantity gap-x-1">
          <InputCombo
            id={item.id_prod}
            quantity={item.quantity}
            max={item.stock}
            action={(count) => handleChangeQuantityFromCart(item, count)}
          ></InputCombo>
        </div>
      </div>
      <i
        className="w-3 p-3 cursor-pointer fa-solid fa-trash hover:text-primary mr-2"
        onClick={() => handleRemoveProductFromCart(item)}
      ></i>
    </li>
  );
};

const EmptyCart = () => {
  return (
    <div className="p-5 mb-5">
      <img src={emptyCart} alt="" className="w-full" />
    </div>
  );
};

export default Cart;
