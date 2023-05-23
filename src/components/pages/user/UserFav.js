import axios from "axios";
import React, { useState } from "react";
import { v4 } from "uuid";
import { useCart } from "../../../context/cartContext";
import { removeVietnameseTones } from "../../../handlers/handleConvertUrl";
import handleFormatNumber from "../../../handlers/handleFormatNumber";
import Button from "../../atoms/Button";
import Toast from "../../molecules/Toast";
import ApiConfig from "../../../config/ApiConfig";

const UserFav = ({ user, favoProds, navigate = () => {} }) => {
	// console.log(favoProds);
	return (
		<div className="right col-span-3 border flex-4 p-5">
			<h3 className="uppercase font-bold mb-2 text-[18px]">
				Sản phẩm yêu thích
			</h3>
			<p className="mb-3 border-b pb-3 text-[14px]">
				Hãy <i className="fa-solid fa-heart text-primary"></i> sản phẩm bạn yêu
				thích để xem thuận tiện hơn
			</p>
			{favoProds.length === 0 ? (
				<div className="flex flex-col items-center">
					<p className="mb-4">Chưa có sản phẩm nào</p>
					<Button
						className="w-auto px-5 text-lg normal-case rounded-md bg-primary hover:bg-hover"
						onClick={() => navigate("/product")}
					>
						Xem tất cả sản phẩm
					</Button>
				</div>
			) : (
				<div className="content grid grid-cols-4 gap-4">
					{favoProds.length > 0 &&
						favoProds.map((item) => (
							<ProductItem
								key={v4()}
								user={user}
								item={item}
								navigate={navigate}
							></ProductItem>
						))}
				</div>
			)}
		</div>
	);
};

const ProductItem = ({ user, item, navigate = () => {} }) => {
	const [showToastMess, setShowToastMess] = useState(false);
	const convertTitle = removeVietnameseTones(item.name);
	const [isHover, setIsHover] = useState(false);
	const cartContext = useCart();
	const handleAddToCart = async () => {
		const data = {
			id_prod: item.id_prod,
			name: item.name,
			image: item.image,
			price: item.price,
			quantity: 1,
			variantId: 0,
		};
		// call API
		await axios
			.post(`${ApiConfig}cart/`, {
				id_user: user.id_user,
				id_prod: item.id_prod,
				quantity: 1,
			})
			.then((res) => {
				// alert("Thêm sản phẩm thành công");
			})
			.catch((error) => {
				console.log(error);
			});
		//
		cartContext.addProductToCart(data, 1);
		setShowToastMess(true);
		setTimeout(() => {
			setShowToastMess(false);
		}, 5000);
	};

	const handleRemoveFavo = async () => {
		// call API
		await axios
			.delete(`${ApiConfig}favo/${item.id_fd}`)
			.then((res) => {
				// alert("Thêm sản phẩm thành công");
				window.location.reload();
			})
			.catch((error) => {
				console.log(error);
			});
	};
	return (
		<div className="cursor-pointer product-item">
			<Toast
				show={showToastMess}
				title={item.name}
				imgUrl={item.image}
				handleClose={() => setShowToastMess(false)}
			></Toast>
			<div className="relative mb-2 image">
				<img
					src={item.image}
					alt=""
					onClick={() =>
						navigate(`/product/${convertTitle}`, {
							state: { id: item.id_prod },
						})
					}
				/>
				<div className="absolute bottom-0 left-0 flex items-center justify-center w-full py-1 product-action bg-primary opacity-70 gap-x-2">
					<div
						className="text-white cursor-pointer heart"
						onMouseEnter={() => setIsHover(true)}
						onMouseLeave={() => setIsHover(false)}
						onClick={handleRemoveFavo}
					>
						{isHover ? (
							<i className="fa-regular fa-heart text-2xl"></i>
						) : (
							<i className="fa-solid fa-heart text-white text-2xl"></i>
						)}
					</div>
					<div
						className="text-white bg-transparent cursor-pointer cart"
						onClick={() => handleAddToCart()}
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth={1.5}
							stroke="currentColor"
							className="w-8 h-8"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
							/>
						</svg>
					</div>
				</div>
			</div>
			<div
				className="flex flex-col"
				onClick={() =>
					navigate(`/product/${convertTitle}`, { state: { id: item.id_prod } })
				}
			>
				<h3 className="mb-3 name">{item.name}</h3>
				<div className="font-extrabold price text-[17px]">
					{handleFormatNumber(item.price)}đ
				</div>
			</div>
		</div>
	);
};

export default UserFav;
