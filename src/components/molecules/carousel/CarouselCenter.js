import { Splide, SplideSlide, SplideTrack } from "@splidejs/react-splide";
import React from "react";
import Slider from "react-slick";
import { ProductItemImage } from "../productItem/ProductItem";
import "./CarouselCenter.scss";
import "@splidejs/react-splide/css";

const data = [
  {
    id: "C01",
    image:
      "https://traffic-edge55.cdn.vncdn.io/nvn/ncdn/store/7534/bn/tulip_resize.png",
    name: "Hoa tulip",
  },
  {
    id: "C02",
    image:
      "https://traffic-edge44.cdn.vncdn.io/nvn/ncdn/store/7534/bn/astronaut_resize.png",
    name: "Astronaut",
  },
  {
    id: "C03",
    image:
      "https://traffic-edge44.cdn.vncdn.io/nvn/ncdn/store/7534/bn/resize_tulip.png",
    name: "Team Tulip",
  },
  {
    id: "C04",
    image:
      "https://traffic-edge32.cdn.vncdn.io/nvn/ncdn/store/7534/bn/Ly_coc_rz.png",
    name: "Ly cốc",
  },
  {
    id: "C05",
    image:
      "https://traffic-edge35.cdn.vncdn.io/nvn/ncdn/store/7534/bn/Resize_gau_bong.jpeg",
    name: "Gấu bông",
  },
  {
    id: "C06",
    image:
      "https://traffic-edge17.cdn.vncdn.io/nvn/ncdn/store/7534/bn/photo_output_4.JPG",
    name: "Sổ vở",
  },
  {
    id: "C07",
    image:
      "https://traffic-edge46.cdn.vncdn.io/nvn/ncdn/store/7534/bn/1FE0774B_B5AE_42E5_839A_04A0CE6BC81F.jpeg",
    name: "Đồ dùng học tập",
  },
];

const CarouselCenter = () => {
  return (
    <div className="w-full product-slide h-[300px]">
      <Splide
        hasTrack={false}
        options={{
          // fixedWidth: "30%",
          // fixedHeight: "160px",
          type: "loop",
          perPage: 3,
          focus: "center",
          omitEnd: true,
          gap: "10px",
          autoScroll: {
            speed: 2,
          },
          classes: {},
        }}
      >
        <SplideTrack>
          {data.length > 0 &&
            data.map((item, index) => (
              <SplideSlide key={index}>
                <ProductItemImage
                  name={item?.name}
                  image={item?.image}
                ></ProductItemImage>
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

export default CarouselCenter;
