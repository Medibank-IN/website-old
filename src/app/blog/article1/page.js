import React from "react";
import Breadcrumb from "@/components/Breadcrumb";

export default function page() {
	const breadcrumbItems = [
		{ label: "Home", href: "/" },
		{ label: "Blog", href: "/blog" },
		{ label: "Article 1", href: "/blog/article1" },
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
					Need of the Hour: India Needs to Implement a Nationwide Framework for
					the Adoption of EHRs
				</h1>
				<p className="mt-1 text-sm">
					April 30, 2023, 4:18 PM IST / Vikram Thaploo in Voices, India, TOI
				</p>
			</header>

			<main className="md:p-6 max-w-4xl mx-auto">
				<section className="mb-6">
					<p className="text-lg mb-4">
						As a developing nation, India has the second-largest population in
						the world with an ever-growing requirement for high-quality
						healthcare. One of the main goals of the government is to digitalise
						healthcare in order to make sure that everyone has access to
						treatment at an affordable cost. India’s ambitions to digitise its
						healthcare system and advance towards universal health coverage
						(UHC) are fundamentally based on electronic health records (EHR).
						India is gradually beginning to realise the advantages of EHR
						systems in terms of better patient coordination, higher patient
						participation, improved medical research, and lower healthcare
						costs.
					</p>
					<p className="text-lg mb-4">
						With the launch of the Pradhan Mantri Jan Arogya Yojana (PM-JAY),
						which aims to provide INR 5,00,000 cover to the bottom 40% of the
						population for secondary and tertiary care and the establishment of
						approximately 1,50,000 health and wellness centres across the
						country for primary care, particularly in rural areas, healthcare
						data is being regularly collected for the said beneficiaries and
						there is a mandate from the government to digitise these records and
						take further steps towards implementing EHR systems. To create a
						nationwide digital health record system, several national-level
						policies are being developed, such as the National Digital Health
						Blueprint (2019). However, the status of EHR adoption is not
						aggressively tracked and several new steps need to be taken up for
						the successful adoption of EHR in India.
					</p>
				</section>

				<section className="mb-6">
					<h2 className="text-xl font-semibold mb-2">
						Status of EHR Adoption in India
					</h2>
					<p className="mb-4">
						In India, the adoption of EMR has grown in popularity during the
						past ten years. While the majority of private hospitals use an EMR
						system, public hospitals in rural and isolated areas struggle to
						gain access to the internet and still keep paper records. According
						to a study published by the Biomedical Journal of Scientific and
						Technical Research in 2021 involving 13 private hospitals and 2
						government-run hospitals, only 8 out of the 13 hospitals were using
						the EMR system to record clinical data. They used this information
						for analysis, quality control, and to pinpoint areas in hospitals
						that needed improvement. The health information systems (HIS) in the
						other 5 EMR systems were utilised for billing and inventory control.
						EMRs improve the tracking of patient data. EMRs, however, are not
						intended to be shared outside of a specific practice, making it
						challenging to share EMRs with other medical facilities including
						labs, pharmacies, and specialists.
					</p>
				</section>

				<section className="mb-6">
					<h2 className="text-xl font-semibold mb-2">
						Roadmap for the Adoption of EHR in India
					</h2>
					<div className="space-y-4">
						<div>
							<h3 className="text-lg font-semibold mb-1">
								Basic ICT Infrastructure
							</h3>
							<p>
								Most public hospitals and dispensaries lack adequate ICT
								infrastructure. Only a few major public hospitals have
								connectivity and computers. The country has a sizable number of
								public healthcare facilities, necessitating a substantial
								investment in technology and software. Using open-source
								software platforms, mobile devices, and the cloud computing
								environment are required to cut costs. Every town will have
								broadband connectivity after the National Optical Fibre Network
								(NOFN) is put into place. When connectivity is available, remote
								villages can benefit from cloud-based healthcare delivery.
							</p>
						</div>

						<div>
							<h3 className="text-lg font-semibold mb-1">
								More Funding by the Government and Private Sector
							</h3>
							<p>
								The government plans to increase public health spending from 1.5
								per cent of GDP in 2017 to 2.5 per cent of GDP by 2025, in
								accordance with the National Health Policy of 2017. The aim of
								2.5 per cent should be aggressively pursued, with a focused
								budget allocation towards digitisation, along with attracting
								additional investment through favourable regulations and
								incentives. The price of educating medical staff about EHR
								systems, regulations, and standards should also be included.
								Clear goals should be set for fully digitalising district-level
								hospitals and primary care facilities.
							</p>
						</div>

						<div>
							<h3 className="text-lg font-semibold mb-1">
								Health Information Storage and Exchange Infrastructure
							</h3>
							<p>
								It is necessary for healthcare providers to exchange EHR. Using
								a master patient index, a health information exchange (HIE)
								locates patient data at other institutions, gathers the data for
								the patient, and documents the transaction for later audit. In
								order to respect the patient’s privacy needs, HIE is also in
								charge of authenticating the individual accessing the
								information. These exchanges must be set up and kept up by the
								government working with the private sector.
							</p>
						</div>

						<div>
							<h3 className="text-lg font-semibold mb-1">
								Personal Health Record System
							</h3>
							<p>
								The Personal Health Record System (PHR) can have a big impact on
								how EHR is adopted. PHR encourages the use of EHR since it saves
								the clinician from having to create the patient record from
								scratch. Basic data can be obtained immediately from the PHR,
								including demographics, immunisation information, known
								allergies, medical history, and family medical history, test
								results, etc. The availability of PHRs, on the other hand, will
								allow patients to approach hospitals they have never been to
								before without having to worry about the interoperability
								problem.
							</p>
						</div>

						<div>
							<h3 className="text-lg font-semibold mb-1">
								Enforce Minimum Viable Standards
							</h3>
							<p>
								In order to address the growing concerns about EHR Standards,
								the MoHFW established the National Electronic Health Authority
								(NeHA) in 2015 and created the Digital Information Security in
								Healthcare Act (DISHA) in 2017. Nevertheless, these requirements
								were not followed, and many issues were voiced by the
								stakeholders. So that patient records are easily “accessible,
								discoverable, and comprehensible,” the MoHFW should designate
								suitable global EHR standards, such as the Fast Healthcare
								Interoperability Resources (FHIR) standards, in accordance with
								international best practices to ensure secure interoperability.
							</p>
						</div>

						<div>
							<h3 className="text-lg font-semibold mb-1">
								Protection of Privacy
							</h3>
							<p>
								Rules are necessary to increase patient and provider confidence
								when utilising e-health applications. Patients must be reassured
								that the privacy of their medical information will not be
								violated. Also, healthcare professionals need to be certain that
								the information they record won’t be changed without their
								knowledge. A role-based access system is required because there
								are many people participating in the treatment process.
							</p>
						</div>
					</div>
				</section>

				<section className="mt-6 border-t border-gray-300 pt-6">
					<h2 className="text-xl font-semibold mb-4">Final Say</h2>
					<p>
						The government and the healthcare sector in India are aware of the
						numerous advantages of installing EHR systems. As a result, they are
						dedicated to widely implementing these systems. As of now, only the
						private health sector has adopted such methods. A concerted effort
						from all the stakeholders, including the Central Government, State
						Governments, healthcare providers, medical associations, the IT
						industry, etc., is required to increase the use of EHR. India can
						adapt EHR to suit its needs by studying international best practices
						for its implementation. The government should encourage PPPs both in
						service as well as platform provider space to bridge the gap and
						have a fully digitised healthcare system sooner.
					</p>
				</section>
			</main>
		</div>
	);
}
