import React, { useState, useEffect, useRef } from "react";
import "./modal.scss";
import { Button, Table, Form, Modal } from "react-bootstrap";
import axios from "axios";
import ApiConfig from "../../../config/ApiConfig";
function CustomModal({
	type,
	show,
	handleClose,
	id_catalog,
	id_prod,
	id_type,
	id_slide,
	dataArr,
	// setDataArr,
}) {
	// const local = window.localStorage;
	// let currentCatalog = local.getItem("catalog")
	//   ? JSON.parse(local.getItem("catalog"))
	//   : null;
	// let currentType = local.getItem("type")
	//   ? JSON.parse(local.getItem("type"))
	//   : null;
	// let currentProduct = local.getItem("product")
	//   ? JSON.parse(local.getItem("product"))
	//   : null;

	const [selectedImage, setSelectedImage] = useState(null);

	//Các mảng dữ liệu
	const [catArr, setCatArr] = useState([]);
	const [typeArr, setTypeArr] = useState([]);

	//state của catalog
	const [addCatInput, setAddCatInput] = useState("");
	const [editCatInput, setEditCatInput] = useState("");

	//state của types
	const [addTypeNameInput, setAddTypeNameInput] = useState("");
	const [addTypeOfInput, setAddTypeOfInput] = useState("");

	const [editTypeNameInput, setEditTypeNameInput] = useState("");
	const [editTypeOfInput, setEditTypeOfInput] = useState("");

	//state của product
	const [addProductNameInput, setAddProductNameInput] = useState("");
	const [addProductOfInput, setAddProductOfInput] = useState("");
	const [addProductPriceInput, setAddProductPriceInput] = useState("");
	const [addProductImageInput, setAddProductImageInput] = useState("");
	const [addProductDescInput, setAddProductDescInput] = useState("");
	const [addProductQuantityInput, setAddProductQuantityInput] = useState("");
	const [editProductNameInput, setEditProductNameInput] = useState("");
	const [editProductOfInput, setEditProductOfInput] = useState("");
	const [editProductPriceInput, setEditProductPriceInput] = useState("");
	const [editProductImageInput, setEditProductImageInput] = useState("");
	const [editProductDescInput, setEditProductDescInput] = useState("");
	const [editProductQuantityInput, setEditProductQuantityInput] = useState("");

	//state của slide
	const [addSlideInput, setAddSlideInput] = useState("");
	// const [editSlideInput, setEditSlideInput] = useState("");

	//Hàm upload ảnh
	const uploadImage = async (image) => {
		const formData = new FormData();
		formData.append("file", image);
		formData.append("upload_preset", "xfubk0t8");

		await axios
			.post("https://api.cloudinary.com/v1_1/djt9g7wvi/image/upload", formData)
			.then((res) => {
				console.log(res);
				console.log("url ảnh>>>>", res.data.secure_url);
				setAddProductImageInput(res.data.secure_url);
				setEditProductImageInput(res.data.secure_url);
				setAddSlideInput(res.data.secure_url);
				// setEditSlideInput(res.data.secure_url);
			});
	};

	//Thêm sửa xóa catalog
	const addCatalog = async () => {
		const newItem = {
			name: addCatInput,
			del_flag: 0,
		};
		await axios
			.post(`${ApiConfig}catalogue`, newItem)
			.then((res) => {
				dataArr.push(newItem);
				handleClose();
				alert("đã thêm thành công danh mục sản phẩm");
				window.location.reload(false);
			})
			.catch((error) => {
				console.log(error);
				alert("thêm danh mục sản phẩm thất bại");
			});
	};
	const editCatalog = async (id) => {
		const newItem = {
			name: editCatInput,
		};
		console.log("edit catalog >>>", editCatInput);
		await axios
			.put(`${ApiConfig}catalogue/` + id, newItem)
			.then((res) => {
				dataArr.find((el) => el.id_catalog == id).name = editCatInput;
				handleClose();
				alert("đã sửa thành công danh mục sản phẩm");
				window.location.reload(false);
			})
			.catch((error) => {
				console.log(error);
				alert("sửa danh mục sản phẩm thất bại");
			});
	};
	const deleteCatalog = async (id) => {
		await axios
			.delete(`${ApiConfig}catalogue/` + id)
			.then((res) => {})
			.catch((error) => {
				console.log(error);
			});
		dataArr.forEach((item, i) => {
			if (item.id_catalog == id) {
				dataArr.splice(i, 1);
			}
		});
		alert("đã xóa thành công danh mục sản phẩm");
		handleClose();
		window.location.reload(false);
	};

	//Thêm sửa xóa types
	const addType = async () => {
		const newItem = {
			id_catalog: addTypeOfInput,
			name: addTypeNameInput,
			del_flag: 0,
			created_at: null,
			updated_at: null,
		};
		await axios
			.post(`${ApiConfig}types`, newItem)
			.then((res) => {
				dataArr.push(newItem);
				handleClose();
				alert("đã thêm thành công loại sản phẩm");
				window.location.reload(false);
			})
			.catch((error) => {
				console.log(error);
				alert("thêm loại sản phẩm thất bại");
			});
	};
	const editType = async (id) => {
		const newItem = {
			id_type: id,
			id_catalog: editTypeOfInput,
			name: editTypeNameInput,
			del_flag: 0,
		};
		console.log(newItem);
		await axios
			.put(`${ApiConfig}types/` + id, newItem)
			.then((res) => {
				//xử lý UI
				// const dataArrCopy = [...dataArr];
				dataArr.find((el) => el.id_type == id).id_catalog = editTypeOfInput;
				dataArr.find((el) => el.id_type == id).name = editTypeNameInput;
				// setDataArr(dataArrCopy);

				handleClose();
				alert("đã sửa thành công loại sản phẩm");
				window.location.reload(false);
			})
			.catch((error) => {
				console.log(error);
				alert("sửa loại sản phẩm thất bại");
			});
	};
	const deleteType = async (id) => {
		await axios
			.delete(`${ApiConfig}types/` + id)
			.then((res) => {
				alert("đã xóa thành công loại sản phẩm");
			})
			.catch((error) => {
				console.log(error);
			});
		handleClose();

		dataArr.forEach((item, i) => {
			if (item.id_type == id) {
				dataArr.splice(i, 1);
			}
		});
	};

	//Thêm sửa xóa product
	const addProduct = async () => {
		const newItem = {
			id_type: addProductOfInput,
			name: addProductNameInput,
			price: addProductPriceInput,
			image: addProductImageInput,
			description: addProductDescInput,
			quantity: addProductQuantityInput,
			del_flag: 0,
		};
		await axios
			.post(`${ApiConfig}product`, newItem)
			.then((res) => {
				alert("đã thêm thành công sản phẩm");
				window.location.reload(false);
			})
			.catch((error) => {
				console.log(error);
			});
		handleClose();
		dataArr.push(newItem);
	};

	const editProduct = async (id) => {
		const newItem = {
			id_type: editProductOfInput,
			name: editProductNameInput,
			price: editProductPriceInput,
			image: editProductImageInput,
			description: editProductDescInput,
			quantity: editProductQuantityInput,
		};
		await axios
			.put(`${ApiConfig}product/` + id, newItem)
			.then((res) => {
				alert("đã sửa thành công sản phẩm");
				window.location.reload(false);
			})
			.catch((error) => {
				console.log(error);
			});
		handleClose();

		dataArr.find((el) => el.id_prod == id).id_type = editProductOfInput;
		dataArr.find((el) => el.id_prod == id).name = editProductNameInput;
		dataArr.find((el) => el.id_prod == id).price = editProductPriceInput;
		dataArr.find((el) => el.id_prod == id).image = editProductImageInput;
		dataArr.find((el) => el.id_prod == id).description = editProductDescInput;
		dataArr.find((el) => el.id_prod == id).quantity = editProductQuantityInput;
	};
	const deleteProduct = async (id) => {
		await axios
			.delete(`${ApiConfig}product/` + id)
			.then((res) => {
				alert("đã xóa thành công sản phẩm");
			})
			.catch((error) => {
				console.log(error);
			});
		handleClose();

		dataArr.forEach((item, i) => {
			if (item.id_prod == id) {
				dataArr.splice(i, 1);
			}
		});
	};

	//Thêm sửa xóa slide
	const addSlide = async () => {
		const newItem = {
			image: addSlideInput,
		};
		await axios
			.post(`${ApiConfig}slide`, newItem)
			.then((res) => {
				dataArr.push(newItem);
				handleClose();
				alert("đã thêm thành công slide");
				window.location.reload(false);
			})
			.catch((error) => {
				console.log(error);
				alert("thêm slide thất bại");
			});
	};
	// const editSlide = (id) => {
	//   const newItem = {
	//     image: editSlideInput,
	//   };
	//   axios
	//     .put("${ApiConfig}slide/" + id, newItem)
	//     .then((res) => {
	//       dataArr.find((el) => el.id_slide == id).name = editSlideInput;
	//       handleClose();
	//       alert("đã sửa thành công slide");
	//     })
	//     .catch((error) => {
	//       console.log(error);
	//       alert("sửa slide thất bại");
	//     });
	// };
	const deleteSlide = async (id) => {
		await axios
			.delete(`${ApiConfig}slide/` + id)
			.then((res) => {
				dataArr.forEach((item, i) => {
					if (item.id_slide == id) {
						dataArr.splice(i, 1);
					}
				});
				handleClose();
				alert("đã xóa thành công slide");
			})
			.catch((error) => {
				console.log(error);
				alert("xóa slide thất bại");
			});
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
					setTypeArr(res.data.filter((item) => item.del_flag == 0));
				})
				.catch((error) => {
					console.log(error);
				});
		}

		fetchData();
	}, []);

	// useEffect(() => {
	//   //edit catalog
	//   currentCatalog = local.getItem("catalog")
	//     ? JSON.parse(local.getItem("catalog"))
	//     : null;
	//   setEditCatInput(currentCatalog.name);

	//   //edit type
	//   currentType = local.getItem("type")
	//     ? JSON.parse(local.getItem("type"))
	//     : null;
	//   setEditTypeNameInput(currentType ? currentType.name : "");
	//   setEditTypeOfInput(currentType ? currentType.id_catalog : "");

	//   //edit product
	//   currentType = local.getItem("product")
	//     ? JSON.parse(local.getItem("product"))
	//     : null;
	//   setEditProductNameInput(currentProduct ? currentProduct.name : "");
	//   setEditProductOfInput(currentProduct ? currentProduct.id_type : "");
	//   setEditProductDescInput(currentProduct ? currentProduct.description : "");
	//   setEditProductPriceInput(currentProduct ? currentProduct.price : "");
	//   setEditProductQuantityInput(currentProduct ? currentProduct.quantity : "");
	//   setEditProductImageInput(currentProduct ? currentProduct.image : "");
	// });

	switch (type) {
		//Thêm danh mục
		case "add-catalog":
			return (
				<Modal show={show} onHide={handleClose}>
					<Modal.Header closeButton>
						<Modal.Title>Thêm danh mục</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<Form>
							<Form.Group
								className="mb-3"
								controlId="exampleForm.ControlInput1"
							>
								<Form.Label>Tên danh mục</Form.Label>
								<Form.Control
									type="text"
									placeholder="Nhập tên danh mục..."
									value={addCatInput}
									onChange={(e) => setAddCatInput(e.target.value)}
									autoFocus
								/>
							</Form.Group>
						</Form>
					</Modal.Body>
					<Modal.Footer>
						<Button variant="secondary" onClick={handleClose}>
							Hủy
						</Button>
						<Button variant="primary" onClick={addCatalog}>
							Thêm
						</Button>
					</Modal.Footer>
				</Modal>
			);
		//Sửa danh mục
		case "edit-catalog":
			return (
				<Modal show={show} onHide={handleClose}>
					<Modal.Header closeButton>
						<Modal.Title>Sửa danh mục</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<Form>
							<Form.Group
								className="mb-3"
								controlId="exampleForm.ControlInput1"
							>
								<Form.Label>Tên danh mục</Form.Label>
								<Form.Control
									type="text"
									placeholder="Nhập tên danh mục..."
									value={editCatInput}
									onChange={(e) => setEditCatInput(e.target.value)}
									autoFocus
								/>
							</Form.Group>
						</Form>
					</Modal.Body>
					<Modal.Footer>
						<Button variant="secondary" onClick={handleClose}>
							Hủy
						</Button>
						<Button variant="primary" onClick={() => editCatalog(id_catalog)}>
							Lưu
						</Button>
					</Modal.Footer>
				</Modal>
			);
		//Xóa danh mục
		case "delete-catalog":
			return (
				<Modal show={show} onHide={handleClose}>
					<Modal.Header closeButton>
						<Modal.Title>Xóa danh mục</Modal.Title>
					</Modal.Header>
					<Modal.Body>Bạn có chắc xóa?</Modal.Body>
					<Modal.Footer>
						<Button variant="secondary" onClick={handleClose}>
							Hủy
						</Button>
						<Button variant="primary" onClick={() => deleteCatalog(id_catalog)}>
							Xóa
						</Button>
					</Modal.Footer>
				</Modal>
			);
		//Thêm loại sản phẩm
		case "add-product-type":
			return (
				<Modal show={show} onHide={handleClose}>
					<Modal.Header closeButton>
						<Modal.Title>Thêm loại sản phẩm</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<Form>
							<Form.Group
								className="mb-3"
								controlId="exampleForm.ControlInput1"
							>
								<Form.Label>Tên loại sản phẩm</Form.Label>
								<Form.Control
									type="text"
									placeholder="Nhập tên loại sản phẩm..."
									autoFocus
									value={addTypeNameInput}
									onChange={(e) => setAddTypeNameInput(e.target.value)}
								/>
							</Form.Group>
							<Form.Select
								aria-label="Default select example"
								// value={addTypeOfInput}
								onChange={(e) => {
									console.log(e.target.value);
									setAddTypeOfInput(e.target.value);
								}}
							>
								<option>Chọn danh mục sản phẩm</option>
								{catArr
									.filter((item) => item.del_flag == 0)
									.map((item, index) => {
										return <option value={item.id_catalog}>{item.name}</option>;
									})}
							</Form.Select>
						</Form>
					</Modal.Body>
					<Modal.Footer>
						<Button variant="secondary" onClick={handleClose}>
							Hủy
						</Button>
						<Button variant="primary" onClick={addType}>
							Thêm
						</Button>
					</Modal.Footer>
				</Modal>
			);
		//Sửa loại sản phẩm
		case "edit-product-type":
			return (
				<Modal show={show} onHide={handleClose}>
					<Modal.Header closeButton>
						<Modal.Title>Sửa loại sản phẩm</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<Form>
							<Form.Group
								className="mb-3"
								controlId="exampleForm.ControlInput1"
							>
								<Form.Label>Tên loại sản phẩm</Form.Label>
								<Form.Control
									type="text"
									placeholder="Nhập tên loại sản phẩm..."
									autoFocus
									value={editTypeNameInput}
									onChange={(e) => setEditTypeNameInput(e.target.value)}
								/>
							</Form.Group>
							<Form.Select
								// value={editTypeOfInput}
								onChange={(e) => {
									console.log(e.target.value);
									setEditTypeOfInput(e.target.value);
								}}
							>
								<option>Chọn danh mục sản phẩm</option>
								{catArr
									.filter((item) => item.del_flag == 0)
									.map((item, index) => {
										return <option value={item.id_catalog}>{item.name}</option>;
									})}
							</Form.Select>
						</Form>
					</Modal.Body>
					<Modal.Footer>
						<Button variant="secondary" onClick={handleClose}>
							Hủy
						</Button>
						<Button variant="primary" onClick={() => editType(id_type)}>
							Lưu
						</Button>
					</Modal.Footer>
				</Modal>
			);
		//Xóa loại sản phẩm
		case "delete-product-type":
			return (
				<Modal show={show} onHide={handleClose}>
					<Modal.Header closeButton>
						<Modal.Title>Xóa loại sản phẩm</Modal.Title>
					</Modal.Header>
					<Modal.Body>Bạn có chắc xóa?</Modal.Body>
					<Modal.Footer>
						<Button variant="secondary" onClick={handleClose}>
							Hủy
						</Button>
						<Button variant="primary" onClick={() => deleteType(id_type)}>
							Xóa
						</Button>
					</Modal.Footer>
				</Modal>
			);
		//Thêm sản phẩm
		case "add-product":
			return (
				<Modal show={show} onHide={handleClose}>
					<Modal.Header closeButton>
						<Modal.Title>Thêm sản phẩm</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<Form>
							<Form.Group
								className="mb-3"
								controlId="exampleForm.ControlInput1"
							>
								<Form.Label>Tên sản phẩm</Form.Label>
								<Form.Control
									type="text"
									placeholder="Nhập danh mục..."
									autoFocus
									value={addProductNameInput}
									onChange={(e) => setAddProductNameInput(e.target.value)}
								/>
							</Form.Group>
							<Form.Select
								aria-label="Default select example"
								onChange={(e) => {
									console.log(e.target.value);
									setAddProductOfInput(e.target.value);
								}}
							>
								<option>Chọn loại sản phẩm</option>
								{typeArr
									.filter((item) => item.del_flag == 0)
									.map((item, index) => {
										return <option value={item.id_type}>{item.name}</option>;
									})}
							</Form.Select>
							<Form.Group
								className="mb-3"
								controlId="exampleForm.ControlInput1"
							>
								<Form.Label>Giá</Form.Label>
								<Form.Control
									type="text"
									placeholder="Nhập giá..."
									autoFocus
									value={addProductPriceInput}
									onChange={(e) => setAddProductPriceInput(e.target.value)}
								/>
							</Form.Group>
							<Form.Group
								className="mb-3"
								controlId="exampleForm.ControlInput1"
							>
								<Form.Label>Ảnh</Form.Label>
								{selectedImage && (
									<div>
										<img
											alt="not fount"
											width={"250px"}
											src={URL.createObjectURL(selectedImage)}
										/>
										<br />
									</div>
								)}
								<Form.Control
									type="file"
									// multiple
									placeholder="Nhập ảnh..."
									autoFocus
									onChange={(event) => {
										console.log(event.target.files[0]);
										setSelectedImage(event.target.files[0]);
										uploadImage(event.target.files[0]);
									}}
								/>
								<button onClick={() => setSelectedImage(null)}>Remove</button>
							</Form.Group>
							<Form.Group
								className="mb-3"
								controlId="exampleForm.ControlInput1"
							>
								<Form.Label>Số lượng</Form.Label>
								<Form.Control
									type="text"
									placeholder="Nhập số lượng..."
									autoFocus
									value={addProductQuantityInput}
									onChange={(e) => setAddProductQuantityInput(e.target.value)}
								/>
							</Form.Group>
							<Form.Group
								className="mb-3"
								controlId="exampleForm.ControlTextarea1"
							>
								<Form.Label>Mô tả</Form.Label>
								<Form.Control
									as="textarea"
									rows={3}
									value={addProductDescInput}
									onChange={(e) => setAddProductDescInput(e.target.value)}
								/>
							</Form.Group>
						</Form>
					</Modal.Body>
					<Modal.Footer>
						<Button variant="secondary" onClick={handleClose}>
							Hủy
						</Button>
						<Button variant="primary" onClick={addProduct}>
							Lưu
						</Button>
					</Modal.Footer>
				</Modal>
			);
		//Sửa sản phẩm
		case "edit-product":
			return (
				<Modal show={show} onHide={handleClose}>
					<Modal.Header closeButton>
						<Modal.Title>Thêm sản phẩm</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<Form>
							<Form.Group
								className="mb-3"
								controlId="exampleForm.ControlInput1"
							>
								<Form.Label>Tên sản phẩm</Form.Label>
								<Form.Control
									type="text"
									placeholder="Nhập danh mục..."
									autoFocus
									value={editProductNameInput}
									onChange={(e) => setEditProductNameInput(e.target.value)}
								/>
							</Form.Group>
							<Form.Select
								aria-label="Default select example"
								onChange={(e) => {
									console.log(e.target.value);
									setEditProductOfInput(e.target.value);
								}}
							>
								<option>Chọn loại sản phẩm</option>
								{typeArr
									.filter((item) => item.del_flag == 0)
									.map((item, index) => {
										return <option value={item.id_type}>{item.name}</option>;
									})}
							</Form.Select>
							<Form.Group
								className="mb-3"
								controlId="exampleForm.ControlInput1"
							>
								<Form.Label>Giá</Form.Label>
								<Form.Control
									type="text"
									placeholder="Nhập giá..."
									autoFocus
									value={editProductPriceInput}
									onChange={(e) => setEditProductPriceInput(e.target.value)}
								/>
							</Form.Group>
							<Form.Group
								className="mb-3"
								controlId="exampleForm.ControlInput1"
							>
								<Form.Label>Ảnh</Form.Label>
								{selectedImage && (
									<div>
										<img
											alt="not fount"
											width={"250px"}
											src={URL.createObjectURL(selectedImage)}
										/>
										<br />
									</div>
								)}
								<Form.Control
									type="file"
									// multiple
									placeholder="Nhập ảnh..."
									autoFocus
									onChange={(event) => {
										console.log(event.target.files[0]);
										setSelectedImage(event.target.files[0]);
										uploadImage(event.target.files[0]);
									}}
								/>
								<button onClick={() => setSelectedImage(null)}>Remove</button>
							</Form.Group>
							<Form.Group
								className="mb-3"
								controlId="exampleForm.ControlInput1"
							>
								<Form.Label>Số lượng</Form.Label>
								<Form.Control
									type="text"
									placeholder="Nhập số lượng..."
									autoFocus
									value={editProductQuantityInput}
									onChange={(e) => setEditProductQuantityInput(e.target.value)}
								/>
							</Form.Group>
							<Form.Group
								className="mb-3"
								controlId="exampleForm.ControlTextarea1"
							>
								<Form.Label>Mô tả</Form.Label>
								<Form.Control
									as="textarea"
									rows={3}
									value={editProductDescInput}
									onChange={(e) => setEditProductDescInput(e.target.value)}
								/>
							</Form.Group>
						</Form>
					</Modal.Body>
					<Modal.Footer>
						<Button variant="secondary" onClick={handleClose}>
							Hủy
						</Button>
						<Button variant="primary" onClick={() => editProduct(id_prod)}>
							Lưu
						</Button>
					</Modal.Footer>
				</Modal>
			);
		//Xóa sản phẩm
		case "delete-product":
			return (
				<Modal show={show} onHide={handleClose}>
					<Modal.Header closeButton>
						<Modal.Title>Xóa sản phẩm</Modal.Title>
					</Modal.Header>
					<Modal.Body>Bạn có chắc xóa?</Modal.Body>
					<Modal.Footer>
						<Button variant="secondary" onClick={handleClose}>
							Hủy
						</Button>
						<Button variant="primary" onClick={() => deleteProduct(id_prod)}>
							Xóa
						</Button>
					</Modal.Footer>
				</Modal>
			);
		//Thêm slide
		case "add-slide":
			return (
				<Modal show={show} onHide={handleClose}>
					<Modal.Header closeButton>
						<Modal.Title>Thêm slide</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<Form>
							<Form.Group
								className="mb-3"
								controlId="exampleForm.ControlInput1"
							>
								<Form.Label>Ảnh</Form.Label>
								{selectedImage && (
									<div>
										<img
											alt="not fount"
											width={"250px"}
											src={URL.createObjectURL(selectedImage)}
										/>
										<br />
									</div>
								)}
								<Form.Control
									type="file"
									// multiple
									placeholder="Nhập ảnh..."
									autoFocus
									onChange={(event) => {
										console.log(event.target.files[0]);
										setSelectedImage(event.target.files[0]);
										uploadImage(event.target.files[0]);
									}}
								/>
								<button onClick={() => setSelectedImage(null)}>Remove</button>
							</Form.Group>
						</Form>
					</Modal.Body>
					<Modal.Footer>
						<Button variant="secondary" onClick={handleClose}>
							Hủy
						</Button>
						<Button variant="primary" onClick={addSlide}>
							Thêm
						</Button>
					</Modal.Footer>
				</Modal>
			);
		// //Sửa slide
		// case "edit-slide":
		//   return (
		//     <Modal show={show} onHide={handleClose}>
		//       <Modal.Header closeButton>
		//         <Modal.Title>Sửa slide</Modal.Title>
		//       </Modal.Header>
		//       <Modal.Body>
		//         <Form>
		//           <Form.Group
		//             className="mb-3"
		//             controlId="exampleForm.ControlInput1"
		//           >
		//             <Form.Label>Ảnh</Form.Label>
		//             {selectedImage && (
		//               <div>
		//                 <img
		//                   alt="not fount"
		//                   width={"250px"}
		//                   src={URL.createObjectURL(selectedImage)}
		//                 />
		//                 <br />
		//               </div>
		//             )}
		//             <Form.Control
		//               type="file"
		//               // multiple
		//               placeholder="Nhập ảnh..."
		//               autoFocus
		//               onChange={(event) => {
		//                 console.log(event.target.files[0]);
		//                 setSelectedImage(event.target.files[0]);
		//                 uploadImage(event.target.files[0]);
		//               }}
		//             />
		//             <button onClick={() => setSelectedImage(null)}>Remove</button>
		//           </Form.Group>
		//         </Form>
		//       </Modal.Body>
		//       <Modal.Footer>
		//         <Button variant="secondary" onClick={handleClose}>
		//           Hủy
		//         </Button>
		//         <Button variant="primary" onClick={() => editSlide(id_slide)}>
		//           Thêm
		//         </Button>
		//       </Modal.Footer>
		//     </Modal>
		//   );
		//Xóa slide
		case "delete-slide":
			return (
				<Modal show={show} onHide={handleClose}>
					<Modal.Header closeButton>
						<Modal.Title>Xóa slide</Modal.Title>
					</Modal.Header>
					<Modal.Body>Bạn có chắc xóa?</Modal.Body>
					<Modal.Footer>
						<Button variant="secondary" onClick={handleClose}>
							Hủy
						</Button>
						<Button variant="primary" onClick={() => deleteSlide(id_slide)}>
							Xóa
						</Button>
					</Modal.Footer>
				</Modal>
			);
		default:
			return null;
	}
}
export default CustomModal;
