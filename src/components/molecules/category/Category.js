import React from "react";
import item1 from "../../../assets/category1.png";
import item2 from "../../../assets/category2.png";
import item3 from "../../../assets/category3.png";
import item4 from "../../../assets/category4.png";

const data = [
  { id: 1, image: item1 },
  { id: 2, image: item2 },
  { id: 3, image: item3 },
  { id: 4, image: item4 },
];

const Category = () => {
  return (
    <div className="category w-full flex gap-x-5 mt-5 mb-3">
      {data.length > 0 &&
        data.map((item) => (
          <div key={item.id} className="cursor-pointer">
            <img
              src={item.image}
              alt=""
              className="hover:scale-110 opacity-70"
            />
          </div>
        ))}
    </div>
  );
};

export default Category;
