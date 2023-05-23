import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Input from "../../atoms/Input";
import Button from "../../atoms/Button";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useUser } from "../../../context/userContext";
import ApiConfig from "../../../config/ApiConfig";

const validateSchema = yup
	.object({
		username: yup.string().required("Trường này không được để trống"),
		password: yup.string().required("Trường này không được để trống"),
	})
	.required();

const SignInForm = () => {
	const {
		handleSubmit,
		control,
		formState: { errors, isSubmitting },
	} = useForm({ resolver: yupResolver(validateSchema), mode: "onChange" });

	const userContext = useUser();
	// let navigate = useNavigate();

	const onSubmit = (data) => {
		// gọi API ở đây để check -> sign in
		console.log({ data });

		//
		axios
			.post(`${ApiConfig}user/login`, {
				username: data.username,
				password: data.password,
			})
			.then((res) => {
				console.log(res.data);
				if (res.data.status === 1) {
					userContext.updateProfile({ ...res.data.data });
					window.location.reload();
				} else {
					alert("Đăng nhập thất bại! Sai username hoặc password");
				}
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
				<label htmlFor="password" className="inline-block mb-2">
					Nhập mật khẩu
				</label>
				<Input
					id="password"
					type="password"
					name="password"
					placeholder="********"
					control={control}
				></Input>
				{errors.password && (
					<p className="text-sm text-red-500">{errors.password.message}</p>
				)}
			</div>
			<Button
				className={`hover:bg-hover ${isSubmitting ? "opacity-40" : ""}`}
				type="submit"
				disabled={isSubmitting}
			>
				ĐĂNG NHẬP
			</Button>
			<div className="w-full text-center user-footer">
				<Link
					href="/user/getpassword"
					className="inline-block my-3 text-sm hover:text-primary"
				>
					Quên mật khẩu
				</Link>
				{/* <p className="mb-4 text-lg">Hoặc đăng nhập với</p>
        <div className="logFb w-full bg-[#2e4b88] mb-2">
          <a href="/" className="inline-block w-full py-2 text-sm text-white">
            <i className="mr-2 fa-brands fa-facebook-f"></i>
            <span>Đăng nhập bằng facebook</span>
          </a>
        </div>
        <div className="logGg w-full bg-[#ea4235] mb-4 text-sm">
          <a href="/" className="inline-block w-full py-2 text-white">
            <i className="mr-2 fa-brands fa-google"></i>
            <span>Đăng nhập Google</span>
          </a>
        </div> */}
			</div>
		</form>
	);
};

export default SignInForm;
