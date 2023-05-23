import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Input from "../../atoms/Input";
import Button from "../../atoms/Button";
import { useUser } from "../../../context/userContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ApiConfig from "../../../config/ApiConfig";

const validateSchema = yup
	.object({
		username: yup.string().required("Trường này không được để trống"),
		email: yup.string().email().required("Trường này không được để trống"),
		phone: yup.string().required("Trường này không được để trống"),
		address: yup.string().required("Trường này không được để trống"),
		name: yup.string().required("Trường này không được để trống"),
		password: yup
			.string()
			.min(5, "Tối thiểu 5 kí tự")
			.required("Trường này không được để trống"),
		repassword: yup
			.string()
			.oneOf([yup.ref("password"), null], "Mật khẩu không khớp"),
	})
	.required();

const SignUpForm = () => {
	//
	const {
		handleSubmit,
		control,
		formState: { errors, isSubmitting },
	} = useForm({ resolver: yupResolver(validateSchema), mode: "onChange" });
	//
	const userContext = useUser();
	const navigate = useNavigate();
	//
	const onSubmit = async (data) => {
		// gọi API ở đây để sign up
		// console.log(data);

		const dataUser = {
			username: data.username,
			name: data.name,
			phone: data.phone,
			email: data.email,
			address: data.address,
			password: data.password,
		};
		// API
		await axios
			.post(`${ApiConfig}user/register`, dataUser)
			.then((res) => {
				// console.log(res.data);
				if (res.data.status == 0) {
					alert("Username đã tồn tại");
				} else {
					userContext.updateProfile({
						...dataUser,
						id_user: res.data.data.id_user,
					});
					alert("Đăng kí thành công!");
					navigate("/");
				}
				// window.location.reload();
			})
			.catch((error) => {
				console.log(error);
			});
	};
	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className="flex flex-col items-center w-full"
		>
			<div className="w-full mb-4 form-group">
				<label htmlFor="username" className="inline-block mb-2">
					Tên đăng nhập
				</label>
				<Input
					id="username"
					type="text"
					name="username"
					placeholder="ourlittlecorner2002"
					control={control}
				></Input>
				{errors.username && (
					<p className="text-sm text-red-500">{errors.username.message}</p>
				)}
			</div>
			<div className="w-full mb-4 form-group">
				<label htmlFor="name" className="inline-block mb-2">
					Họ tên
				</label>
				<Input
					id="name"
					type="name"
					name="name"
					placeholder="Nguyễn Minh Vy"
					control={control}
				></Input>
				{errors.name && (
					<p className="text-sm text-red-500">{errors.name.message}</p>
				)}
			</div>
			<div className="w-full mb-4 form-group">
				<label htmlFor="email" className="inline-block mb-2">
					Email
				</label>
				<Input
					id="email"
					type="email"
					name="email"
					control={control}
					placeholder="minhvy@gmail.com"
				></Input>
				{errors.email && (
					<p className="text-sm text-red-500">{errors.email.message}</p>
				)}
			</div>
			<div className="w-full mb-4 form-group">
				<label htmlFor="phone" className="inline-block mb-2">
					Điện thoại
				</label>
				<Input
					id="phone"
					type="tel"
					name="phone"
					placeholder="0522464748"
					control={control}
					pattern="(\+84|0)\d{9,10}"
				></Input>
				{errors.phone && (
					<p className="text-sm text-red-500">{errors.phone.message}</p>
				)}
			</div>
			{/* Tỉnh/ Thành phố ->  Quận/ Huyện*/}
			<div className="w-full mb-4 form-group">
				<label htmlFor="address" className="inline-block mb-2">
					Địa chỉ chi tiết
				</label>
				<Input
					id="address"
					type="text"
					name="address"
					control={control}
				></Input>
				{errors.address && (
					<p className="text-sm text-red-500">{errors.address.message}</p>
				)}
			</div>
			<div className="w-full mb-4 form-group">
				<label htmlFor="password" className="inline-block mb-2">
					Mật khẩu của bạn
				</label>
				<Input
					id="password"
					type="password"
					name="password"
					placeholder="********"
					control={control}
					autoComplete="off"
				></Input>
				{errors.password && (
					<p className="text-sm text-red-500">{errors.password.message}</p>
				)}
			</div>
			<div className="w-full mb-4 form-group">
				<label htmlFor="repassword" className="inline-block mb-2">
					Nhập lại mật khẩu
				</label>
				<Input
					id="repassword"
					type="password"
					name="repassword"
					placeholder="********"
					control={control}
					autoComplete="off"
				></Input>
				{errors.repassword && (
					<p className="text-sm text-red-500">{errors.repassword.message}</p>
				)}
			</div>
			<Button
				className={`hover:bg-hover ${isSubmitting ? "opacity-40" : ""}`}
				type="submit"
				disabled={isSubmitting}
			>
				ĐĂNG KÝ
			</Button>
		</form>
	);
};

export default SignUpForm;
