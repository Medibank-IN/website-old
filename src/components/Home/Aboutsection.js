"use client";

import Image from "next/image";
import { useState } from "react";

export default function ChemistryAtWorkSection() {
	// State to control the "Read More" functionality
	const [isExpanded, setIsExpanded] = useState(false);

	return (
		<div className="bg-[#EEEAFF] rounded-[30px] md:w-4/5 m-auto container flex flex-col md:flex-row py-8 sm:py-16 justify-center items-center">
			{/* Text Section */}
			<div className="text-black md:w-1/2 w-full text-justify pb-8 sm:pb-0">
				<h1 className="text-3xl font-bold my-4">
					Why <span className="text-[#6D4AFF]">Medibank ?</span>
				</h1>
				<div
					className={`text-gray-700 mb-6 overflow-hidden transition-[max-height] duration-300 ease-in-out md:max-h-none ${
						isExpanded ? "max-h-[1000px]" : "max-h-[160px]"
					}`}
					aria-expanded={isExpanded}
				>
					In India, the patient-doctor relationship faces a significant
					challenge. Patients are burdened with the task of maintaining and
					presenting their extensive paper-based medical records. The loss or
					misplacement of these records often leads to a fragmented
					understanding of a patient&apos;s medical history. This not only puts
					a strain on doctors but also compromises the quality of care,
					resulting in potential health risks. Introducing MediBank,{" "}
					<span className="text-[#6D4AFF]">
						India&apos;s first cloud based Electronic Health Records (EHR)
						platform with centralised digital health records accessible by both
						patients and doctors.
					</span>{" "}
					MediBank offers a comprehensive, secure, and user-friendly Electronic
					Health Record (EHR) platform which eliminates the hassle of paper
					prescriptions and the risk of lost information. By centralizing &
					digitising health records and utilising the inbuilt AI-driven health
					charts, we aim to streamline healthcare coordination and enable early
					detection of potential health issues, thereby advancing preventive
					care in India.
				</div>
				{/* "Read More" button visible only on mobile screens */}
				<div className="block md:hidden">
					<button
						className="text-[#6D4AFF] font-semibold underline"
						onClick={() => setIsExpanded(!isExpanded)}
					>
						{isExpanded ? "Read Less" : "Read More"}
					</button>
				</div>
			</div>

			{/* Image Section */}
			<div className="md:w-1/2 w-full md:px-10 m-auto">
				<div className="relative">
					<Image
						src="/images/doctorNew.png"
						className="rounded-lg"
						alt="About MediBank section"
						width={640}
						height={480}
					/>
				</div>
			</div>
		</div>
	);
}
