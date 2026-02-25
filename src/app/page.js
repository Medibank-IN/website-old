"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import Blogsection from "@/components/Home/Blogsection";
import Aboutsection from "@/components/Home/Aboutsection";
import WhyUs from "@/components/Home/WhyUs";
import ContactCard from "@/components/Home/ContactCard";
import Faq from "@/components/Home/Faq";

export default function Home() {
	// Animation Variants
	const fadeInText = {
		hidden: { opacity: 0, x: -50 },
		visible: { opacity: 1, x: 0, transition: { duration: 0.8 } },
	};

	const fadeInImage = {
		hidden: { opacity: 0, scale: 0.9 },
		visible: { opacity: 1, scale: 1, transition: { duration: 0.8 } },
	};

	const fadeInButton = {
		hidden: { opacity: 0, y: 50 },
		visible: { opacity: 1, y: 0, transition: { duration: 0.8, delay: 0.2 } },
	};

	return (
		<>
			{/* Hero Section */}
			<motion.div
				className="w-full sticky bg-blue-50 h-screen z-[-1] top-[90px] "
				initial="hidden"
				animate="visible"
			>
				<div className="container flex flex-col md:flex-row items-center px-4 md:px-8">
					{/* Text Section */}
					<motion.div
						className="md:w-1/2 w-full text-center md:text-left mb-8 md:mb-0"
						variants={fadeInText}
					>
						<div className="text-sm font-medium text-gray-600 mb-4">
						⭐India&apos;s 1st Centralised EHR Platform ⭐
						</div>
						<h1 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-6">
							Revolutionising{" "}
							<span className="text-indigo-600">Healthcare</span>, With{" "}
							<span className="text-indigo-600">
								Centralised Digital Health
							</span>{" "}
							Records
						</h1>
						{/* Image Section hidden on mobile */}
						<motion.div
							className="text-sm font-medium text-gray-600 mb-4 hidden md:block"
							variants={fadeInImage}
						>
							<div className="flex gap-10 justify-left">
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
							<div className="flex gap-10 justify-left">
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
						</motion.div>
					</motion.div>
					<div className="flex flex-col-reverse md:flex-col ">
						{/* Image Section, hidden on desktop */}
						<motion.div
							className="text-sm font-medium text-gray-600 mb-4 block md:hidden"
							variants={fadeInImage}
						>
							<div className="flex gap-10 justify-center">
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
							<div className="flex gap-10 justify-center">
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
						</motion.div>
						<motion.div
							className="md:w-1/2 w-full flex justify-center md:justify-end md:hidden"
							variants={fadeInImage}
						>
							<Image
								src="/images/doctors2.png"
								alt="Doctors Illustration"
								width={400}
								height={250}
								className="w-full max-w-sm"
							/>
						</motion.div>
					</div>
					{/* desktop image */}
					<motion.div
						className="md:w-1/2 w-full md:flex justify-center md:justify-end hidden lg:py-16"
						variants={fadeInImage}
					>
						<Image
							src="/images/doctors2.png"
							alt="Doctors Illustration"
							width={400}
							height={250}
							className="w-full max-w-sm"
						/>
					</motion.div>
				</div>

				{/* Buttons */}
				<motion.div
					className="hidden md:flex flex-wrap justify-center md:justify-around gap-4 py-6 bg-[#160073] text-white px-4"
					variants={fadeInButton}
				>
					{[
						{ src: "/images/hero1.png", text: "Digital Health Records" },
						{ src: "/images/hero2.png", text: "Online Consultation" },
						{ src: "/images/hero3.png", text: "Emergency Record Access" },
						{ src: "/images/ai.png", text: "AI Health Analysis" },
					].map((item, index) => (
						<div
							key={index}
							className="flex items-center gap-2 text-sm md:text-base"
						>
							<Image src={item.src} alt={item.text} width={50} height={50} />
							<span>{item.text}</span>
						</div>
					))}
				</motion.div>
			</motion.div>

			{/* About Section */}
			<div className="py-6 md:py-12 px-4 md:px-8 lg:px-0 bg-inherit sticky h-screen top-[90px] z-0 md:z-[-1]">
				<Aboutsection />
			</div>

			{/* Why Us Section */}
			<div className="bg-white py-6 md:py-12 px-4 md:px-8 sticky h-screen top-[90px] z-0 md:z-[-1]">
				<WhyUs />
			</div>

			{/* Blog Section */}
			<div className="bg-[#F3F0FF] py-6 md:py-12 px-4 md:px-8">
				<Blogsection />
			</div>

			{/* Contact Us Section */}
			<div className="bg-[#F3F0FF] py-6 md:py-12 px-4 md:px-8">
				<ContactCard />
			</div>

			{/* FAQ Section */}
			<div className="px-4 md:px-8 py-6 md:py-12 bg-inherit">
				<Faq />
			</div>
		</>
	);
}
