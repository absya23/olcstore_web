import React, { useState } from "react";

const message = "Bạn đã đạt đến số lượng tối đa có sẵn cho mặt hàng này";

const InputCombo = ({
  id = 1,
  className,
  // số lượng khi thêm vào, mặc định là 1
  quantity = 1,
  // số lượng còn lại trong kho,
  max = 10,
  // api
  // setTemp = () => {},
  // hàm change quantity nếu type = "CART"
  action = () => {},
  ...props
}) => {
  const [count, setCount] = useState(quantity);
  const [noti, setNoti] = useState(false);
  const maximum = max;
  const handleDecrease = () => {
    if (count > 1) {
      setCount((prev) => prev - 1);
      action(count - 1);
      setNoti(false);
    }
  };
  const handleIncrease = () => {
    if (Number(count) === Number(maximum)) {
      setCount(maximum);
      action(maximum);
      setNoti(true);
    } else {
      setCount((prev) => prev + 1);
      action(count + 1);
      setNoti(false);
    }
  };
  const handleOnchange = (e) => {
    setCount(e.target.value);
  };
  const handleBlur = (e) => {
    if (e.target.value === "" || Number(e.target.value) === 0) {
      setCount(1);
      action(1);
      setNoti(false);
    } else if (count > maximum) {
      setCount(maximum);
      action(maximum);
      setNoti(true);
    } else {
      setCount(e.target.value);
      action(e.target.value);
    }
  };

  return (
    <div
      className={`flex flex-col justify-start items-start gap-y-2 ${className}`}
    >
      <div className="flex justify-center h-8">
        <div
          className="cursor-pointer minus p-1 flex justify-center items-center border border-border bg-white hover:bg-border"
          onClick={handleDecrease}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-4 h-4"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M18 12H6" />
          </svg>
        </div>
        <input
          type="text"
          value={count}
          {...props}
          name="quantity"
          min="1"
          className="w-12 text-center px-2 border-t border-b outline-none focus:border-primary"
          onChange={(e) => handleOnchange(e)}
          onBlur={(e) => handleBlur(e)}
        />
        <div
          className="cursor-pointer plus p-1 flex justify-center items-center border border-border bg-white hover:bg-border"
          onClick={handleIncrease}
        >
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
              d="M12 6v12m6-6H6"
            />
          </svg>
        </div>
      </div>
      {noti ? <span className="text-sm text-red-500">{message}</span> : null}
    </div>
  );
};

export default InputCombo;
