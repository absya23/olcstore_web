import React, { useEffect, useState } from "react";
import PartTitle from "../../atoms/PartTitle";
import Dropdown from "../../molecules/Dropdown";
import PriceRange from "../../organisms/priceRange/PriceRange";
import ProductList from "../../organisms/product/ProductList";
import ProductCategory from "../../organisms/productCategory/ProductCategory";
import "./ProductPage.scss";
import { v4 } from "uuid";
import { ProductItemSkeleton } from "../../molecules/productItem/ProductItem";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import { useProduct } from "../../../context/productContext";
import { useCatalogue } from "../../../context/catalogueContext";
import { useTypes } from "../../../context/typeProductContext";
import ApiConfig from "../../../config/ApiConfig";

const filter = [
	{
		id: 1,
		title: "Mới nhất",
	},
	{
		id: 2,
		title: "Giá tăng dần",
	},
	{
		id: 3,
		title: "Giá giảm dần",
	},
];

function useQuery() {
	const { search } = useLocation();
	return React.useMemo(() => new URLSearchParams(search), [search]);
}

const ProductPage = () => {
	const { product } = useProduct();
	const { catalogue: dataCata } = useCatalogue();
	const { types: dataType } = useTypes();
	const [prodTitle, setProdTitle] = useState("Tất cả sản phẩm");
	const [chooseFilter, setChooseFilter] = useState(1);
	// tất cả SP và sản phẩm theo nhóm
	const [dataProd, setDataProd] = useState(product);
	const [loadingProd, setLoadingProd] = useState(false);
	//
	const [dataProdGroup, setDataProdGroup] = useState(dataProd);
	const [loading, setLoading] = useState(false);
	// console.log(31, dataProdGroup);
	//
	let query = useQuery();
	let cataId = query.get("cata");
	let typeId = query.get("type");
	useEffect(() => {
		setProdTitle("Tất cả sản phẩm");
		// console.log(69, chooseFilter);
		let temp =
			chooseFilter === 1 ? "date/latest" : chooseFilter === 2 ? "asc" : "desc";
		if (cataId && !typeId) {
			setLoading(true);
			setProdTitle(
				dataCata.find((item) => item.id_catalog === Number(cataId))?.name
			);
			let linkAPI = `${ApiConfig}product/cata/${cataId}/${temp}`;
			axios
				.get(linkAPI)
				.then((res) => {
					setDataProdGroup(res.data);
					setLoading(false);
				})
				.catch((error) => {
					console.log(error);
				});
		} else if (cataId && typeId) {
			setLoading(true);
			setProdTitle(
				dataType.find((item) => item.id_type === Number(typeId)).name
			);
			let linkAPI = `${ApiConfig}product/type/${typeId}/${temp}`;
			axios
				.get(linkAPI)
				.then((res) => {
					setDataProdGroup(res.data);
					setLoading(false);
				})
				.catch((error) => {
					console.log(error);
				});
		} else if (!cataId && !typeId) {
			setLoadingProd(true);
			let tempp =
				chooseFilter === 1
					? "date/latest"
					: chooseFilter === 2
					? "sort/asc"
					: "sort/desc";
			let linkAPI = `${ApiConfig}product/${tempp}`;
			axios
				.get(linkAPI)
				.then((res) => {
					// console.log(res.data);
					setDataProd(res.data);
					setLoadingProd(false);
				})
				.catch((error) => {
					console.log(error);
				});
		}
	}, [chooseFilter, cataId, typeId]);

	// theo price cho all san pham
	let priceFrom = query.get("priceFrom");
	let priceTo = query.get("priceTo");

	useEffect(() => {
		setChooseFilter(1);
		setProdTitle("Tất cả sản phẩm");
		// setLoadingProd(true);
		// Navigate("/product");
		if (priceTo && priceFrom) {
			setLoadingProd(true);
			let linkAPI = `${ApiConfig}product/price/${priceFrom}/${priceTo}`;
			axios
				.get(linkAPI)
				.then((res) => {
					// console.log(132, res.data);
					setDataProd(res.data);
					setLoadingProd(false);
				})
				.catch((error) => {
					console.log(error);
				});
		}
	}, [priceFrom, priceTo]);

	return (
		<div className="mb-20 product-page">
			<div className="container flex mt-5 mb-5 gap-x-5">
				<div className="w-1/4 left">
					<ProductCategory
						activeCata={cataId}
						activeType={typeId}
					></ProductCategory>
					<PriceRange></PriceRange>
					<div className="w-full h-[1px] bg-primary mt-6"></div>
					<div className="mt-5 flex items-center gap-x-1">
						<i className="fa-solid fa-fire text-red-500"></i>
						<Link
							className="font-bold px-3 py-1 hover:text-red-400"
							to="/product/best/seller"
						>
							BEST SELLER
						</Link>
						<i className="fa-solid fa-fire text-red-500"></i>
					</div>
				</div>
				<div className="w-3/4 content">
					<div className="flex w-full mb-2 content-head">
						<div className="flex-1">
							<PartTitle title={prodTitle}></PartTitle>
							<div className="w-full h-[1px] bg-primary mb-3"></div>
						</div>
						{/*  */}
						<div className="dropdown-filter h-full w-[150px] ml-5">
							<Dropdown
								data={filter}
								chooseFilter={chooseFilter}
								setChooseFilter={setChooseFilter}
							></Dropdown>
						</div>
					</div>
					{!cataId && loadingProd && (
						<div className="grid grid-cols-4 gap-5 mb-20 product-list">
							{new Array(8).fill(0).map(() => (
								<ProductItemSkeleton key={v4()}></ProductItemSkeleton>
							))}
						</div>
					)}
					{!cataId && !loadingProd && (
						<ProductList data={dataProd}></ProductList>
					)}
					{cataId && loading && (
						<div className="grid grid-cols-4 gap-5 mb-20 product-list">
							{new Array(8).fill(0).map(() => (
								<ProductItemSkeleton key={v4()}></ProductItemSkeleton>
							))}
						</div>
					)}
					{cataId && !loading && (
						<ProductList data={dataProdGroup}></ProductList>
					)}
				</div>
			</div>
		</div>
	);
};

export default ProductPage;
