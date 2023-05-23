import axios from "axios";
import React, { useState } from "react";
import { useUser } from "../../../context/userContext";
import Button from "../../atoms/Button";
import ApiConfig from "../../../config/ApiConfig";

const UserPassword = () => {
	const userContext = useUser();

	const [passwordOld, setPasswordOld] = useState();
	const [password, setPassword] = useState();
	const [passwordRe, setPasswordRe] = useState();
	const [error, setError] = useState("");

	const handleUpdatePassword = async () => {
		if (password !== passwordRe) {
			setError("Mật khẩu không khớp");
		} else {
			// check MK cũ đúng -> đổi mk, sai thì nhập lại
			await axios
				.post(`${ApiConfig}user/getpassword/${userContext.user.id_user}`, {
					password: passwordOld,
				})
				.then(async (res) => {
					if (Number(res.data.status) === 0) {
						setError("Mật khẩu cũ không đúng.");
					} else {
						await axios
							.put(`${ApiConfig}user/${userContext.user.id_user}`, { password })
							.then((res) => {
								console.log(res.data);
								alert("Đổi mật khẩu thành công!");
								window.location.reload();
							})
							.catch((error) => {
								console.log(error);
							});
					}
				})
				.catch((error) => {
					console.log(error);
				});
		}
		// API
		// await axios
		//   .put(`http://localhost:8000/api/user/${userContext.user.id_user}`, data)
		//   .then((res) => {
		//     // console.log(res.data);
		//     userContext.updateProfile({
		//       ...data,
		//       id_user: userContext.user.id_user,
		//     });
		//     // window.location.reload();
		//   })
		//   .catch((error) => {
		//     console.log(error);
		//   });
	};
	return (
		<div className="right col-span-3 border flex-4 p-5">
			<h3 className="uppercase font-bold mb-2 text-[18px]">
				THAY ĐỔI MẬT KHẨU
			</h3>
			<p className="mb-3 text-[14px]">
				Bạn nên cập nhập mật khẩu thường xuyên vì lý do bảo mật
			</p>
			<hr />
			<div className="grid grid-cols-3 mt-3 gap-x-4 w-3/4">
				<div className="col-span-1 flex flex-col gap-y-6 items-end justify-evenly">
					<div>
						Mật khẩu cũ <span className="text-[#f06455]">(*)</span>
					</div>
					<div>
						Mật khẩu mới <span className="text-[#f06455]">(*)</span>
					</div>
					<div>
						Xác nhận mật khẩu<span className="text-[#f06455]">(*)</span>
					</div>
				</div>
				<div className="col-span-2 flex flex-col gap-y-2 justify-between">
					<input
						type="password"
						placeholder="Nhập mật khẩu cũ"
						value={passwordOld}
						onChange={(e) => {
							setError("");
							setPasswordOld(e.target.value);
						}}
						className="outline-none rounded-md px-3 py-2 focus:border-primary border"
					/>
					<input
						type="password"
						placeholder="Nhập mật khẩu mới"
						value={password}
						onChange={(e) => {
							setError("");
							setPassword(e.target.value);
						}}
						className="outline-none rounded-md px-3 py-2 focus:border-primary border"
					/>
					<input
						type="password"
						placeholder="Nhập lại mật khẩu mới"
						value={passwordRe}
						onChange={(e) => {
							setError("");
							setPasswordRe(e.target.value);
						}}
						className="outline-none rounded-md px-3 py-2 focus:border-primary border"
					/>
				</div>
			</div>
			<div className="grid grid-cols-3 w-3/4 mt-3 gap-x-4">
				<div className="col-span-1 flex justify-end items-center">
					{error && <span className="text-sm text-red-500">{error}</span>}
				</div>
				<div className="col-span-2">
					<Button
						className="normal-case w-auto px-3"
						onClick={handleUpdatePassword}
					>
						Xác nhận
					</Button>
				</div>
			</div>
		</div>
	);
};

export default UserPassword;
