import React, { useState, useEffect } from "react";
// import { Outlet } from "react-router-dom";
import Sidebar from "../../organisms/sidebar/Sidebar";
// import Modal from "../../organisms/modal/Modal";
import "./ManageCatalog.scss";
import { Button, Table, Form, Modal } from "react-bootstrap";
import CustomModal from "../../organisms/modal/CustomModal";
import Toolbar from "../../organisms/toolbar/Toolbar";
import axios from "axios";
import ApiConfig from "../../../config/ApiConfig";

const ManageCatalog = () => {
	const [dataArr, setDataArr] = useState([]);
	const [addShow, setAddShow] = useState(false);
	const [editShow, setEditShow] = useState(false);
	const [deleteShow, setDeleteShow] = useState(false);
	const [idToEdit, setIdToEdit] = useState("");
	const [idToDelete, setIdToDelete] = useState("");

	//tắt modal
	const handleAddClose = () => setAddShow(false);
	const handleEditClose = () => setEditShow(false);
	const handleDeleteClose = () => setDeleteShow(false);

	//hiển thị modal
	const handleAddShow = () => setAddShow(true);
	const handleEditShow = (id) => {
		// const local = window.localStorage;
		// local.setItem("catalog", JSON.stringify(item));
		// console.log(JSON.parse(local.getItem("catalog")));
		setEditShow(true);
		setIdToEdit(id);
	};
	const handleDeleteShow = (id) => {
		setDeleteShow(true);
		setIdToDelete(id);
	};

	useEffect(() => {
		// test
		async function fetchData() {
			await axios
				.get(`${ApiConfig}catalogue`)
				.then((res) => {
					console.log(res.data);
					setDataArr(res.data);
				})
				.catch((error) => {
					console.log(error);
				});
		}
		fetchData();
	}, []);

	return (
		<div className="manage-catalog">
			<Sidebar />
			<div className="content">
				<Toolbar
					name="QUẢN LÝ DANH MỤC"
					handleAddShow={handleAddShow}
				></Toolbar>
				<Table striped bordered hover>
					<thead>
						<tr>
							<th>ID</th>
							<th>Tên danh mục</th>
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
											<Button
												variant="outline-success"
												className="mr-3"
												onClick={() => handleEditShow(item.id_catalog)}
											>
												<i class="bi bi-pencil-fill"></i>
												Sửa
											</Button>{" "}
											<Button
												variant="outline-danger"
												onClick={() => handleDeleteShow(item.id_catalog)}
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
				type="add-catalog"
				show={addShow}
				handleClose={handleAddClose}
				dataArr={dataArr}
			/>
			<CustomModal
				type="edit-catalog"
				show={editShow}
				handleClose={handleEditClose}
				id_catalog={idToEdit}
				dataArr={dataArr}
				setDataArr={setDataArr}
			/>
			<CustomModal
				type="delete-catalog"
				show={deleteShow}
				handleClose={handleDeleteClose}
				id_catalog={idToDelete}
				dataArr={dataArr}
			/>
		</div>
	);
};

export default ManageCatalog;
