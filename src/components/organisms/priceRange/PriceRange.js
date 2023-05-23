import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import handleFormatNumber from "../../../handlers/handleFormatNumber";
import PartTitle from "../../atoms/PartTitle";
import "./PriceRange.scss";

const PriceRange = () => {
  const navigate = useNavigate();
  const [min, setMin] = useState("0");
  const [max, setMax] = useState("500000");
  // const nodeRef = useRef(null);
  useEffect(() => {
    const rangeInput = document.querySelectorAll(".range-input input"),
      range = document.querySelector(".slider .progress");
    let priceGap = 1000;

    rangeInput.forEach((input) => {
      input.addEventListener("input", (e) => {
        let minVal = parseInt(rangeInput[0].value),
          maxVal = parseInt(rangeInput[1].value);

        if (maxVal - minVal < priceGap) {
          if (e.target.className === "range-min") {
            rangeInput[0].value = maxVal - priceGap;
          } else {
            rangeInput[1].value = minVal + priceGap;
          }
        } else {
          setMin(minVal);
          setMax(maxVal);
          range.style.left = (minVal / rangeInput[0].max) * 100 + "%";
          range.style.right = 100 - (maxVal / rangeInput[1].max) * 100 + "%";
          navigate(`/product?priceFrom=${minVal}&priceTo=${maxVal}`);
        }
      });
    });
  }, [min, max]);

  return (
    <div className="price-range">
      <PartTitle title="GIÁ" className="uppercase"></PartTitle>
      <div className="w-full h-[1px] bg-primary mb-3"></div>
      <div className="price-filter">
        <div className="flex mb-4 gap-x-2">
          Từ
          <span id="price-from">{handleFormatNumber(Number(min))}đ</span>
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
              />
            </svg>
          </span>
          <span id="price-to">{handleFormatNumber(Number(max))}đ</span>
        </div>
        <div className="slider">
          <div className="progress"></div>
        </div>
        <div className="range-input">
          <input
            type="range"
            className="range-min"
            min="0"
            max="500000"
            value={min}
            step="5000"
            onChange={(e) => setMin(e.target.value)}
          />
          <input
            type="range"
            className="range-max"
            min="0"
            max="500000"
            value={max}
            step="1000"
            onChange={(e) => setMax(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default PriceRange;
