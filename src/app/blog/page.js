import React from "react";
import Image from "next/image";
import Breadcrumb from "@/components/Breadcrumb";
export default function page() {
	const blogList = [
		{
			imgurl: "/images/blogs/blog1.webp",
			title: "Need of the Hour: India Needs EHR Framework",
			source: "TOI",
			path: "/blog/article1",
		},
		{
			imgurl: "/images/blogs/blog2.webp",
			title: "Digitalisation of Healthcare Data: The Next Startup Boom",
			source: "ET CONTRIBUTORS",
			path: "/blog/article2",
		},
		{
			imgurl: "/images/blogs/blog3.webp",
			title:
				"India Bullish on AI in Healthcare Without Electronic Health Records",
			source: "ETHealthWorld",
			path: "/blog/article3",
		},
		{
			imgurl: "/images/blogs/blog4new.webp",
			title:
				"Electronic Health Records: Adoption and Overcoming Challenges for India",
			source: "appknox",
			path: "/blog/article4",
		},
		{
			imgurl: "/images/art5Mb1.png",
			title:
				"The Future of Healthcare: How EHR can Transform Patient Care in India",
			source: "appknox",
			path: "/blog/article5",
		},
	];

	const breadcrumbItems = [
		{ label: "Home", href: "/" },
		{ label: "Blog", href: "/blog" },
	];
	return (
		<div className="mt-[100px]">
			<div className="bg-slate-500">
				<div className="w-4/5 m-auto py-16">
					<Breadcrumb items={breadcrumbItems} textColor="text-white" />
					<div className="text-center my-8 text-[28px] font-bold text-white">
						Blogs
					</div>
					<div className="flex justify-around items-center flex-col md:flex-row w-full flex-wrap">
						{blogList.map((item, index) => {
							return (
								<div
									key={index}
									className="shadow-[0_4px_4px_rgba(0,0,0,0.25)] rounded-[10px] p-4 bg-white w-full m-0 my-2 md:w-1/3 md:m-4 "
								>
									<a href={item.path} tabIndex="0">
										<Image
											src={item.imgurl}
											alt="National Poker Series"
											className="rounded-[7px]"
											width="358"
											height="298"
											loading="lazy"
										/>
									</a>
									<div className="text-left py-1">{item.title}</div>
									<div className="text-left text-[#636384] text-[14px]">
										Source: {item.source}
									</div>
								</div>
							);
						})}
					</div>
				</div>
			</div>
		</div>
	);
}
