import axios from "axios";
import React, { useState } from "react";
import { useUser } from "../../../context/userContext";
import Button from "../../atoms/Button";
import ApiConfig from "../../../config/ApiConfig";

const UserProfile = () => {
	const userContext = useUser();
	// let user = userContext.user;
	const [username, setUsername] = useState(userContext.user.username);
	const [name, setName] = useState(userContext.user.name);
	const [phone, setPhone] = useState(userContext.user.phone);
	const [email, setEmail] = useState(userContext.user.email);
	const [address, setAddress] = useState(userContext.user.address);

	const handleUpdateUser = async () => {
		const data = {
			username,
			name,
			phone,
			email,
			address,
		};
		// API
		await axios
			.put(`${ApiConfig}user/${userContext.user.id_user}`, data)
			.then((res) => {
				// console.log(res.data);
				userContext.updateProfile({
					...data,
					id_user: userContext.user.id_user,
				});
				// window.location.reload();
			})
			.catch((error) => {
				console.log(error);
			});
	};
	return (
		<div className="col-span-3 p-5 border right flex-4">
			<h3 className="font-bold uppercase mb-2 text-[18px]">HỒ SƠ CỦA TÔI</h3>
			<p className="mb-3 text-[14px]">
				Quản lý thông tin hồ sơ để bảo mật tài khoản
			</p>
			<hr />
			<div className="grid grid-cols-3 mt-3 gap-x-4 w-3/4">
				<div className="col-span-1 flex flex-col gap-y-6 items-end justify-evenly">
					<div>
						Tên đăng nhập <span className="text-[#f06455]">(*)</span>
					</div>
					<div>
						Họ tên <span className="text-[#f06455]">(*)</span>
					</div>
					<div>
						Điện thoại <span className="text-[#f06455]">(*)</span>
					</div>
					<div>
						Email <span className="text-[#f06455]">(*)</span>
					</div>
					<div>
						Địa chỉ <span className="text-[#f06455]">(*)</span>
					</div>
				</div>
				<div className="col-span-2 flex flex-col gap-y-2 justify-between">
					<input
						type="text"
						placeholder=""
						value={username}
						onChange={(e) => setUsername(e.target.value)}
						className="outline-none rounded-md px-3 py-2 focus:border-primary border"
					/>
					<input
						type="text"
						placeholder=""
						value={name}
						onChange={(e) => setName(e.target.value)}
						className="outline-none rounded-md px-3 py-2 focus:border-primary border"
					/>
					<input
						type="text"
						placeholder=""
						value={phone}
						onChange={(e) => setPhone(e.target.value)}
						className="outline-none rounded-md px-3 py-2 focus:border-primary border"
					/>
					<input
						type="email"
						placeholder=""
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						className="outline-none rounded-md px-3 py-2 focus:border-primary border"
					/>
					<input
						type="text"
						placeholder=""
						value={address}
						onChange={(e) => setAddress(e.target.value)}
						className="outline-none rounded-md px-3 py-2 focus:border-primary border"
					/>
				</div>
			</div>
			<div className="grid grid-cols-3 w-3/4 mt-3 gap-x-4">
				<div className="col-span-1"></div>
				<div className="col-span-2">
					<Button
						className="normal-case w-auto px-3"
						onClick={handleUpdateUser}
					>
						Cập nhật
					</Button>
				</div>
			</div>
		</div>
	);
};

export default UserProfile;
