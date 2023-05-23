import axios from "axios";
import React, { Fragment, useState } from "react";
import { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { v4 } from "uuid";
import { removeVietnameseTones } from "../../../handlers/handleConvertUrl";
import handleFormatNumber from "../../../handlers/handleFormatNumber";
import LoadingSkeleton from "../../../loading/LoadingSkeleton";
import Button from "../../atoms/Button";
import ApiConfig from "../../../config/ApiConfig";

const statusData = [
	{
		id: 1,
		name: "Chờ xác nhận",
	},
	{
		id: 2,
		name: "Đang giao",
	},
	{
		id: 3,
		name: "Đã giao",
	},
	{
		id: 4,
		name: "Đã hủy",
	},
];

const UserOrderDetail = () => {
	const [loading, setLoading] = useState(true);
	const [orderDetail, setOrderDetail] = useState(null);
	const navigate = useNavigate();

	const data = useLocation();
	const orderId = data.state?.id;

	useEffect(() => {
		setLoading(true);
		axios
			.get(`${ApiConfig}order/${orderId}`)
			.then((res) => {
				setOrderDetail(res.data);
				setLoading(false);
			})
			.catch((error) => {
				console.log(error);
			});
	}, []);
	//
	const handleCancelOrder = async () => {
		if (Number(orderDetail.id_status) === 1) {
			if (window.confirm("Bạn có chắc chắn hủy đơn hàng?")) {
				await axios
					.put(`${ApiConfig}orders/${orderId}`, {
						id_status: "4",
					})
					.then((res) => {
						console.log(res.data);
						window.location.reload();
					})
					.catch((error) => {
						console.log(error);
					});
			}
		} else alert("Bạn không thể hủy đơn hàng đang giao!");
	};
	//
	return (
		<div className="container my-10">
			{/* top */}
			<div className="flex items-center mb-6 py-3 pl-5 gap-x-2 bg-blue-100 rounded-lg">
				<Link className="hover:text-secondary" to="/">
					Trang chủ
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
				<Link className="hover:text-secondary" to="/profile?part=3">
					Danh sách đơn hàng
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
				<p>
					Đơn hàng <b>#{orderId}</b>
				</p>
			</div>
			{/* content */}
			{loading && (
				<div className="content flex flex-col gap-4">
					<div className="top">
						<LoadingSkeleton
							height="100px"
							width="100%"
							radius="8px"
						></LoadingSkeleton>
					</div>
					<div className="bottom">
						<LoadingSkeleton
							height="500px"
							width="100%"
							radius="8px"
						></LoadingSkeleton>
					</div>
				</div>
			)}
			{!loading && (
				<div className="">
					{/* status bar */}
					<div className="status-bar flex flex-col w-full mb-6">
						{/*  */}
						<div className="flex pb-3">
							<div className="flex-1"></div>
							{/* item 1 */}
							{statusData.length > 0 &&
								statusData.map((item) =>
									item.id === 4 ? (
										<div className="flex-1" key={v4()}>
											<div
												className={`w-10 h-10 ${
													orderDetail.id_status === 4
														? "bg-red-500 border-red-500"
														: "bg-white border-gray-400"
												} border-2  mx-auto rounded-full text-lg text-white flex items-center`}
											>
												<span
													className={`${
														orderDetail.id_status === 4 ? "text-white" : ""
													} text-center w-full`}
												>
													<i
														className={`fa-solid fa-xmark w-full fill-current ${
															orderDetail.id_status === 4
																? "text-white"
																: "text-gray-400"
														} `}
													></i>
												</span>
											</div>
										</div>
									) : (
										<Fragment key={v4()}>
											<div className="flex-1">
												<div
													className={`w-10 h-10 ${
														item.id <= orderDetail.id_status
															? " bg-green-500 border-green-500"
															: "bg-white border-gray-400"
													} mx-auto rounded-full border-2 text-lg text-white flex items-center`}
												>
													<span className="text-white text-center w-full">
														<i
															className={`fa fa-check w-full ${
																item.id <= orderDetail.id_status
																	? "text-white"
																	: "text-gray-500"
															} fill-current `}
														></i>
													</span>
												</div>
											</div>
											{/* line */}
											<div className="w-1/6 align-center items-center align-middle content-center flex">
												<div className="w-full bg-gray-400 rounded items-center align-middle align-center flex-1">
													<div
														className={`${
															item.id === 3 &&
															orderDetail.id_status === 4 &&
															"bg-red-300 w-full"
														} ${
															item.id < orderDetail.id_status
																? "bg-green-300 w-full"
																: ""
														} text-xs leading-none py-1 text-center text-gray-500 rounded`}
													></div>
												</div>
											</div>
										</Fragment>
									)
								)}
							<div className="flex-1"></div>
						</div>
						{/*  */}
						<div className="flex text-xs content-center text-center">
							{statusData.length > 0 &&
								statusData.map((item) => (
									<div
										className={`w-1/4 ${
											item.id === orderDetail.id_status && item.id !== 4
												? "font-bold text-green-500"
												: item.id === 4 && orderDetail.id_status === 4
												? "font-bold text-red-500"
												: ""
										}`}
										key={v4()}
									>
										{item.name}
									</div>
								))}
						</div>
					</div>
					{/* content */}
					<div className="flex justify-between items-center mt-14 px-3">
						<p className="text-secondary italic">{orderDetail.created_at}</p>
						<h2>
							Sản phẩm (
							{orderDetail.data.reduce(
								(accumulator, currentValue) =>
									accumulator + currentValue.quantity,
								0
							)}
							)
						</h2>
						<span className="flex gap-x-1 items-center">
							<i className="fa-solid fa-money-check-dollar text-secondary"></i>
							<p>Tổng tiền: </p>
							<p className="font-bold text-2xl">
								{handleFormatNumber(Number(orderDetail.total))}đ
							</p>
						</span>
					</div>
					{/*  */}
					<div className="content flex flex-col">
						{orderDetail.data.length > 0 &&
							orderDetail.data.map((item, index) => (
								<OrderItem
									key={v4()}
									index={index}
									data={item}
									navigate={navigate}
								/>
							))}
					</div>
					{/*  */}
					<div className="flex justify-between items-end">
						<p className="font-light italic">
							<i className="fa-solid fa-circle-info text-red-500"></i> Bạn chỉ
							có thể hủy đơn hàng có trạng thái "Chờ xác nhận"
						</p>
						<Button
							className={`normal-case bg-white border border-red-500 text-red-500 w-auto px-4 ${
								Number(orderDetail.id_status) !== 1
									? "cursor-default"
									: "cursor-pointer hover:bg-red-500 hover:text-white"
							}`}
							disabled={Number(orderDetail.id_status) !== 1}
							onClick={handleCancelOrder}
						>
							Huỷ đơn hàng
						</Button>
					</div>
				</div>
			)}
		</div>
	);
};

const OrderItem = ({ index, data, navigate }) => {
	const convertTitle = removeVietnameseTones(data.name);
	return (
		<div className="flex p-5 gap-x-4 items-center">
			<span>{index + 1}</span>
			<img src={data?.image} alt="" className="w-[120px] border" />
			<div className="flex-1 flex justify-between">
				<div>
					<h4
						className="text-lg font-bold mb-3 cursor-pointer hover:text-secondary"
						onClick={() =>
							navigate(`/product/${convertTitle}`, {
								state: { id: data.id_prod },
							})
						}
					>
						{data?.name}
					</h4>
					<p>
						Số lượng: <b>{data?.quantity}</b>
					</p>
				</div>
				<div>
					<p>x {handleFormatNumber(data?.price)}đ</p>
				</div>
			</div>
		</div>
	);
};

export default UserOrderDetail;
