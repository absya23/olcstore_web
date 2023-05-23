import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
import { v4 } from "uuid";
import { useCart } from "../../../context/cartContext";
import { useUser } from "../../../context/userContext";
import { productData } from "../../../data/FakeData";
import { removeVietnameseTones } from "../../../handlers/handleConvertUrl";
import handleFormatNumber from "../../../handlers/handleFormatNumber";
import Button from "../../atoms/Button";
import ProductSlide from "../../organisms/product/ProductSlide";
import ApiConfig from "../../../config/ApiConfig";

const CheckoutPage = () => {
	const navigate = useNavigate();
	const userContext = useUser();
	const cartContext = useCart();
	const productRecently = productData;

	const handleOrder = async () => {
		let id_order = 1000;
		// tạo hóa đơn
		await axios
			.post("${ApiConfig}orders", {
				id_user: userContext?.user.id_user,
			})
			.then((res) => {
				// alert("Thêm sản phẩm thành công");
				// console.log(res.data.data.id_order);
				id_order = res.data.data.id_order;
			})
			.catch((error) => {
				console.log(error);
			});
		// tạo chi tiết hóa đơn
		await axios
			.post(`${ApiConfig}order`, {
				id_order,
				data: JSON.stringify(cartContext.cart),
			})
			.then((res) => {
				alert("Đặt hàng thành công!");
			})
			.catch((error) => {
				console.log(error);
			});

		// lấy giỏ hàng từ db ra
		let dataCart = cartContext.cart;
		await axios
			.get(`${ApiConfig}cart/${userContext?.user.id_user}`)
			.then((res) => {
				cartContext.setCart(res.data.data);
				dataCart = res.data.data;
			})
			.catch((error) => {
				console.log(error);
			});
		// xóa sản phẩm khỏi giỏ hàng
		let cartIds = Array.from(dataCart, (item) => item.id_cd);
		console.log(cartIds, JSON.stringify(cartIds));
		await axios
			.post(`${ApiConfig}cart/delete`, {
				data: JSON.stringify(cartIds),
			})
			.then((res) => {
				cartContext.setCart([]);
			})
			.catch((error) => {
				console.log(error);
			});

		//
		// cập nhật lại số lượng tồn kho của sản phẩm
		let prodQuantity = Array.from(cartContext.cart, (item) => ({
			id_prod: item.id_prod,
			quantity: item.quantity,
		}));
		// console.log(prodQuantity, JSON.stringify(prodQuantity));
		//call api
		await axios
			.post(`${ApiConfig}product/update`, {
				data: JSON.stringify(prodQuantity),
			})
			.then((res) => {
				// cartContext.setCart([]);
				navigate("/profile?part=3");
			})
			.catch((error) => {
				console.log(error);
			});
	};
	return (
		<section className="container my-10">
			<section className="mb-10">
				{!userContext.user ? (
					<div className="content bg-[#fff3cd] p-10 border border-[#ffeeba] flex flex-col justify-center items-center rounded-md">
						<p className="mb-3">Qúy khách vui lòng đăng nhập để thanh toán!</p>
						<Button
							className="w-[140px] rounded-md bg-secondary hover:bg-white hover:text-secondary border hover:border-secondary"
							onClick={() => navigate("/user/signin")}
						>
							Đăng nhập
						</Button>
					</div>
				) : cartContext.cart.length === 0 ? (
					<div className="content flex flex-col items-center">
						<p className="mb-4">Không có sản phẩm nào</p>
						<Button
							className="w-auto px-3 rounded-md bg-primary hover:bg-hover normal-case"
							onClick={() => navigate("/product")}
						>
							Mua sắm ngay
						</Button>
					</div>
				) : (
					<>
						<div className="content flex gap-x-4">
							<div className="flex flex-col flex-2">
								<div className="flex items-center gap-x-2 mb-4">
									<span className="px-2 bg-secondary rounded-full text-white">
										1
									</span>
									<h2 className="font-bold">Thông tin người nhận</h2>
								</div>
								<div className="flex flex-col gap-y-2">
									<input
										type="text"
										placeholder=""
										value={userContext.user.name}
										readOnly
										className="outline-none rounded-md px-3 py-2 focus:border-primary border"
									/>
									<input
										type="text"
										placeholder=""
										value={userContext.user.phone}
										readOnly
										className="outline-none rounded-md px-3 py-2 focus:border-primary border"
									/>
									<input
										type="email"
										placeholder=""
										value={userContext.user.email}
										readOnly
										className="outline-none rounded-md px-3 py-2 focus:border-primary border"
									/>
									<input
										type="text"
										placeholder=""
										value={userContext.user.address}
										readOnly
										className="outline-none rounded-md px-3 py-2 focus:border-primary border"
									/>
									<input
										type="text"
										placeholder="Địa chỉ chi tiết"
										value=""
										onChange={() => {}}
										className="outline-none rounded-md px-3 py-2 focus:border-primary border"
									/>
									<textarea
										placeholder="Ghi chú"
										value=""
										onChange={() => {}}
										className="outline-none rounded-md px-3 py-2 focus:border-primary border"
									/>
								</div>
								<p className="!text-[15px] mt-5">
									Đơn hàng trên website được xử lý trong giờ hành chính{" "}
									<br></br>
									Vui lòng liên hệ fanpage ngoài khung giờ trên để được hỗ trợ
								</p>
							</div>
							<div className="flex flex-col flex-1 min-w-[300px]">
								<div className="flex items-center gap-x-2 mb-4">
									<span className="px-2 bg-secondary rounded-full text-white">
										2
									</span>
									<h2 className="font-bold">Phương thức thanh toán</h2>
								</div>
								<div className="">
									<p className="mb-3">
										<i className="fa-solid fa-circle-check text-secondary mr-3 !text-[15px]"></i>
										Thanh toán khi nhận hàng
									</p>
									<p className="bg-[#fff9e6] p-4 text-[#856404] ml-4 !text-[15px]">
										Thanh toán khi nhận hàng (COD) chỉ áp dụng cho các đơn hàng
										ở các quận/huyện dưới đây thuộc Hà Nội/TP.HCM: <br></br>+ Hà
										Nội: Quận Hoàn Kiếm, Ba Đình, Đống Đa, Hoàng Mai, Hai Bà
										Trưng, Cầu Giấy, Thanh Xuân, Tây Hồ, Từ Liêm, Hà Đông, Long
										Biên, Gia Lâm, Sơn Tây, Ba Vì, Mê Linh, Đông Anh, Thường
										Tín, Thanh Trì <br></br>+ HCM: Quận 1, 2, 3, 4, 5, 6, 7, 8,
										9, 10, 11, 12, Tân Bình, Tân Phú, Phú Nhuận, Bình Thạnh, Gò
										Vấp, Bình Tân, Thủ Đức, Bình Chánh, Nhà Bè, Hooc Môn
									</p>
								</div>
							</div>
							<div className="flex flex-col flex-3">
								<div className="flex items-center gap-x-2 mb-4">
									<span className="px-2 bg-secondary rounded-full text-white">
										3
									</span>
									<h2 className="font-bold">Thông tin giỏ hàng</h2>
								</div>
								<div className="flex flex-col">
									<table className="checkout-table">
										<thead>
											<tr>
												<th className="!text-[15px]" width="50%">
													Tên sản phẩm
												</th>
												<th className="!text-[15px]" width="20%">
													Số lượng
												</th>
												<th className="!text-[15px]" width="30%">
													Thành tiền
												</th>
											</tr>
										</thead>
										<tbody>
											{cartContext.cart.map((item) => (
												<ProdItem
													key={v4()}
													data={item}
													navigate={navigate}
												></ProdItem>
											))}
										</tbody>
									</table>
									<div className="flex justify-end items-center my-5">
										<p className="mr-2">Tổng tiền: </p>
										<p className="text-xl font-bold">
											{handleFormatNumber(Number(cartContext.totalMoney()))}đ
										</p>
									</div>
								</div>
							</div>
						</div>
						{/*  */}
						<div className="flex justify-end">
							<Button
								className="w-auto px-4 bg-secondary hover:bg-primary"
								onClick={handleOrder}
							>
								Thanh toán
							</Button>
						</div>
					</>
				)}
			</section>
			{/*  */}
			<section className="product-list-seen">
				<h4 className="mb-4 text-xl font-bold text-black uppercase">
					Các sản phẩm đã xem
				</h4>
				<div className="flex w-full gap-x-2">
					<ProductSlide data={productRecently}></ProductSlide>
				</div>
			</section>
		</section>
	);
};

const ProdItem = ({ data, navigate = () => {} }) => {
	const convertTitle = removeVietnameseTones(data.name);
	return (
		<tr>
			<td>
				<div className="flex flex-col font-light">
					<p
						className="!text-[15px] cursor-pointer hover:text-secondary"
						onClick={() =>
							navigate(`/product/${convertTitle}`, {
								state: { id: data.id_prod },
							})
						}
					>
						{data.name}
					</p>
					<span className="!text-[15px]">
						Đơn giá: <b>{handleFormatNumber(data.price)}đ</b>
					</span>
				</div>
			</td>
			<td>
				<p className="pl-6">{data.quantity}</p>
			</td>
			<td className="!text-[15px] font-bold">
				{handleFormatNumber(Number(data.quantity) * Number(data.price))}đ
			</td>
		</tr>
	);
};

export default CheckoutPage;
