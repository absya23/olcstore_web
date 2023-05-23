import React, { useState, useEffect } from "react";
// import { Outlet } from "react-router-dom";
import Sidebar from "../../organisms/sidebar/Sidebar";
// import Modal from "../../organisms/modal/Modal";
import "./ManageOrder.scss";
import { Button, Table, Form, Modal } from "react-bootstrap";
import CustomModal from "../../organisms/modal/CustomModal";
import Toolbar from "../../organisms/toolbar/Toolbar";
import axios from "axios";
import { useParams } from "react-router-dom";
import ApiConfig from "../../../config/ApiConfig";

const OrderDetail = () => {
	let { id_order } = useParams();
	console.log(id_order);
	const [dataArr, setDataArr] = useState([]);

	useEffect(() => {
		async function fetchData() {
			await axios
				.get(`${ApiConfig}order/` + id_order)
				.then((res) => {
					// console.log(res.data);
					setDataArr(res.data.data);
				})
				.catch((error) => {
					console.log(error);
				});
		}

		fetchData();
	}, []);
	return (
		<div className="manage-order">
			<Sidebar />
			<div className="content">
				<Toolbar name="CHI TIẾT ĐƠN HÀNG" type="no-add"></Toolbar>

				<Table striped bordered hover>
					<thead>
						<tr>
							<th>STT</th>
							<th>Tên sản phẩm</th>
							<th>Giá</th>
							<th>Số lượng</th>
							<th>Thành tiền</th>
						</tr>
					</thead>
					<tbody>
						{dataArr.map((item, index) => {
							return (
								<tr>
									<td>{index + 1}</td>
									<td>{item.name}</td>
									<td>{item.price}</td>
									<td>{item.quantity}</td>
									<td>{item.price * item.quantity}</td>
								</tr>
							);
						})}
						<tr>
							<td></td>
							<td></td>
							<td></td>
							<td>Tổng tiền</td>
							<td>
								{dataArr.reduce(
									(sum, item) => sum + item.price * item.quantity,
									0
								)}
							</td>
						</tr>
					</tbody>
				</Table>
			</div>
		</div>
	);
};

export default OrderDetail;
