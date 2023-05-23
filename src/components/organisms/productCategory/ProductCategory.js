import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { v4 } from "uuid";
import { useCatalogue } from "../../../context/catalogueContext";
import { useTypes } from "../../../context/typeProductContext";
import PartTitle from "../../atoms/PartTitle";

const ProductCategory = ({ activeCata = null, activeType = null }) => {
  // get data

  const { catalogue: dataCata } = useCatalogue();
  const { types: dataType } = useTypes();

  // resolve
  const [showMenu, setShowMenu] = useState(true);
  const handleToggleMenu = () => {
    // if (!showMenu) {
    //   const submenus = document.querySelectorAll(".sub-data-list");
    //   Array.from(submenus).forEach((item) => item.classList.remove("show"));
    // }
    setShowMenu(!showMenu);
  };

  const openSubmenu = (e) => {
    const parent = e.target.closest(".data-item");
    if (parent.querySelector(".sub-data-list"))
      parent.querySelector(".sub-data-list").classList.toggle("show");
  };

  useEffect(() => {
    if (activeType) {
      let string = `li[data-id="${activeType}"`;
      const submenus = document.querySelectorAll(".sub-data-list");
      Array.from(submenus).forEach((item) => {
        if (item.querySelector(string)) {
          item
            .querySelector(string)
            .closest(".sub-data-list")
            .classList.add("show");
        }
      });
    }
  }, [activeType]);

  return (
    <div className="mb-5 product-category">
      <PartTitle
        className="cursor-pointer"
        title="Danh mục sản phẩm"
        onClick={handleToggleMenu}
      >
        <span>
          {showMenu ? (
            <i className="fa-solid fa-minus"></i>
          ) : (
            <i className="fa-solid fa-plus"></i>
          )}
        </span>
      </PartTitle>
      <div className="w-full h-[1px] bg-primary mb-3"></div>
      <ul
        className={`data-list  overflow-auto bg-white border ${
          showMenu ? "show" : ""
        }`}
      >
        <li className={`data-item`} data-id={0}>
          <div
            className="flex items-center justify-between w-full p-2 bg-white border border-t-0 border-gray-200 border-x-0 hover:text-primary"
            onClick={(e) => openSubmenu(e)}
          >
            <Link
              to={`/product`}
              className={`${!activeCata ? "font-bold text-secondary" : ""}`}
            >
              TẤT CẢ
            </Link>
          </div>
        </li>
        {dataCata.length > 0 &&
          dataCata.map((item) => (
            <li className={`data-item`} key={v4()} data-id={item.id_catalog}>
              <div
                className="flex items-center justify-between w-full p-2 bg-white border border-t-0 border-gray-200 border-x-0 hover:text-primary"
                onClick={(e) => openSubmenu(e)}
              >
                <Link
                  to={`/product?cata=${item.id_catalog}`}
                  className={`${
                    activeCata == item.id_catalog
                      ? "font-bold text-secondary"
                      : ""
                  }`}
                >
                  {item.name}
                </Link>
                <span className="cursor-pointer show-icon">
                  <i className="fa-solid fa-chevron-down"></i>
                </span>
              </div>
              <ul className={`w-full sub-data-list`}>
                {dataType.length > 0 &&
                  dataType.map((type) =>
                    type.id_catalog === item.id_catalog ? (
                      <li
                        className="p-2 pl-6 transition-none border border-gray-200 hover:text-primary"
                        key={v4()}
                        data-id={type.id_type}
                      >
                        <Link
                          to={`/product?cata=${item.id_catalog}&type=${type.id_type}`}
                          className={`${
                            activeType == type.id_type ? "text-secondary" : ""
                          }`}
                        >
                          {type.name}
                        </Link>
                      </li>
                    ) : null
                  )}
              </ul>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default ProductCategory;
