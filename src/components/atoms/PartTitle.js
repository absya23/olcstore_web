import React from "react";

const PartTitle = ({ children, title, className = "", onClick = () => {} }) => {
  return (
    <div>
      <div
        className={`title flex justify-between items-center w-full text-[19px] font-bold text-primary py-1 ${className}`}
        onClick={onClick}
      >
        <h2 className="">{title}</h2>
        {children}
      </div>
    </div>
  );
};

export default PartTitle;
