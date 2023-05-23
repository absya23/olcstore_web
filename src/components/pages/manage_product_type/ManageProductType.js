import React, { useState, useEffect } from "react";
// import { Outlet } from "react-router-dom";
import Sidebar from "../../organisms/sidebar/Sidebar";
// import Modal from "../../organisms/modal/Modal";
import "./ManageProductType.scss";
import { Button, Table, Form, Modal } from "react-bootstrap";
import CustomModal from "../../organisms/modal/CustomModal";
import Toolbar from "../../organisms/toolbar/Toolbar";
import axios from "axios";
import ApiConfig from "../../../config/ApiConfig";

const ManageProductType = () => {
	const [addShow, setAddShow] = useState(false);
	const [editShow, setEditShow] = useState(false);
	const [deleteShow, setDeleteShow] = useState(false);

	const [dataArr, setDataArr] = useState([]);
	const [catArr, setCatArr] = useState([]);

	//Dữ liệu cần truyền để edit
	const [idToEdit, SetIdToEdit] = useState("");
	const [idToDelete, SetIdToDelete] = useState("");
	//tắt modal
	const handleAddClose = () => setAddShow(false);
	const handleEditClose = () => setEditShow(false);
	const handleDeleteClose = () => setDeleteShow(false);

	//hiển thị modal
	const handleAddShow = () => setAddShow(true);
	const handleEditShow = (id, item) => {
		const local = window.localStorage;
		local.setItem("type", JSON.stringify(item));
		console.log(JSON.parse(local.getItem("type")));
		setEditShow(true);
		SetIdToEdit(id);
	};
	const handleDeleteShow = (id) => {
		setDeleteShow(true);
		SetIdToDelete(id);
	};

	useEffect(() => {
		async function fetchData() {
			await axios
				.get(`${ApiConfig}catalogue`)
				.then((res) => {
					// console.log(res.data);
					setCatArr(res.data.filter((item) => item.del_flag == 0));
				})
				.catch((error) => {
					console.log(error);
				});

			await axios
				.get(`${ApiConfig}types`)
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
		<div className="manage-product-type">
			<Sidebar />
			<div className="content">
				<Toolbar
					name="QUẢN LÝ LOẠI SẢN PHẨM"
					handleAddShow={handleAddShow}
				></Toolbar>

				<Table striped bordered hover>
					<thead>
						<tr>
							<th>ID</th>
							<th>Tên loại sản phẩm</th>
							<th>Danh mục</th>
							<th>Thao tác</th>
						</tr>
					</thead>
					<tbody>
						{dataArr
							.filter((item) => item.del_flag == 0)
							.map((item, index) => {
								return (
									<tr>
										<td>{index + 1}</td>
										<td>{item.name}</td>
										<td>
											{catArr.find((el) => el.id_catalog === item.id_catalog)
												? catArr.find((el) => el.id_catalog === item.id_catalog)
														.name
												: "Khác"}
										</td>
										<td>
											<Button
												variant="outline-success"
												className="mr-3"
												onClick={() => handleEditShow(item.id_type, item)}
											>
												<i class="bi bi-pencil-fill"></i>
												Sửa
											</Button>{" "}
											<Button
												variant="outline-danger"
												onClick={() => handleDeleteShow(item.id_type)}
											>
												<i class="bi bi-trash3-fill"></i>Xóa
											</Button>{" "}
										</td>
									</tr>
								);
							})}
					</tbody>
				</Table>
			</div>
			<CustomModal
				type="add-product-type"
				show={addShow}
				handleClose={handleAddClose}
				dataArr={dataArr}
			/>
			<CustomModal
				type="edit-product-type"
				show={editShow}
				handleClose={handleEditClose}
				id_type={idToEdit}
				dataArr={dataArr}
				setDataArr={setDataArr}
			/>
			<CustomModal
				type="delete-product-type"
				show={deleteShow}
				handleClose={handleDeleteClose}
				id_type={idToDelete}
				dataArr={dataArr}
			/>
		</div>
	);
};

export default ManageProductType;
