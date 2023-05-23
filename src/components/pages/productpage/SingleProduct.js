import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import handleFormatNumber from "../../../handlers/handleFormatNumber";
import Button from "../../atoms/Button";
import InputCombo from "../../molecules/InputCombo";
// import $ from "jquery";
import "@splidejs/react-splide/css";
import { Splide, SplideSlide, SplideTrack } from "@splidejs/react-splide";
import "./SingleProduct.scss";
import { useCart } from "../../../context/cartContext";
import Toast from "../../molecules/Toast";
import axios from "axios";
import LoadingSkeleton from "../../../loading/LoadingSkeleton";
import { useUser } from "../../../context/userContext";
import ApiConfig from "../../../config/ApiConfig";

const SingleProduct = () => {
	//
	const userContext = useUser();
	//
	const navigate = useNavigate();
	const data = useLocation();
	const productId = data.state?.id;
	const [dataProd, setDataProd] = useState({ product: null, images: null });
	const [loading, setLoading] = useState(false);
	const productPrice = handleFormatNumber(Number(dataProd.product?.price) || 0);
	// ------------------------------------------------------------------
	// chương trình giảm giá ---> cần fix để đồng bộ với sản phẩm trong giỏ hàng
	const discount = 1.2;
	const productPriceOld = handleFormatNumber(
		Number(dataProd?.product?.price) * discount
	);
	// main image
	const [productImage, setProductImage] = useState(dataProd?.product?.image);

	const handleChangeImage = (e) => {
		setProductImage(e.target.src);
	};

	const cartContext = useCart();
	// const [quantity, setQuantity] = useState(1);
	const [showToastMess, setShowToastMess] = useState(false);

	// thêm vào giỏ hàng
	const handleAddToCart = async () => {
		if (dataProd.product?.quantity == 0) {
			alert("Sản phẩm đã hết! Không thể thêm vào giỏ hàng.");
		} else {
			let quantity = document.querySelector("input[name='quantity']")?.value;
			// console.log(document.querySelector("input[name='quantity']")?.value);
			// console.log(quantity);

			// call API
			await axios
				.post(`${ApiConfig}cart/`, {
					id_user: userContext?.user.id_user,
					id_prod: dataProd.product.id_prod,
					quantity,
				})
				.then((res) => {
					// alert("Thêm sản phẩm thành công");
				})
				.catch((error) => {
					console.log(error);
				});

			// change in useContext
			const data = {
				id_prod: dataProd.product.id_prod,
				name: dataProd.product.name,
				image: dataProd.product.image,
				price: dataProd.product.price,
				stock: dataProd.product.quantity,
				quantity,
			};
			// console.log(quantity);
			cartContext.addProductToCart(data, Number(quantity));
			setShowToastMess(true);
			setTimeout(() => {
				setShowToastMess(false);
			}, 5000);
		}
	};

	const handleBuy = async () => {
		if (dataProd.product?.quantity == 0) {
			alert("Sản phẩm đã hết! Không thể thêm mua.");
		} else {
			let quantity = document.querySelector("input[name='quantity']")?.value;
			// console.log(document.querySelector("input[name='quantity']")?.value);
			// console.log(quantity);

			// change in useContext
			const data = {
				id_prod: dataProd.product.id_prod,
				name: dataProd.product.name,
				image: dataProd.product.image,
				price: dataProd.product.price,
				stock: dataProd.product.quantity,
				quantity,
			};
			// console.log(quantity);
			cartContext.addProductToCart(data, Number(quantity));

			// call API
			await axios
				.post(`${ApiConfig}cart/`, {
					id_user: userContext?.user.id_user,
					id_prod: dataProd.product.id_prod,
					quantity,
				})
				.then((res) => {
					// alert("Thêm sản phẩm thành công");
					navigate("/cart/checkout");
				})
				.catch((error) => {
					console.log(error);
				});
		}
	};

	useEffect(() => {
		setLoading(true);
		const fetchData = async () => {
			const respProd = await axios(`${ApiConfig}product/${productId}`);
			const respImgs = await axios(`${ApiConfig}images/${productId}`);
			setLoading(false);
			setDataProd({ product: respProd.data, images: respImgs.data });
			setProductImage(respProd.data.image);
		};

		fetchData();
	}, [productId]);

	return (
		<div className="container w-full my-10">
			{(!dataProd.product || loading) && (
				<SingleProductSkeleton></SingleProductSkeleton>
			)}
			{dataProd.product && (
				<>
					<Toast
						show={showToastMess}
						title={dataProd.product.name}
						imgUrl={dataProd.product.image}
						handleClose={() => setShowToastMess(false)}
					></Toast>
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
					<section className="grid grid-cols-2 gap-5 mb-10">
						{/*>>>>> left product image */}
						<div className="flex flex-col">
							<img src={productImage} alt="" className="max-w-[500px]" />
							{/* fix scroll y */}
							<div className="mt-5 variants gap-x-2 max-w-[500px] preview-image-slide">
								<Splide
									hasTrack={false}
									options={{
										perPage: 5,
										autoScroll: {
											speed: 2,
										},
										classes: {},
									}}
								>
									<SplideTrack>
										{dataProd.images.length > 0 &&
											dataProd.images.map((item, index) => (
												<SplideSlide key={index}>
													<img
														src={item?.url}
														alt=""
														data-id={index}
														className="image-show w-[100px] h-[100px] border hover:shadow hover:border-secondary"
														onMouseOver={(e) => handleChangeImage(e)}
													/>
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
						</div>
						{/*>>>>> right detail */}
						<div className="flex flex-col">
							<h1 className="mb-3 text-3xl font-bold">
								{dataProd.product?.name}
							</h1>
							<p className="pr-6 mb-4 bg-opacity-50 text-end bg-primary">
								<b>{dataProd.product?.soldQuantity}</b> đã bán
							</p>
							{/* price */}
							<div className="flex items-center mb-6 price gap-x-4">
								<span className="line-through old">{productPriceOld} đ</span>
								<span className="text-3xl font-bold current text-hot">
									{productPrice} đ
								</span>
							</div>
							{/* detail */}
							<div className="flex w-full mb-6 quantity gap-x-4 spaces-between">
								<span className="py-1">Số lượng</span>
								<InputCombo
									className="max-w-[300px]"
									max={dataProd.product?.quantity}
								></InputCombo>
								<span className="py-1">
									{dataProd.product?.quantity} khả dụng
								</span>
							</div>
							{/*  */}
							<div className="flex items-center mb-10 gap-x-4">
								<span>Loại sản phẩm</span>
								<div className="flex variants gap-x-2">
									<span className="px-3 py-1 rounded-2xl bg-primary">
										{dataProd.product.nameType}
									</span>
								</div>
							</div>
							{/* button group */}
							<div className="flex mb-6 button-group gap-x-4">
								<Button
									className="w-auto px-4 font-bold bg-white border border-secondary text-secondary hover:bg-secondary hover:text-white"
									onClick={handleAddToCart}
								>
									Thêm vào giỏ hàng
								</Button>
								<Button
									onClick={handleBuy}
									className="w-auto px-4 font-bold border hover:bg-hover border-primary"
								>
									Mua ngay
								</Button>
							</div>
							{/* desc */}
							<div className="w-full h-[2px] bg-[#b7b7b7] mb-4"></div>
							<div className="grid w-full grid-cols-3 mb-3">
								<div className="flex gap-x-3 items-center">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										strokeWidth={1.5}
										stroke="currentColor"
										className="w-8 h-8 text-primary"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 00-3.7-3.7 48.678 48.678 0 00-7.324 0 4.006 4.006 0 00-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3l-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 003.7 3.7 48.656 48.656 0 007.324 0 4.006 4.006 0 003.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3l-3 3"
										/>
									</svg>
									<p className="font-light text-sm">
										Giao hàng toàn quốc đơn hàng từ 50k
									</p>
								</div>
								<div className="flex gap-x-2 items-center">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										strokeWidth={1.5}
										stroke="currentColor"
										className="w-6 h-6 text-primary"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
										/>
									</svg>
									<p className="font-light text-sm">COD nội thành HN, HCM</p>
								</div>
								<div className="flex gap-x-2 items-center">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										strokeWidth={1.5}
										stroke="currentColor"
										className="w-6 h-6 text-primary"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
										/>
									</svg>
									<p className="font-light text-sm">Đổi trả trong 24h</p>
								</div>
							</div>
							<div className="w-full flex items-center gap-x-2">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									strokeWidth={1.5}
									stroke="currentColor"
									className="w-6 h-6 text-primary"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"
									/>
								</svg>
								<p className="font-light text-sm">
									Hỗ trợ ship 20k cho đơn hàng từ 300k nội thành HN, HCM{" "}
									<br></br>
									Hỗ trợ ship 30k cho đơn hàng từ 500k các khu vực khác
								</p>
							</div>
						</div>
					</section>
					{/*========= section 2 ==========*/}
					<section className="p-10 border detail border-border">
						<div className="flex flex-col mb-5 gap-y-2">
							<div className="p-3 bg-primary bg-opacity-10">
								<h3 className="text-3xl font-bold">Mô tả sản phẩm</h3>
							</div>
							<div className="p-3">
								<p>
									Chúng tôi là người bán hàng Trung Quốc, chào mừng bạn đến với
									Dropship / Đại lý / Bán buôn / Khách hàng để mua hàng 100%
									hàng mới, chất lượng cao Hàng đã sẵn sàng và được giao trong
									vòng 1-2 ngày, thời gian đến nơi ước tính là 7-15 ngày Theo
									dõi chúng tôi để được hưởng ưu tiên giao hàng và nhận chiết
									khấu mới nhất
								</p>
							</div>
						</div>
						<div className="grid grid-cols-2 gap-2 image">
							{dataProd.images.length > 0 &&
								dataProd.images.map((item, index) => (
									<img src={item?.url} alt="" key={index} className=""></img>
								))}
						</div>
					</section>
				</>
			)}
		</div>
	);
};

const SingleProductSkeleton = () => {
	return (
		<>
			<section className="flex flex-col items-start justify-center h-10 px-10 mb-5 font-bold bg-blue-100 breadcumb">
				<span className="flex justify-center items-center gap-x-2">
					Tất cả sản phẩm{" "}
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
					</svg>{" "}
					Trở về
				</span>
			</section>
			<section className="grid grid-cols-2 gap-5 mb-10">
				{/*>>>>> left product image */}
				<div className="flex flex-col">
					<LoadingSkeleton
						width="100%"
						height="300px"
						radius="10px"
					></LoadingSkeleton>
					{/* fix scroll y */}
					<div className="mt-5 variants gap-x-2 max-w-[500px] preview-image-slide">
						<LoadingSkeleton
							width="100%"
							height="30px"
							radius="10px"
						></LoadingSkeleton>
					</div>
				</div>
				{/*>>>>> right detail */}
				<div className="flex flex-col">
					<h1 className="mb-3 text-3xl font-bold">
						<LoadingSkeleton
							width="100%"
							height="30px"
							radius="10px"
						></LoadingSkeleton>
					</h1>
					<LoadingSkeleton
						width="100%"
						height="30px"
						radius="10px"
					></LoadingSkeleton>
					{/* price */}
					<div className="flex items-center mb-6 price gap-x-4">
						<span className="line-through old">
							<LoadingSkeleton
								width="10%"
								height="30px"
								radius="10px"
							></LoadingSkeleton>
						</span>
						<span className="text-3xl font-bold current text-hot">
							<LoadingSkeleton
								width="10%"
								height="30px"
								radius="10px"
							></LoadingSkeleton>
						</span>
					</div>
					{/* detail */}
					<div className="flex w-full mb-6 quantity gap-x-4 spaces-between">
						<span className="py-1">
							<LoadingSkeleton
								width="10%"
								height="30px"
								radius="10px"
							></LoadingSkeleton>
						</span>
						<LoadingSkeleton
							width="40%"
							height="30px"
							radius="10px"
						></LoadingSkeleton>
						<span className="py-1">
							<LoadingSkeleton
								width="10%"
								height="30px"
								radius="10px"
							></LoadingSkeleton>
						</span>
					</div>
					{/*  */}
					<div className="flex items-center mb-10 gap-x-4">
						<span>
							<LoadingSkeleton
								width="10%"
								height="30px"
								radius="10px"
							></LoadingSkeleton>
						</span>
						<div className="flex variants gap-x-2">
							<LoadingSkeleton
								width="20px"
								height="20px"
								radius="100%"
							></LoadingSkeleton>
						</div>
					</div>
					{/* button group */}
					<div className="flex button-group gap-x-4">
						<LoadingSkeleton
							width="100%"
							height="50px"
							radius="10px"
						></LoadingSkeleton>
						<LoadingSkeleton
							width="100%"
							height="50px"
							radius="10px"
						></LoadingSkeleton>
					</div>
				</div>
			</section>
		</>
	);
};

export default SingleProduct;
