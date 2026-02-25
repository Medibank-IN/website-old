import React from "react";
import Breadcrumb from "@/components/Breadcrumb";
export default function page() {
	const breadcrumbItems = [
		{ label: "Home", href: "/" },
		{ label: "Blog", href: "/blog" },
		{ label: "Article 2", href: "/blog/article2" },
	];
	return (
		<div className="bg-gray-100 text-gray-800 mt-[100px] container md:w-4/5 w-full my-16">
			<a href="/blog">
				<div className="md:hidden fixed top-[105px] left-[2px] p-2 rounded-[50%] bg-black text-white text-[16px] font-bold w-8 h-8 flex justify-center items-center">
					&lt;-
				</div>
			</a>
			<Breadcrumb items={breadcrumbItems} />
			<header className="bg-blue-500 text-white p-4">
				<h1 className="text-2xl font-bold">
					Digitalisation of Healthcare Data through Electronic Health Records
					Will Be the Next Startup Boom
				</h1>
				<p className="mt-1 text-sm">
					Ayush Jain is CEO, Mindbowser, ET CONTRIBUTORS
				</p>
			</header>

			<main className="md:p-6 max-w-4xl mx-auto">
				<section className="mb-6">
					<p className="text-lg mb-4">
						In much the same way India&apos;s digital banking revolution brought
						formal banking within the reach of anyone with a smartphone, a
						similar revolution is waiting to happen with digitalisation of
						healthcare with an even grander promise - making better-quality
						healthcare more affordable and accessible to all. And like the way
						the digital banking and payments revolution spawned a fintech
						industry, digitalisation of healthcare is set to open opportunities
						for a new breed of startups in a mega health tech boom.
					</p>
					<p className="text-lg mb-4">
						India&apos;s fintech industry - which comprises over 10,000
						companies with $17 billion in 2022 revenues - was built on the
						foundation of Aadhaar and UPI. The health tech industry boom will be
						built upon the nationwide adoption of electronic health records
						(EHR).
					</p>
				</section>

				<section className="mb-6">
					<h2 className="text-xl font-semibold mb-2">What is EHR?</h2>
					<p className="mb-4">
						EHR is a digital file containing an individual&apos;s health
						information - identity, gender, age, weight, vital signs, allergens,
						entire medical and medication history, immunisation status, test
						results, etc. The record is meant to be created and regularly
						updated by physicians and other healthcare providers. While earlier
						digital medical records were created mainly for in-house use of a
						clinic or hospital, modern EHRs are shareable among healthcare
						providers. EHRs have several benefits:
					</p>
					<ul className="list-disc pl-5 mb-4">
						<li>
							<strong>Easy tracking:</strong> Ease of accessing medical history,
							including lab test results, leads to faster and more accurate
							clinical decision-making, with reduced risk of medication errors,
							resulting in better outcomes for the patients.
						</li>
						<li>
							<strong>Key insights:</strong> EHRs of a group or community, or
							even an entire population, pack in enough data to give valuable
							insights into population-level health dynamics, making new drug
							research, development and testing faster and cost-efficient.
						</li>
					</ul>
				</section>

				<section className="mb-6">
					<h2 className="text-xl font-semibold mb-2">Global Adoption of EHR</h2>
					<p className="mb-4">
						This is the reason why the US, Europe and many other countries have
						pushed for nationwide adoption of EHR. As of 2021, 96% of US
						hospitals and 78% of US physicians had adopted EHR. In Europe, 96%
						of GPs use EHR. Australia&apos;s nationwide EHR system, My Health
						Record, covers 23.7 million, or nearly 90% of its population, as of
						January 2024.
					</p>
					<p className="mb-4">
						Under the Ayushman Bharat Digital Mission, India has employed an
						incentive system like the US to encourage EHR adoption. However,
						there is a long way to go. Less than 1,700 hospitals, clinics or
						diagnostic labs have signed up for the incentive scheme. An
						overwhelming majority of hospitals or clinics rely on paper-based
						documentation. Still, creating over 34 crore individual Ayushman
						Bharat Health Accounts (ABHAs) linked with health records is a good
						start for a nationwide EHR system.
					</p>
				</section>

				<section className="mb-6">
					<h2 className="text-xl font-semibold mb-2">
						Opportunities for Startups
					</h2>
					<p className="mb-4">
						With more EHRs, the availability of rich individual- and
						population-level health data would offer entrepreneurs a chance to
						build applications, starting with making data entry and retrieval
						easier for healthcare providers. For doctors pressed for time and
						not tech-savvy, applications that make light work of using EHR will
						emerge as a vast category. Effective visualisation through charts,
						graphs or animations could help a busy GP draw necessary conclusions
						and make accurate decisions.
					</p>
					<p className="mb-4">
						Natural language processing (NLP) algorithms can even parse medical
						narratives to extract pertinent information, such as diagnoses,
						medications, and treatment plans, streamlining documentation
						processes and enhancing data accuracy and usability.
					</p>
					<p className="mb-4">
						Advanced applications could harness advanced analytics and use AI to
						derive meaningful insights from EHR data. These insights, from
						disease prediction to personalised treatment plans, open limitless
						opportunities for new ventures. Imagine personal health-tracking
						apps that track an individual&apos;s vitals over time, compare this
						data with those of lakhs of others, and alert them when they need
						preventive check-ups.
					</p>
				</section>

				<section className="mb-6">
					<h2 className="text-xl font-semibold mb-2">
						AI and Wearables Integration
					</h2>
					<p className="mb-4">
						Adding AI layers on top of EHR data allows the creation of more
						powerful healthcare applications. AI-powered clinical
						decision-making software can assist a GP in much faster diagnosis
						and prognosis, and help them create more personalised treatment
						recommendations.
					</p>
					<p className="mb-4">
						When combined with wearable trackers, AI-powered tools working on a
						patient&apos;s EHR can enable real-time, bespoke diagnostics,
						improving diagnostic precision and subsequent treatment. Integrating
						wearables and EHRs is one of the hottest trends in the US today.
					</p>
				</section>

				<section className="mb-6">
					<h2 className="text-xl font-semibold mb-2">Rural Reach-Out</h2>
					<p className="mb-4">
						Other applications built on population-level health data can
						identify at-risk patient populations and predict disease onset or
						progression. Existing AI models can analyse historical health data
						to stratify patients based on their likelihood of developing certain
						conditions, enabling healthcare providers to implement proactive
						preventive interventions and improve population health outcomes.
					</p>
					<p className="mb-4">
						Next-gen telemedicine platforms integrated with EHRs can
						significantly improve remote diagnostics, consultations, and
						monitoring of patients, particularly in underserved rural areas.
						When specialised tests like endoscopy are shifted to primary care
						settings, specialists can manage the patient remotely, saving time
						and money. At an advanced level, AI-powered remote monitoring
						solutions could analyse patient-generated health data from wearables
						and Internet of Things (IoT) devices, alerting healthcare providers
						to potential health issues and enabling timely interventions.
					</p>
				</section>

				<section className="mt-6 border-t border-gray-300 pt-6">
					<h2 className="text-xl font-semibold mb-4">Final Thoughts</h2>
					<p>
						These are a glimpse into the possibilities the impending EHR age
						opens up for entrepreneurial ventures. Those looking for the next
						big thing in startups will find in this imminent health tech boom an
						opportunity to positively impact the health and well-being of crores
						of Indians.
					</p>
				</section>
			</main>
		</div>
	);
}
