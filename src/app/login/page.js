"use client";
import React, { useState } from "react";
import Image from "next/image";
import SignupPopup from "@/components/ui/SignupPopup";
export default function Page() {
	const [isOpenModel, setIsOpenModel] = useState(false);
	return (
		<>
			<div className="mt-[100px] bg-blue-50">
				<div className="w-full md:w-4/5 container pb-16 relative">
					{/* <Image

					src="/images/login/Coming_soon_stamp.png"
					className="m-auto block md:hidden absolute top-3/4 left-1/2 transform -translate-x-1/2 -translate-y-full"
					width="200"
					height="200"
					alt="coming soon"
				/> */}
					{/* <Image
					src="/images/login/Coming_soon_stamp.png"
					className="m-auto block md:hidden absolute top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-full"
					width="200"
					height="200"
					alt="coming soon"

				/> */}
					{/* <Image

					src="/images/login/Coming soon_boardhang.png"
					className="m-auto hidden md:block comming-soon"
					width="200"
					height="200"
					alt="coming soon"
				/> */}
					{/* <div className='text-green-400'>LOGIN</div> */}
					<div className="flex flex-col md:flex-row justify-between w-full h-auto">
						{/* <Image
						src="/images/login/Coming_soon_stamp.png"
						className="m-auto block md:hidden absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
						width="200"
						height="200"
						alt="coming soon"
					/> */}
						<div className="">
							<div className="py-2 text-blue-400 font-medium">
								INDIVIDUAL USER
							</div>
							<div className=" p-8 mx-auto bg-white rounded-xl">
								<div className="max-w-lg mx-auto">
									<div className="text-center mb-6">
										<h2 className="text-3xl md:text-4xl font-extrabold">
											Sign in
										</h2>
										<p className="font-extrabold text-transparent bg-gradient-to-r from-purple-500 to-blue-700 bg-clip-text">
											(Coming Soon Should be used as Beta Version Access)
										</p>
									</div>
									<form action="">
										<div className="mb-6">
											<label className="block mb-2 font-extrabold">Email</label>
											<input
												className="inline-block w-full p-4 leading-6 text-lg font-extrabold placeholder-indigo-900 bg-white shadow border-2 border-indigo-900 rounded cursor-not-allowed"
												type="email"
												placeholder="email"
												disabled
												aria-disabled="true"
											/>
										</div>
										<div className="mb-6">
											<label className="block mb-2 font-extrabold ">
												Password
											</label>
											<input
												className="inline-block cursor-not-allowed w-full p-4 leading-6 text-lg font-extrabold placeholder-indigo-900 bg-white shadow border-2 border-indigo-900 rounded"
												type="password"
												placeholder="**********"
												disabled
												aria-disabled="true"
											/>
										</div>
										<div className="flex flex-wrap -mx-4 mb-6 items-center justify-between">
											<div className="w-full lg:w-auto px-4 mb-4 lg:mb-0">
												<label>
													<input type="checkbox" />
													<span className="ml-1 font-extrabold">
														Remember me
													</span>
												</label>
											</div>
											<div className="w-full lg:w-auto px-4">
												<a
													className="inline-block font-extrabold hover:underline"
													href="#"
												>
													Forgot your password?
												</a>
											</div>
										</div>
										<button className="inline-block w-full py-4 px-6 mb-6 text-center text-lg leading-6 text-white font-extrabold bg-indigo-800 hover:bg-indigo-900 border-3 border-indigo-900 shadow rounded transition duration-200">
											Sign in
										</button>
										<p className="text-center font-extrabold">
											Don&rsquo;t have an account?{" "}
											<span
												className="text-red-500 hover:underline cursor-pointer"
												onClick={() => setIsOpenModel(true)}
											>
												Sign up
											</span>
										</p>
									</form>
								</div>
							</div>
							<div className="max-w-lg mx-auto text-center">
								<div className="pt-6 text-blue-500">
									Keep Your records on hand with our app.
								</div>
								<div className="pb-6 text-blue-500">
									Download it using the below QR codes.
								</div>
								<div className="flex justify-between">
									<Image
										className="blur-[2px]"
										src="/images/QR.png"
										width="100"
										height="100"
										alt="qr"
									/>
									<Image
										className="blur-[2px]"
										src="/images/QR.png"
										width="100"
										height="100"
										alt="qr"
									/>
								</div>
								<div className="flex justify-between">
									<Image
										src="/images/playstore.png"
										className="h-auto"
										width="100"
										height="100"
										alt="qr"
									/>
									<Image
										src="/images/appstore.png"
										width="100"
										height="50"
										alt="qr"
									/>
								</div>
							</div>
						</div>
						<div className="border-t md:border-t-0 md:border-r border-black w-full my-8 md:w-1 md:h-[500px]"></div>
						<div className="">
							<div className="py-2 text-blue-400 font-medium">
								DOCTOR / CLINIC
							</div>

							<div className="p-8 mx-auto bg-white rounded-xl">
								<div className="max-w-lg mx-auto">
									<div className="text-center mb-6">
										<h2 className="text-3xl md:text-4xl font-extrabold">
											Sign in
										</h2>
										<p className="font-extrabold text-transparent bg-gradient-to-r from-purple-500 to-blue-700 bg-clip-text">
											(Coming Soon Should be used as Beta Version Access)
										</p>
									</div>
									<form action="">
										<div className="mb-6">
											<label>
												<input type="checkbox" />
												<span className="ml-1 font-extrabold">Doctor</span>
											</label>
											<label>
												<input type="checkbox" className="ml-4" />
												<span className="ml-1 font-extrabold">Clinic</span>
											</label>
										</div>
										<div className="mb-6">
											<label className="block mb-2 font-extrabold ">
												Email
											</label>
											<input
												className="inline-block cursor-not-allowed w-full p-4 leading-6 text-lg font-extrabold placeholder-indigo-900 bg-white shadow border-2 border-indigo-900 rounded"
												type="email"
												placeholder="email"
												disabled
												aria-disabled="true"
											/>
										</div>
										<div className="mb-6">
											<label className="block mb-2 font-extrabold">
												Password
											</label>
											<input
												className="inline-block cursor-not-allowed w-full p-4 leading-6 text-lg font-extrabold placeholder-indigo-900 bg-white shadow border-2 border-indigo-900 rounded"
												type="password"
												placeholder="**********"
												disabled
												aria-disabled="true"
											/>
										</div>
										<div className="flex flex-wrap -mx-4 mb-6 items-center justify-between">
											<div className="w-full lg:w-auto px-4 mb-4 lg:mb-0">
												<label>
													<input type="checkbox" />
													<span className="ml-1 font-extrabold">
														Remember me
													</span>
												</label>
											</div>
											<div className="w-full lg:w-auto px-4">
												<a
													className="inline-block font-extrabold hover:underline"
													href="#"
												>
													Forgot your password?
												</a>
											</div>
										</div>
										<button className="inline-block w-full py-4 px-6 mb-6 text-center text-lg leading-6 text-white font-extrabold bg-indigo-800 hover:bg-indigo-900 border-3 border-indigo-900 shadow rounded transition duration-200">
											Sign in
										</button>
										<p className="text-center font-extrabold">
											Don&rsquo;t have an account?{" "}
											<span
												className="text-red-500 hover:underline cursor-pointer"
												onClick={() => setIsOpenModel(true)}
											>
												Sign up
											</span>
										</p>
									</form>
								</div>
							</div>
							<div className="max-w-lg mx-auto py-6 text-blue-500 text-center">
								Doctors who are not registerd with us and want to come onboard
								please contact us on{" "}
								<a href="mailto:support@medibank.in">support@medibank.in</a> to
								go through the onboarding process.
							</div>
						</div>
					</div>
				</div>
			</div>

			<SignupPopup isOpen={isOpenModel} setIsOpen={setIsOpenModel} />
		</>
	);
}
