import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { v4 } from "uuid";
import PartTitle from "../../atoms/PartTitle";
import { ProductItemSkeleton } from "../../molecules/productItem/ProductItem";
import ProductList from "../../organisms/product/ProductList";
import ApiConfig from "../../../config/ApiConfig";

// const filter = [
//   {
//     id: 1,
//     title: "Mới nhất",
//   },
//   {
//     id: 2,
//     title: "Giá tăng dần",
//   },
//   {
//     id: 3,
//     title: "Giá giảm dần",
//   },
// ];

const SearchPage = () => {
	const data = useLocation();
	const searchParam = data.state?.searchParam;
	const [loading, setLoading] = useState(true);
	const [dataProd, setDataProd] = useState([]);
	const navigate = useNavigate();
	// console.log(searchParam);
	useEffect(() => {
		setLoading(true);
		axios
			.get(`${ApiConfig}product/search/${searchParam}`)
			.then((res) => {
				// console.log(res.data.length / 8);
				setDataProd(res.data);
				setLoading(false);
			})
			.catch((error) => {
				console.log(error);
			});
	}, [searchParam]);
	return (
		<div className="mb-20 search-page">
			<div className="container flex mt-5 gap-x-5 flex-col">
				{/* <div className="w-1/4 left">
          <ProductCategory></ProductCategory>
          <PriceRange></PriceRange>
        </div> */}
				<section className="flex items-center justify-start h-10 px-10 mb-5 font-bold bg-blue-100 gap-x-2 breadcumb">
					<Link to="/product" className="hover:text-secondary">
						Tất cả sản phẩm
					</Link>
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
							d="M8.25 4.5l7.5 7.5-7.5 7.5"
						/>
					</svg>
					<p
						className="cursor-pointer hover:text-secondary"
						onClick={() => navigate(-1)}
					>
						Trở về
					</p>
				</section>
				<div className="w-3/4 content mx-auto">
					<div className="flex w-full mb-2 content-head">
						<div className="flex-1">
							<PartTitle title={`Tìm kiếm: "${searchParam}"`}></PartTitle>
							<div className="w-full h-[1px] bg-primary mb-3"></div>
						</div>
						{/*  */}
						{/* <div className="dropdown-filter h-full w-[150px] ml-5">
              <Dropdown
                data={filter}
                // chooseFilter={chooseFilter}
                // setChooseFilter={setChooseFilter}
              ></Dropdown>
            </div> */}
					</div>
					{loading && (
						<div className="grid grid-cols-4 gap-5 mb-20 product-list">
							{new Array(8).fill(0).map(() => (
								<ProductItemSkeleton key={v4()}></ProductItemSkeleton>
							))}
						</div>
					)}
					{!loading && dataProd.length > 0 && (
						<ProductList itemsPerPage={12} data={dataProd}></ProductList>
					)}
					{dataProd.length === 0 && <p>Không có sản phẩm nào hợp lệ</p>}
				</div>
			</div>
		</div>
	);
};

export default SearchPage;
