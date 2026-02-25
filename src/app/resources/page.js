import React from "react";
import Image from "next/image";
import Blogsection from "@/components/Home/Blogsection";
export default function page() {
	return (
		<div className="mt-[100px]">
			<div id="resources1" className="bg-white py-2 md:px-16 px-8">
				<h1 className="text-[48px] font-semibold">Resources</h1>
				<div className="text-left text-[22px] font-semibold py-3">
					ABHA / ABDM
				</div>
				<div className=" flex flex-col-reverse flex-nowrap py-[30px] px-[30px] bg-[#F7F5FF] md:flex-row rounded-[30px] justify-center items-center ">
					<div className="md:w-[400px] w-[200px] m-auto">
						<Image
							src="/images/he.webp"
							className="w-full h-full m-auto"
							alt="she"
							width="640"
							height="1511"
						/>
					</div>
					<div className="text-[12px] md:text-[16px] md:w-1/2 m-auto w-full text-justify">
						Ayushman Bharat Digital Mission (ABDM) aims to develop the backbone
						necessary to support the integrated digital health infrastructure of
						the country. It will bridge the existing gap amongst different
						stakeholders of healthcare ecosystem through digital highways. ABHA
						(Ayushman Bharat Health Account), created as part of ABDM number is
						a 14-digit number that will uniquely identify you as a participant
						in India’s digital healthcare ecosystem. ABHA number will establish
						a strong and trustable identity for you that will be accepted by
						healthcare providers across the country. It also helps you to link
						all healthcare benefits ranging from public health programmes to
						insurance schemes to your unique ABHA number and avoid long lines
						for registration at HFR registered healthcare facilities across the
						country. If you haven’t already, you can generate your ABHA number
						directly from the government website using the link below.
					</div>
				</div>
				<div className="text-center my-10">
					<a
						href="https://abha.abdm.gov.in/abha/v3/register"
						target="__blank"
						className="bg-[#6D4AFF] p-4 text-white rounded-[30px]"
					>
						Register Now
					</a>
				</div>
			</div>
			<div id="resources2" className="bg-white text-black py-10 px-16">
				<div className=" flex flex-col flex-nowrap sm:py-[40px] md:flex-row rounded-[30px] justify-center items-center ">
					<div className="text-[12px] md:text-[16px] md:w-1/2 m-auto w-full text-justify">
						<div className="text-left text-2xl sm:text-[48px] font-semibold py-4 sm:py-7">
							Health Guides
						</div>
						At Medibank we are not only working on improving healthcare
						co-ordination in India, but also want to educate people about
						healthy lifestyle options, tips and precautions that can be taken to
						avoid falling sick in the first place. This section of ours is a
						knowledge base of articles curated from various sources like
						Doctors, medical journals, research papers and other trustworthy
						sites that can help users to prevent a lot of common problems and
						lead a healthy lifestyle. Kindly note that this is only a place of
						general advice and knowledge as each individual situation is
						different and for specific individual needs, please consult a
						doctor.
					</div>
					<div className="md:w-[400px] w-[100%] m-auto mt-[20px] relative">
						<Image
							src="/images/healthResources.png"
							className="w-full h-full m-auto"
							alt="she"
							width="640"
							height="1511"
						/>

						<a href="/health-guides">
							<div className="absolute bottom-0 right-0 ">
								<Image
									src="/images/healthResourcesBtn.png"
									className=""
									alt="she"
									width="112"
									height="50"
								/>
							</div>
						</a>
					</div>
				</div>
				{/* <div className='text-center my-14'>
            <a href='https://abha.abdm.gov.in/abha/v3/register' target='__blank' className='bg-blue-400 p-4 text-white rounded'>Register Now</a>
        </div> */}
			</div>
			<div id="resources3">
				<Blogsection />
			</div>
			<div id="resources4" className="bg-white text-black py-10 px-16">
				<div className=" flex flex-col-reverse flex-nowrap sm:py-[40px] md:flex-row rounded-[30px] justify-center items-center ">
					<div className="text-[12px] md:text-[16px] md:w-1/2 m-auto w-full text-justify">
						<div className="text-left text-2xl sm:text-[48px] font-semibold  py-4 sm:py-7">
							Privacy Policy
						</div>
						We understand the sensitive nature of health data and peoples
						concern around the safety of their personal data and health records.
						That’s why, we are developing MediBank on HL7 FHIR standards so it
						is designed to be flexible, adaptable and can be used in a wide
						range of settings with different health care information systems.
						This done in combination with an AES-256bit encryption which is
						currently the strongest and commonly used encryption method. We have
						also put in place multi factor authentication protocols to ensure no
						health record or data is accessed without user permission. Our
						privacy policy clearly explains all that a user needs to know about
						what information we collect, how we store it, use it and share it
						with. Please click below to read more about it.
						<div className="md:text-left sm:text-center mt-7">
							<a
								href="/privacy-policy"
								className="bg-[#6D4AFF] text-white rounded-[20px] p-3"
							>
								Read More
							</a>
						</div>
					</div>
					<div className="md:w-[600px] w-[200px] m-auto">
						<Image
							src="/images/privacy.png"
							className="w-full h-full m-auto"
							alt="she"
							width="640"
							height="1511"
						/>
					</div>
				</div>
			</div>
		</div>
	);
}
