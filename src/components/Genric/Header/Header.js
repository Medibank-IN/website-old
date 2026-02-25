"use client";
import React from "react";
import Image from "next/image";
import { useState } from "react";
import { FiArrowDownRight } from "react-icons/fi";

export default function Header() {
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

	const toggleMobileMenu = () => {
		setIsMobileMenuOpen(!isMobileMenuOpen);
		var element = document.getElementById("burger");
		if (!isMobileMenuOpen) {
			element.innerHTML = "x";
		} else {
			element.innerHTML = "☰";
		}
	};

	const data = [
		{ url: "/", name: "Home" },
		{ url: "/partners", name: "Partners" },
		{ url: "/resources", name: "Resources" },
		{ url: "/about", name: "About Us" },
		{ url: "/blog", name: "Blog" },
		{ url: "/login", name: "Login" },
	];

	const menu = (
		<>
			{data.map((item, index) => {
				return (
					<a
						key={index}
						href={item.url}
						className="underline-offset-2 hover:underline bg-gradient-to-r from-purple-500 via-red-500 to-blue-700 bg-clip-text text-transparent shadow-md p-1 pl-4 font-semibold rounded-[10px] border"
					>
						{item.name}
					</a>
				);
			})}
		</>
	);

	return (
		<div className="shadow-[0px_0px_10px_#ccc] w-full fixed z-10 top-0 h-[87px] bg-[#F7F5FF]">
			<div className="container h-[87px]">
				<div className="flex justify-between h-[87px] px-2 md:px-0">
					<a href="/">
						<Image
							src="/images/ml_logo.png"
							className="m-auto"
							width="100"
							height="347"
							alt="header logo"
						/>
					</a>
					<div className="hidden lg:flex justify-around items-center gap-20">
						<a
							href="/"
							className=" lg:flex text-[15px] font-semibold text-black"
						>
							Home <FiArrowDownRight size={21} />
						</a>

						<a
							href="/partners"
							className="dropdown-header cursor-pointer p-[10px] text-[15px] flex font-semibold text-black"
						>
							Partners <FiArrowDownRight size={21} />
						</a>
						<div className="group relative">
							<a
								href="/resources"
								className="dropdown-header cursor-pointer p-[10px] text-[15px] flex font-semibold text-black"
							>
								Resources <FiArrowDownRight size={21} />
							</a>
							<div className="hidden fixed top-[60px] p-4 mt-2 bg-white min-w-[120px] text-black [&_a]:my-1 text-left rounded font-semibold z-[1] w-auto m-auto group-hover:block cursor-pointer [&_a]:block shadow-[0_4px_4px_rgba(0,_0,_0,_.2)]">
								<a href="/resources#resources1">ABHA / ABDM</a>
								<a href="/resources#resources2">Health Guides</a>
								<a href="/resources#resources3">Blog</a>
								<a href="/resources#resources4">Privacy policy</a>
							</div>
						</div>
						<div className="group relative">
							<a
								href="/about"
								className="dropdown-header cursor-pointer p-[10px] text-[15px] flex font-semibold text-black"
							>
								About Us <FiArrowDownRight size={21} />
							</a>
							<div className="hidden fixed top-[60px] p-4 mt-2 bg-white min-w-[120px] text-black [&_a]:my-1 text-left rounded font-semibold z-[1] w-auto m-auto group-hover:block cursor-pointer [&_a]:block shadow-[0_4px_4px_rgba(0,_0,_0,_.2)]">
								<a href="/about#about1">Our Story</a>
								<a href="/about#about2">Our Team</a>
								<a href="/about#about3">Careers</a>
								<a href="/about#about4">Contact Us</a>
							</div>
						</div>
					</div>
					<div className="hidden lg:flex justify-center items-center bg-blue-500 text-white p-4 my-8 rounded-[10px]">
						<a href="/login">Login</a>
					</div>
					<div
						id="burger"
						className="lg:hidden cursor-pointer text-[40px] ml-4 mb-0 mt-2 text-blue-700 !m-[auto_0]"
						onClick={toggleMobileMenu}
					>
						☰
					</div>
				</div>
				<div
					className={`lg:hidden shadow-[0px_10px_10px_#ccc] h-0 flex-col w-full absolute top-[87px] left-0 bg-white overflow-hidden block transition-max-height duration-500 ease-in-out ${
						isMobileMenuOpen
							? "flex h-auto max-h-screen"
							: "max-h-0 overflow-hidden"
					}`}
				>
					<div className="p-4 flex flex-col [&_a]:my-1">{menu}</div>
				</div>
			</div>
		</div>
	);
}
