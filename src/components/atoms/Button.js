import React from "react";

const Button = ({ className, children, onClick = () => {}, ...props }) => {
  return (
    <button
      className={`text-white bg-primary rounded-md leading-none w-full my-auto cursor-pointer uppercase py-3 ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
