import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { v4 } from "uuid";
import PartTitle from "../../atoms/PartTitle";
import { ProductItemSkeleton } from "../../molecules/productItem/ProductItem";
import ProductList from "../../organisms/product/ProductList";
import ApiConfig from "../../../config/ApiConfig";

const BestSellerPage = () => {
	const [loading, setLoading] = useState(true);
	const [dataProd, setDataProd] = useState([]);
	const navigate = useNavigate();
	// console.log(searchParam);
	useEffect(() => {
		setLoading(true);
		axios
			.get(`${ApiConfig}product/sold/best`)
			.then((res) => {
				// console.log(res.data.length / 8);
				setDataProd(res.data);
				setLoading(false);
			})
			.catch((error) => {
				console.log(error);
			});
	}, []);
	return (
		<div className="mb-20 search-page">
			<div className="container w-full flex flex-col mt-5 gap-x-5">
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
				<div className="w-full content mx-auto">
					<div className="flex w-full mb-2 content-head">
						<div className="flex-1">
							<PartTitle title={`Sản phẩm bán chạy nhất`}></PartTitle>
							<div className="w-full h-[1px] bg-primary mb-3"></div>
						</div>
					</div>
					{loading && (
						<div className="grid grid-cols-4 gap-5 mb-20 product-list">
							{new Array(8).fill(0).map(() => (
								<ProductItemSkeleton key={v4()}></ProductItemSkeleton>
							))}
						</div>
					)}
					{!loading && dataProd.length > 0 && (
						<ProductList itemsPerPage={8} data={dataProd}></ProductList>
					)}
					{dataProd.length === 0 && <p>Không có sản phẩm nào hợp lệ</p>}
				</div>
			</div>
		</div>
	);
};

export default BestSellerPage;
