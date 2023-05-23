import React from "react";
import "./ProductSlide.scss";
import { ProductItemMini } from "../../molecules/productItem/ProductItem";
import { Splide, SplideSlide, SplideTrack } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";

const ProductSlide = ({ data }) => {
  return (
    <div className="w-full product-slide">
      <Splide
        hasTrack={false}
        options={{
          fixedWidth: "25%",
          type: "loop",
          perPage: 4,
          focus: 0,
          omitEnd: true,
          gap: "8px",
          autoScroll: {
            speed: 2,
          },
          classes: {},
        }}
      >
        <SplideTrack>
          {data.length > 0 &&
            data.slice(0, 5).map((item, index) => (
              <SplideSlide key={index}>
                <ProductItemMini
                  id={item?.id}
                  title={item?.title}
                  price={item?.price}
                  image={item?.image}
                ></ProductItemMini>
              </SplideSlide>
            ))}
        </SplideTrack>
        <div className="splide__arrows">
          <button className="splide__arrow splide__arrow--prev">
            <i className="fa-solid fa-chevron-left"></i>
          </button>
          <button className="splide__arrow splide__arrow--next">
            <i className="fa-solid fa-chevron-right"></i>
          </button>
        </div>
      </Splide>
    </div>
  );
};

export default ProductSlide;
