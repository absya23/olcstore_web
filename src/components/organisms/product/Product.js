import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useProduct } from "../../../context/productContext";
import ProductTitle from "../../atoms/ProductTitle";
import ProductItem from "../../molecules/productItem/ProductItem";
import ApiConfig from "../../../config/ApiConfig";

const Product = ({ children, title, length, type = "" }) => {
	const navigate = useNavigate();
	const { product } = useProduct();
	const [dataProd, setDataProd] = useState(product);
	useEffect(() => {
		if (type === "new") {
			axios
				.get(`${ApiConfig}product/date/latest`)
				.then((res) => {
					setDataProd(res.data);
					// console.log(res.data);
				})
				.catch((error) => {
					console.log(error);
				});
		}
	}, []);
	return (
		<section className="mb-20 product">
			<div className="container">
				<div className="mb-5 title">
					<ProductTitle>{title}</ProductTitle>
					{children}
				</div>
				<div className="mb-10 product-list">
					<div className="grid grid-cols-4 gap-8 product-list-container">
						{length > 0 &&
							dataProd.length > 0 &&
							dataProd
								.slice(0, length)
								.map((item, index) => (
									<ProductItem
										key={index}
										id={item?.id_prod}
										title={item?.name}
										price={item?.price}
										image={item?.image}
										stock={item?.quantity}
									></ProductItem>
								))}
						{!length &&
							dataProd
								.slice(0, 8)
								.map((item, index) => (
									<ProductItem
										key={index}
										id={item?.id_prod}
										title={item?.name}
										price={item?.price}
										image={item?.image}
										stock={item?.quantity}
									></ProductItem>
								))}
					</div>
				</div>
				<div className="flex items-center justify-center btn-group">
					<button
						className="px-3 py-2 text-white uppercase rounded-lg hover:bg-secondary bg-primary"
						onClick={() => navigate("/product")}
					>
						Xem thêm
					</button>
				</div>
			</div>
		</section>
	);
};

export default Product;
