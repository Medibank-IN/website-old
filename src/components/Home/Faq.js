import React from "react";
import Accordion from "@/components/Blocks/Accordion";

const data = [
	// Same FAQ data as provided
	{
		ques: "What is Medibank?",
		ans: "Medibank is India's first cloud based Electronic Health Records (EHR) platform with centralised digital health records accessible by both users through an app and doctors via a cloud based web portal.",
	},
	{
		ques: "What is EHR?",
		ans: "A digital version of a patient's medical history that's designed to be shared across multiple healthcare providers and organisations. EHRs can include information from multiple practices, providers, and locations.",
	},
	{
		ques: "What’s the difference between EMR & EHR?",
		ans: "The main difference between an Electronic Medical Record (EMR) and an Electronic Health Record (EHR) is that an EMR is limited to a single practice, while an EHR can be used across multiple practices and healthcare organizations.",
	},
	{
		ques: "Is my data secure?",
		ans: "The short answer is Yes. Medibank is designed based on HL7 FHIR standards combined with AES-256bit encryption, the current strongest and commonly used encryption, for it to be flexible, adaptable and can be used in a wide range of settings with different health care information systems.",
	},
	{
		ques: "Who can access my data?",
		ans: "Primarily, your data can only be accessed by healthcare providers such as Doctors and Hospitals. However, Medibank is designed in a way where a user will get a notification asking permission for access to such data on every instance with exceptions of emergencies.",
	},
	{
		ques: "Is Medibank free to use?",
		ans: "Users can register on Medibank and create their account for free. However, to use the full functionality and take advantage of the system, users have to pay a low-cost subscription fee",
	},
	{
		ques: "What is the cost to use the app?",
		ans: "We want Medibank to be accessible to everyone without a huge financial impact. The exact pricing is still under review, but rest assured we will keep it as low as possible mainly to cover the costs associated with the upkeep and maintenance of such a huge system.",
	},
	{
		ques: "How long is the data stored?",
		ans: "Data on Medibank is stored indefinitely, however access is only available with an active membership. If at any point users don’t want to continue using the app, they will have access to download their data.",
	},
	{
		ques: "What happens to my data if I stop using the app?",
		ans: "We will notify users, well in advance, when their membership is up for renewal. If a user decides to discontinue their membership, they will have 60 days to download their data. A buffer time of further 30 days can be provided at request after which the data will be removed from our systems.",
	},
];

const Faq = () => {
	const [showAllQuestions, setShowAllQuestions] = React.useState(false);
	return (
		<div className="bg-white py-16">
			<div className="container mx-auto">
				<h2
					style={{
						fontSize: "50px",
						fontWeight: "400",
						lineHeight: "63px",
						textAlign: "center",
						textUnderlinePosition: "from-font",
						textDecorationSkipInk: "none",
					}}
				>
					Frequently Asked Questions
				</h2>

				<div className="md:w-3/4 mx-auto">
					{data
						.slice(0, showAllQuestions ? data.length : 5)
						.map((item, index) => (
							<Accordion
								key={index}
								index={index}
								ques={item.ques}
								ans={item.ans}
							/>
						))}

					{data.length > 5 && (
						<button
							onClick={() => setShowAllQuestions(!showAllQuestions)}
							className="text-blue-500 font-semibold text-sm"
						>
							{showAllQuestions ? "Show less" : "Show more"}
						</button>
					)}
				</div>
			</div>
		</div>
	);
};

export default Faq;
