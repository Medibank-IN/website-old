"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import emailjs from "@emailjs/browser";

export default function SignupPopup({ isOpen, setIsOpen }) {
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm();

	const [showSuccessPopup, setShowSuccessPopup] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);

	const onSubmit = async (data) => {
		setIsLoading(true);
		setError(null);

		try {
			const response = await fetch(
				"/api/user/addUserdataToSheet",
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(data),
				}
			);

			if (!response.ok) {
				throw new Error("Failed to process signup");
			}

			await sendConfirmationEmail(data);

			reset();
			setIsOpen(false);
			setShowSuccessPopup(true);
		} catch (error) {
			console.error("Error during submission:", error);
			setError(error.message || "Failed to process signup");
		} finally {
			setIsLoading(false);
		}
	};

	const sendConfirmationEmail = async (userData) => {
		try {
			await emailjs.send(
				process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
				process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
				{
					to_email: userData.email,
					from_name: "Team Medibank",
					to_name: `${userData.firstName} ${userData.lastName}`,
					message: "Thank you for signing up!",
				},
				{
					publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY,
				}
			);
		} catch (error) {
			console.error("Error sending email:", error);
		}
	};

	const handleClose = () => {
		reset();
		setIsOpen(false);
		setError(null);
	};

	return (
		<div>
			{isOpen && (
				<div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center mt-[88px] z-50">
					<div className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full h-fit my-16 md:my-5">
						<h2 className="text-2xl font-bold mb-4">
							Join{" "}
							<span className="text-sm text-transparent bg-gradient-to-r from-purple-500 to-blue-700 bg-clip-text">
								(Beta Version)
							</span>
						</h2>
						{error && (
							<div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
								{error}
							</div>
						)}
						<form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
							<div className="grid grid-cols-2 gap-4">
								<div className="space-y-1">
									<label
										htmlFor="firstName"
										className="block text-gray-700 text-sm font-bold"
									>
										First Name <span className="text-red-500">*</span>
									</label>
									<input
										id="firstName"
										placeholder="John"
										{...register("firstName", {
											required: "First name is required",
											minLength: {
												value: 2,
												message: "Minimum 2 characters",
											},
										})}
										className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
											errors.firstName ? "border-red-500" : ""
										}`}
									/>
									{errors.firstName && (
										<div className="text-red-500 text-xs">
											{errors.firstName.message}
										</div>
									)}
								</div>
								<div className="space-y-1">
									<label
										htmlFor="lastName"
										className="block text-gray-700 text-sm font-bold"
									>
										Last Name <span className="text-red-500">*</span>
									</label>
									<input
										id="lastName"
										placeholder="Doe"
										{...register("lastName", {
											required: "Last name is required",
											minLength: {
												value: 2,
												message: "Minimum 2 characters",
											},
										})}
										className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
											errors.lastName ? "border-red-500" : ""
										}`}
									/>
									{errors.lastName && (
										<div className="text-red-500 text-xs">
											{errors.lastName.message}
										</div>
									)}
								</div>
							</div>
							<div className="space-y-1">
								<label
									htmlFor="mobile"
									className="block text-gray-700 text-sm font-bold"
								>
									Mobile Number <span className="text-red-500">*</span>
								</label>
								<input
									id="mobile"
									type="text"
									maxLength="10"
									{...register("mobile", {
										required: "Mobile number is required",
										pattern: {
											value: /^[6-9]\d{9}$/,
											message: "Please enter valid 10-digit mobile number",
										},
										minLength: {
											value: 10,
											message: "Mobile number must be 10 digits",
										},
									})}
									className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
										errors.mobile ? "border-red-500" : ""
									}`}
									placeholder="Enter mobile number"
									onKeyPress={(e) => {
										if (!/[0-9]/.test(e.key)) {
											e.preventDefault();
										}
									}}
								/>
								{errors.mobile && (
									<div className="text-red-500 text-xs">
										{errors.mobile.message}
									</div>
								)}
							</div>
							<div className="space-y-1">
								<label
									htmlFor="email"
									className="block text-gray-700 text-sm font-bold"
								>
									Email <span className="text-red-500">*</span>
								</label>
								<input
									id="email"
									type="email"
									{...register("email", {
										required: "Email is required",
										pattern: {
											value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
											message: "Invalid email address",
										},
									})}
									className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
										errors.email ? "border-red-500" : ""
									}`}
									placeholder="example@email.com"
								/>
								{errors.email && (
									<div className="text-red-500 text-xs">
										{errors.email.message}
									</div>
								)}
							</div>
							<div className="flex items-center justify-between pt-4">
								<button
									type="submit"
									className="bg-indigo-500 hover:bg-indigo-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
									disabled={isLoading}
								>
									{isLoading ? (
										<>
											<svg
												className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
												xmlns="http://www.w3.org/2000/svg"
												fill="none"
												viewBox="0 0 24 24"
											>
												<circle
													className="opacity-25"
													cx="12"
													cy="12"
													r="10"
													stroke="currentColor"
													strokeWidth="4"
												></circle>
												<path
													className="opacity-75"
													fill="currentColor"
													d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
												></path>
											</svg>
											Joining...
										</>
									) : (
										"Join"
									)}
								</button>
								<button
									type="button"
									onClick={handleClose}
									className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
								>
									Cancel
								</button>
							</div>
						</form>
					</div>
				</div>
			)}
			{showSuccessPopup && (
				<div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center z-50">
					<div className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full">
						<h2 className="text-2xl font-bold mb-4 text-green-600">Success!</h2>
						<p className="mb-4">
							You successfully joined medibank, Beta Access.
						</p>
						<button
							onClick={() => setShowSuccessPopup(false)}
							className="bg-indigo-500 hover:bg-indigo-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
						>
							Close
						</button>
					</div>
				</div>
			)}
		</div>
	);
}
