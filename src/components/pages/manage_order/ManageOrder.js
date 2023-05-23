import React, { useState, useEffect } from "react";
// import { Outlet } from "react-router-dom";
import Sidebar from "../../organisms/sidebar/Sidebar";
// import Modal from "../../organisms/modal/Modal";
import "./ManageOrder.scss";
import { Button, Table, Form, Modal } from "react-bootstrap";
import CustomModal from "../../organisms/modal/CustomModal";
import Toolbar from "../../organisms/toolbar/Toolbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ApiConfig from "../../../config/ApiConfig";

const HandlingStatus = ({ id_order, id_status, dataArr, setDataArr }) => {
	const changeStatus = async (id_order, id_status) => {
		await axios
			.put(`${ApiConfig}orders/` + id_order, {
				id_status: String(1 + id_status),
			})
			.then((res) => {
				dataArr.find((item) => item.id_order == id_order).id_status = String(
					1 + id_status
				);
				setDataArr(dataArr);
				alert("Đổi trạng thái đơn hàng thành công");
				window.location.reload(false);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	const cancelOrder = async (id_order) => {
		await axios
			.put(`${ApiConfig}orders/` + id_order, {
				id_status: "4",
			})
			.then((res) => {
				dataArr.find((item) => item.id_order == id_order).id_status = "4";
				setDataArr(dataArr);
				alert("Hủy đơn hàng thành công");
				window.location.reload(false);
			})
			.catch((error) => {
				console.log(error);
			});
	};
	switch (id_status) {
		case 1:
			return (
				<>
					<Button
						variant="outline-success"
						className="mr-3"
						onClick={() => changeStatus(id_order, id_status)}
					>
						<i class="bi bi-pencil-fill"></i>
						Xác nhận
					</Button>{" "}
					<Button
						variant="outline-danger"
						onClick={() => cancelOrder(id_order)}
					>
						<i class="bi bi-trash3-fill"></i>Hủy
					</Button>{" "}
				</>
			);
		case 2:
			return (
				<>
					<Button
						variant="outline-success"
						className="mr-3"
						onClick={() => changeStatus(id_order, id_status)}
					>
						<i class="bi bi-pencil-fill"></i>
						Đã giao
					</Button>{" "}
					<Button
						variant="outline-danger"
						onClick={() => cancelOrder(id_order)}
					>
						<i class="bi bi-trash3-fill"></i>Hủy
					</Button>{" "}
				</>
			);
		default:
			return <></>;
	}
};

const ManageOrder = () => {
	let navigate = useNavigate();

	const [addShow, setAddShow] = useState(false);
	const [editShow, setEditShow] = useState(false);
	const [deleteShow, setDeleteShow] = useState(false);

	const [dataArr, setDataArr] = useState([]);
	const [userArr, setUserArr] = useState([]);

	const handleAddClose = () => setAddShow(false);
	const handleEditClose = () => setEditShow(false);
	const handleDeleteClose = () => setDeleteShow(false);
	const handleAddShow = () => setAddShow(true);
	// const handleEditShow = () => setEditShow(true);
	// const handleDeleteShow = () => setDeleteShow(true);

	useEffect(() => {
		async function fetchData() {
			await axios
				.get(`${ApiConfig}user`)
				.then((res) => {
					// console.log(res.data);
					setUserArr(res.data);
				})
				.catch((error) => {
					console.log(error);
				});

			await axios
				.get(`${ApiConfig}orders`)
				.then((res) => {
					// console.log(res.data);
					setDataArr(res.data);
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
				<Toolbar
					name="QUẢN LÝ ĐƠN HÀNG"
					handleAddShow={handleAddShow}
					type="no-add"
				></Toolbar>

				<Table striped bordered hover>
					<thead>
						<tr>
							<th>ID</th>
							<th>Tên KH</th>
							<th>SĐT</th>
							<th>Tổng tiền</th>
							<th>Ngày tạo</th>
							<th>Trạng thái</th>
							<th>Cập nhật</th>
							<th>Chi tiết</th>
						</tr>
					</thead>
					<tbody>
						{dataArr.map((item, index) => {
							return (
								<tr>
									<td>{index + 1}</td>
									<td>
										{userArr.find((el) => el.id_user === item.id_user)
											? userArr.find((el) => el.id_user === item.id_user).name
											: "Khác"}
									</td>
									<td>
										{" "}
										{userArr.find((el) => el.id_user === item.id_user)
											? userArr.find((el) => el.id_user === item.id_user).phone
											: "Khác"}
									</td>
									<td>{item.totalMoney}</td>
									<td>{item.created_at}</td>
									<td>{item.statusName}</td>
									<td>
										<HandlingStatus
											id_status={item.id_status}
											id_order={item.id_order}
											dataArr={dataArr}
											setDataArr={setDataArr}
										/>
									</td>
									<td>
										<Button
											variant="outline-info"
											className="ml-3"
											onClick={() => {
												//chuyển qua trang info
												navigate(`/admin/manage-order/${item.id_order}`);
											}}
										>
											<i class="bi bi-pencil-fill"></i>
											Chi tiết
										</Button>
									</td>
								</tr>
							);
						})}
					</tbody>
				</Table>
			</div>
		</div>
	);
};

export default ManageOrder;
