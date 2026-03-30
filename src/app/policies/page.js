"use client";

import { useMemo, useState } from "react";

const policyContent = {
	terms: `TERMS & CONDITIONS
Last Updated: 30-03-2026

1. INTRODUCTION
These Terms & Conditions ("Terms") govern access and use of the website www.medibank.in, mobile application, and doctor portal (collectively, the "Platform") operated by:
Sushrut Healthtech Pvt Ltd (CIN - U86900TS2025PTC198558)
Registered under the Registrar of Companies, Hyderabad, Telangana, India
Operating under the trade name MediBank
By accessing or using the Platform, you agree to be legally bound by these Terms.

2. NATURE OF SERVICES
MediBank provides:
- A digital health records platform for users to upload, store, manage, and share medical records
- A doctor portal for healthcare professionals to access records (with user consent)
- AI-enabled tools for organizing and analyzing health records
Important Disclaimer:
MediBank does NOT provide medical advice, diagnosis, or treatment. All information is for informational and record-keeping purposes only.

3. ELIGIBILITY
You must:
- Be at least 18 years old (or use under guardian supervision)
- Provide accurate and complete information
- Have legal capacity to enter into binding contracts

4. USER ACCOUNTS
You agree to:
- Maintain confidentiality of login credentials
- Be responsible for all activities under your account
- Notify us immediately of unauthorized access
We reserve the right to suspend or terminate accounts for misuse.

5. USER DATA & HEALTH RECORDS
- Users retain ownership of their health data
- By uploading data, you grant MediBank a limited license to store, process, and display data, and enable sharing as per your instructions
You are responsible for ensuring:
- Accuracy of uploaded data
- Legal rights to upload and share such data

6. CONSENT-BASED DATA SHARING
- Health records are shared only with explicit user consent
- Users can revoke access at any time
- MediBank is not responsible for misuse once data is shared with third parties

7. DOCTOR PORTAL TERMS
Doctors agree to:
- Access data only with valid patient consent
- Use data solely for professional purposes
- Maintain confidentiality and comply with applicable medical laws

8. AI & ANALYTICS DISCLAIMER
- AI tools are provided for assistance only
- Outputs may not always be accurate
- Should not be relied upon for medical decisions

9. THIRD-PARTY SERVICES & APIs
The Platform integrates third-party services including but not limited to cloud storage providers, AI/ML platforms, Google APIs, and payment gateway providers.
MediBank:
- Is not responsible for third-party service failures
- Does not control third-party privacy practices
- Requires users to comply with third-party terms where applicable

10. PAYMENTS & SUBSCRIPTIONS
- Certain features may require payment
- Payments are processed via third-party payment gateways
- MediBank does not store full financial details
Refunds are governed by our Refund Policy and subject to payment partner rules.

11. INTELLECTUAL PROPERTY
All Platform content, including software, branding, design, and algorithms, are owned by Sushrut Healthtech Pvt Ltd.
Users may not copy, distribute, or reverse engineer the Platform.

12. PROHIBITED USES
You agree not to:
- Upload false or illegal data
- Violate privacy rights
- Attempt to hack or disrupt the Platform
- Use data for unauthorized commercial purposes

13. LIMITATION OF LIABILITY
MediBank shall not be liable for:
- Medical decisions made based on platform data
- Data loss due to external breaches beyond reasonable control
- Third-party service failures
- Indirect or consequential damages

14. INDEMNITY
You agree to indemnify MediBank against:
- Claims arising from misuse of the Platform
- Violation of laws or third-party rights

15. TERMINATION
We may suspend or terminate access:
- For breach of Terms
- Legal or regulatory requirements
- Security concerns

16. GOVERNING LAW & JURISDICTION
- Governed by laws of India
- Jurisdiction: Courts of Hyderabad, Telangana

17. GRIEVANCE OFFICER (IT ACT COMPLIANCE)
As per Indian law:
Grievance Officer Name: Srilatha Vangaveti
Email: complaints@medibank.in
Response Timeline: Within 15 days`,
	privacy: `PRIVACY POLICY
Last Updated: [Insert Date]

1. INTRODUCTION
This Privacy Policy explains how MediBank collects, uses, and protects personal and sensitive personal data in compliance with:
- Digital Personal Data Protection Act, 2023 (DPDP Act)
- IT Act, 2000 & SPDI Rules

2. DATA WE COLLECT
A. Personal Data
- Name, phone number, email
- Date of birth, gender

B. Sensitive Personal Data (Health Data)
- Medical records
- Prescriptions
- Lab reports
- Health history

C. Technical Data
- IP address
- Device information
- Usage logs

D. Financial Data
- Payment transaction metadata (processed via third parties)

3. PURPOSE OF DATA PROCESSING
We process data for:
- Providing core services
- Record storage and retrieval
- Enabling sharing with doctors
- Improving platform functionality
- Legal compliance

4. CONSENT (DPDP COMPLIANCE)
- Data is processed only with your explicit consent
- Consent can be withdrawn at any time
- Withdrawal may limit service functionality

5. DATA SHARING
We may share data with:
- Doctors (with user consent)
- Third-party service providers (cloud, AI, analytics)
- Payment gateway providers
- Government authorities (if legally required)
We do not sell personal data.

6. THIRD-PARTY APIs
We use APIs such as:
- Google APIs
- AI/ML service providers
- Payment gateway APIs
These providers may process data under their own privacy policies.

7. DATA STORAGE & SECURITY
We implement:
- Encryption (at rest & in transit)
- Access control mechanisms
- Secure cloud infrastructure
However, no system is 100% secure.

8. DATA RETENTION
- Data is retained as long as necessary for service delivery
- Users may request deletion (subject to legal obligations)

9. USER RIGHTS (UNDER DPDP ACT)
You have the right to:
- Access your data
- Correct inaccuracies
- Request deletion
- Withdraw consent
- Nominate a representative
Requests can be made via contact details below.

10. CHILDREN'S DATA
- We do not knowingly collect data from minors without parental consent

11. CROSS-BORDER DATA TRANSFER
- Data may be stored or processed outside India
- Only in jurisdictions permitted under Indian law

12. COOKIES POLICY
We use cookies to:
- Improve user experience
- Analyze traffic
Users can manage cookies via browser settings.

13. DATA BREACH NOTIFICATION
In case of a breach:
- Users will be notified as required by law
- Authorities will be informed where applicable

14. GRIEVANCE REDRESSAL
Grievance Officer Name: Srilatha Vangaveti
Email: complaints@medibank.in
Response Timeline: Within 15 days

15. CHANGES TO POLICY
We may update this policy periodically. Continued use implies acceptance.`,
	refund: `REFUND & CANCELLATION POLICY
MediBank (Sushrut Healthtech Pvt Ltd)
Last Updated: [Insert Date]

1. Introduction
This Refund & Cancellation Policy ("Policy") governs payments made by users on the MediBank platform, operated by Sushrut Healthtech Pvt Ltd (CIN: U86900TS2025PTC198558), having its registered office at WeWork - Raheja Mindspace, 13th Floor, Building 9, Survey No. 64, Madhapur, Hyderabad, Telangana 500081.
By purchasing any subscription or service on MediBank, you agree to this Policy.

2. Nature of Services
MediBank provides digital health record storage, management, and sharing services, along with related technology features.
Payments made on the platform are for access to these technology services and not for medical advice or treatment.

3. Subscription Plans
- All subscriptions (if applicable) are billed in advance.
- Subscription details, pricing, and features will be displayed clearly at the time of purchase.
- Users are responsible for reviewing plan details before making a payment.

4. Cancellation Policy
- Users may cancel their subscription at any time through their account settings or by contacting support.
- Upon cancellation:
  - Access to paid features will continue until the end of the current billing cycle.
  - No further charges will be applied for subsequent billing cycles.

5. Refund Policy
5.1 General Rule
All payments made on MediBank are non-refundable, except in the cases explicitly mentioned below.

5.2 Eligible Refund Scenarios
Refunds may be issued in the following cases:
- Duplicate payment made due to technical error
- Payment deducted but service not activated
- Failed transaction where money is debited but not credited to MediBank
- Unauthorized transaction (subject to verification)

5.3 Non-Refundable Scenarios
Refunds will NOT be provided in the following cases:
- Partial use of subscription period
- Change of mind after purchase
- Lack of usage of the platform
- Dissatisfaction with features where services have been delivered as described
- Any misuse or violation of Terms & Conditions

6. Refund Process
- Users must raise a refund request by emailing complaints@medibank.in
- The request must include:
  - Registered email/phone number
  - Transaction details
  - Reason for refund
MediBank reserves the right to request additional information for verification.

7. Refund Timeline
- Approved refunds will be processed within 7-10 business days
- The amount will be credited to the original payment method
- Timelines may vary depending on the payment provider or bank

8. Payment Gateway Disclaimer
- Payments on MediBank are processed through secure third-party payment gateway providers
- MediBank does not store complete financial or card details
- Any payment disputes may also be subject to the policies of the respective payment provider

9. Modifications to Policy
MediBank reserves the right to modify this Policy at any time. Changes will be effective upon posting on the website.

10. Contact Details
For any queries or refund requests:
Grievance Officer: Srilatha Vangaveti
Email: complaints@medibank.in
Response Time: Within 15 days`,
};

const tabs = [
	{ key: "privacy", label: "Privacy Policy" },
	{ key: "terms", label: "Terms and Conditions" },
	{ key: "refund", label: "Refund and Cancellation" },
];

export default function PoliciesPage() {
	const [activeTab, setActiveTab] = useState("privacy");

	const activeContent = useMemo(() => policyContent[activeTab], [activeTab]);

	return (
		<div className="mt-[100px] pb-12 px-4">
			<div className="md:w-4/5 w-full m-auto md:container">
				<h1 className="text-3xl font-bold mb-6">Policies</h1>
				<div className="flex flex-wrap gap-2 mb-6">
					{tabs.map((tab) => (
						<button
							key={tab.key}
							type="button"
							onClick={() => setActiveTab(tab.key)}
							className={`px-4 py-2 rounded-md border text-sm md:text-base transition-colors ${
								activeTab === tab.key
									? "bg-[#2A8C8A] text-white border-[#2A8C8A]"
									: "bg-white text-[#2A8C8A] border-[#2A8C8A]"
							}`}
						>
							{tab.label}
						</button>
					))}
				</div>

				<div className="border rounded-lg p-4 md:p-6 bg-white shadow-sm">
					<pre className="whitespace-pre-wrap text-sm md:text-base leading-7 font-sans">
						{activeContent}
					</pre>
				</div>
			</div>
		</div>
	);
}
