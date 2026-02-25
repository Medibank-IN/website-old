"use client";
import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

export default function BlogSection() {
	const blogList = [
		{
			imgurl: "/images/blogs/blog1.webp",
			title: "Need of the Hour: India Needs EHR Framework",
			source: "TOI",
			path: "/blog/article1",
			content: "Content for Need of the Hour: India Needs EHR Framework",
		},
		{
			imgurl: "/images/blogs/blog2.webp",
			title: "Digitalisation of Healthcare Data: The Next Startup Boom",
			source: "ET CONTRIBUTORS",
			path: "/blog/article2",
			content: "Content for Digitalisation of Healthcare Data",
		},
		{
			imgurl: "/images/blogs/blog3.webp",
			title:
				"India Bullish on AI in Healthcare Without Electronic Health Records",
			source: "ETHealthWorld",
			path: "/blog/article3",
			content: "Content for India Bullish on AI in Healthcare",
		},
		{
			imgurl: "/images/blogs/blog4new.webp",
			title:
				"Electronic Health Records: Adoption and Overcoming Challenges for India",
			source: "appknox",
			path: "/blog/article4",
			content: "Content for Electronic Health Records: Adoption",
		},
	];

	const [mainBlog, setMainBlog] = useState(blogList[0]); // Set the initial main blog
	const [isSwitching, setIsSwitching] = useState(false);

	const handleBlogClick = (blog) => {
		if (blog.title !== mainBlog.title) {
			setIsSwitching(true); // Trigger the switching animation
			setTimeout(() => {
				setMainBlog(blog);
				setIsSwitching(false); // Reset the animation state
			}, 500); // Match the duration of the animation
		}
	};

	// Animation Variants
	const mainBlogVariants = {
		hidden: { opacity: 0, y: 50 },
		visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
	};

	const blogCardVariants = {
		hidden: { opacity: 0, y: 20 },
		visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.2 } },
	};

	const buttonVariants = {
		hidden: { opacity: 0, y: 20 },
		visible: { opacity: 1, y: 0, transition: { duration: 0.8, delay: 0.4 } },
	};

	// Get other blogs limited to 3 only
	const otherBlogs = blogList
		.filter((blog) => blog.title !== mainBlog.title)
		.slice(0, 3);

	return (
		<motion.div
			className="text-center"
			initial="hidden"
			whileInView="visible"
			viewport={{ once: true, amount: 0.3 }} // Trigger animation when 30% of the section is in view
		>
			<motion.div
				className="text-3xl md:text-[35px]  md:leading-[52px] font-semibold text-[#000339] leading-[25px]"
				variants={mainBlogVariants}
			>
				Blogs
			</motion.div>
			<div className="flex flex-col sm:flex-row py-6 justify-between items-center mxxxl:container w-[90%] m-auto xl:container">
				{/* Main Blog Section with Animation */}
				{/* for desktop view */}
				<motion.div
					className="sm:w-[45%] hidden md:block"
					variants={mainBlogVariants}
				>
					<AnimatePresence mode="wait">
						{!isSwitching && (
							<motion.div
								key={mainBlog.title}
								initial="hidden"
								animate="visible"
								exit="hidden"
								variants={mainBlogVariants}
								className="main-blog shadow-[0_4px_4px_rgba(0,0,0,0.25)] rounded-[10px] bg-white mb-6"
							>
								<a href={mainBlog.path} tabIndex="0">
									<Image
										src={mainBlog.imgurl}
										alt={mainBlog.title}
										className="rounded-[7px] w-full h-[300px] object-cover"
										width={500}
										height={300}
										loading="lazy"
									/>
								</a>
								<div className="text-left p-6 py-2 font-bold">
									{mainBlog.title}
								</div>
								<div className="text-left px-6 text-[#636384] text-[14px] mb-2">
									Source: {mainBlog.source}
								</div>
								<p className="text-left px-6 pb-6">{mainBlog.content}</p>
							</motion.div>
						)}
					</AnimatePresence>
				</motion.div>
				{/* for mobile view */}
				<motion.div
					className="sm:w-[45%] block md:hidden"
					variants={mainBlogVariants}
				>
					<AnimatePresence mode="wait">
						{!isSwitching && (
							<motion.div
								key={mainBlog.title}
								initial="hidden"
								animate="visible"
								exit="hidden"
								variants={mainBlogVariants}
								className="main-blog shadow-[0_4px_4px_rgba(0,0,0,0.25)] rounded-[10px] bg-white mb-6 p-4 flex min-h-[125px]"
								// className="flex shadow-[0_4px_4px_rgba(0,0,0,0.25)] rounded-[10px] p-4 bg-white cursor-pointer transition-transform hover:scale-105"
							>
								<a href={mainBlog.path} tabIndex="0">
								<div className="flex-shrink-0">
									<Image
										src={mainBlog.imgurl}
										alt={mainBlog.title}
										className="rounded-[7px] object-cover min-w-[120px]"
										width="120"
										height="100"
										loading="lazy"
									/>
								</div>
								</a>
								{/* Blog Content */}
								<div className="flex flex-col pl-4 text-left">
									<div className="text-left font-bold">
										{mainBlog.title}
									</div>
									<div className="text-left text-[#636384] text-[14px]">
										Source: {mainBlog.source}
									</div>
									{/* <p className="text-left">{mainBlog.content}</p> */}
								</div>
							</motion.div>
						)}
					</AnimatePresence>
				</motion.div>

				{/* Other Blogs */}
				<motion.div
					className="flex flex-col gap-4 sm:w-[50%] justify-center"
					variants={blogCardVariants}
				>
					{otherBlogs.map((item, index) => (
						<motion.div
							key={index}
							className="flex shadow-[0_4px_4px_rgba(0,0,0,0.25)] rounded-[10px] p-4 bg-white cursor-pointer transition-transform hover:scale-105"
							onClick={() => handleBlogClick(item)}
							variants={blogCardVariants}
						>
							{/* Blog Image */}
							<div className="flex-shrink-0">
								<Image
									src={item.imgurl}
									alt={item.title}
									className="rounded-[7px]"
									width="120"
									height="100"
									loading="lazy"
								/>
							</div>

							{/* Blog Content */}
							<div className="flex flex-col justify-center pl-4 text-left">
								<div className="font-bold">{item.title}</div>
								<div className="text-[#636384] text-[14px]">
									Source: {item.source}
								</div>
							</div>
						</motion.div>
					))}
				</motion.div>
			</div>
			<motion.div className="text-center my-1" variants={buttonVariants}>
				<a
					href="/blog"
					className="bg-[#6D4AFF] p-3 px-6 text-white rounded-[20px]"
				>
					View All
				</a>
			</motion.div>
		</motion.div>
	);
}
