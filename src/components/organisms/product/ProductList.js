import React, { useEffect, useState } from "react";
import ProductItem from "../../molecules/productItem/ProductItem";
import ReactPaginate from "react-paginate";

const ProductList = ({ data, itemsPerPage = 8 }) => {
  // console.log(data);
  const [currentItems, setCurrentItems] = useState(null);
  const [pageCount, setPageCount] = useState(0);
  // Here we use item offsets; we could also use page offsets
  // following the API or data you're working with.
  const [itemOffset, setItemOffset] = useState(0);

  useEffect(() => {
    // Fetch items from another resources.
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(data?.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(data?.length / itemsPerPage));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [itemOffset, itemsPerPage, data]);

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % data?.length;
    setItemOffset(newOffset);
  };
  return (
    <>
      <div className="grid grid-cols-4 gap-5 mb-20 product-list">
        {currentItems?.length > 0 &&
          currentItems?.map((item, index) => (
            <ProductItem
              key={index}
              id={item?.id_prod}
              title={item?.name}
              price={item?.price}
              image={item?.image}
              stock={item?.quantity}
              soldQuanity={item?.soldQuantity}
            ></ProductItem>
          ))}
      </div>
      <ReactPaginate
        breakLabel="..."
        nextLabel="Next"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel="Prev"
        renderOnZeroPageCount={null}
        className="page-navigate-list"
      />
    </>
  );
};

export default ProductList;
