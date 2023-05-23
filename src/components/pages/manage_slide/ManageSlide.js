import React, { useState, useEffect } from "react";
// import { Outlet } from "react-router-dom";
import Sidebar from "../../organisms/sidebar/Sidebar";
// import Modal from "../../organisms/modal/Modal";
import "./ManageSlide.scss";
import { Button, Table, Form, Modal } from "react-bootstrap";
import CustomModal from "../../organisms/modal/CustomModal";
import Toolbar from "../../organisms/toolbar/Toolbar";
import axios from "axios";
import ApiConfig from "../../../config/ApiConfig";

const ManageSlide = () => {
	const [addShow, setAddShow] = useState(false);
	// const [editShow, setEditShow] = useState(false);
	const [deleteShow, setDeleteShow] = useState(false);

	const [dataArr, setDataArr] = useState([]);
	// const [catArr, setCatArr] = useState([]);
	// const [typeArr, setTypeArr] = useState([]);
	// const [idToEdit, SetIdToEdit] = useState("");
	const [idToDelete, SetIdToDelete] = useState("");

	//tắt modal
	const handleAddClose = () => setAddShow(false);
	// const handleEditClose = () => setEditShow(false);
	const handleDeleteClose = () => setDeleteShow(false);

	//hiển thị modal
	const handleAddShow = () => setAddShow(true);
	// const handleEditShow = (id) => {
	//   setEditShow(true);
	//   SetIdToEdit(id);
	// };
	const handleDeleteShow = (id) => {
		setDeleteShow(true);
		SetIdToDelete(id);
	};

	useEffect(() => {
		async function fetchData() {
			await axios
				.get(`${ApiConfig}slide`)
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
		<div className="manage-slide">
			<Sidebar />
			<div className="content">
				<Toolbar name="QUẢN LÝ SLIDE" handleAddShow={handleAddShow}></Toolbar>
				<Table striped bordered hover size="sm">
					<thead>
						<tr>
							<th>ID</th>
							<th>Ảnh</th>
							<th>Ngày tạo</th>
							<th>Ngày cập nhật</th>
							<th>Thao tác</th>
						</tr>
					</thead>
					<tbody>
						{dataArr.map((item, index) => {
							return (
								<tr>
									<td>{index + 1}</td>
									<td>
										<img src={item.image} width="200px" max-heigh="200px" />
									</td>
									<td>{item.created_at}</td>
									<td>{item.updated_at}</td>
									<td>
										{/* <Button
                      variant="outline-success"
                      className="mr-3"
                      onClick={() => handleEditShow(item.id_slide)}
                    >
                      <i class="bi bi-pencil-fill"></i>
                      Sửa
                    </Button>{" "} */}
										<Button
											variant="outline-danger"
											onClick={() => handleDeleteShow(item.id_slide)}
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
				type="add-slide"
				show={addShow}
				handleClose={handleAddClose}
				dataArr={dataArr}
			/>
			{/* <CustomModal
        type="edit-slide"
        show={editShow}
        handleClose={handleEditClose}
        id_slide={idToEdit}
        dataArr={dataArr}
      /> */}
			<CustomModal
				type="delete-slide"
				show={deleteShow}
				handleClose={handleDeleteClose}
				id_slide={idToDelete}
				dataArr={dataArr}
			/>
		</div>
	);
};

export default ManageSlide;
