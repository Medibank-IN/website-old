import React from "react";
import Guides from "@/components/Blocks/Guides";
import Breadcrumb from "@/components/Breadcrumb";
export default function page() {
	const data = [
		{
			id: 1,
			imgurl: "/images/healthguides/Heart-health.png",
			title: "Heart Health",
			desc: "Heart disease is a leading cause of death now a days for both men and women. Heart-healthy living involves understanding your risk, making healthy choices, and taking steps to reduce your chances of getting heart disease. Triglycerides, a type of blood fat, are crucial for heart health, with their levels indicating potential risks for heart disease. A triglyceride blood test measures these levels to guide health decisions. High triglyceride levels can result from excess calorie intake and are influenced by factors like obesity, genetics, and diabetes. Regular monitoring and a balanced lifestyle, including a low-carb diet, exercise, and weight control, are key to managing triglyceride levels and maintaining heart health.",
		},
		{
			id: 2,
			imgurl: "/images/healthguides/Cholesterol.png",
			title: "Cholesterol",
			desc: "Cholesterol, a waxy substance found in your blood, is essential for building healthy cells. However, high levels of cholesterol can increase the risk of heart disease by contributing to the buildup of plaque in the arteries, leading to atherosclerosis. To manage cholesterol levels, it's important to maintain a healthy diet low in saturated and trans fats, exercise regularly, and avoid smoking. Regular cholesterol screenings are also crucial, as high cholesterol typically does not cause symptoms and can only be detected through a blood test. By taking these precautions, individuals can significantly reduce their risk of heart-related health issues.",
		},
		{
			id: 3,
			imgurl: "/images/healthguides/Liver-Health.png",
			title: "Liver Health",
			desc: "The liver, a vital organ located under the rib cage on the right side of the abdomen, plays a crucial role in maintaining our overall health. It is responsible for essential functions such as detoxifying harmful substances, aiding digestion, and regulating blood sugar levels. To promote liver health, it's important to engage in healthy lifestyle choices like regular exercise, a balanced diet rich in fruits and vegetables, and avoiding excessive alcohol consumption. Early detection and treatment of liver issues are key, as symptoms may not always be apparent. Incorporating liver-friendly foods such as coffee, green tea, and grapefruit can also support liver function. Maintaining liver health is integral to ensuring the body's metabolic processes run smoothly.",
		},
		{
			id: 4,
			imgurl: "/images/healthguides/Kidneys.png",
			title: "Kidney Health",
			desc: "Maintaining kidney health is crucial for the body's ability to filter waste and regulate blood pressure, among other vital functions. Staying well-hydrated, eating a diet low in sodium, and avoiding excessive protein intake can help maintain kidney function. It's also important to stay hydrated and avoid smoking, as well as to be cautious with the use of over-the-counter medications and supplements that may harm the kidneys. For those at risk, regular testing can help catch any potential issues early, allowing for timely intervention and treatment. Improving kidney health involves a combination of lifestyle changes and medical management. It's advisable to limit the use of NSAIDs like ibuprofen, which can affect kidney health. Lastly, annual check-ups with a healthcare provider can monitor kidney function and prevent potential issues. Always consult with a healthcare professional before making any significant changes to your health regimen.",
		},
		{
			id: 5,
			imgurl: "/images/healthguides/Women-health.png",
			title: "Women Health",
			desc: "Women's health encompasses a broad range of issues, reflecting the complexity of their physiological and psychological needs throughout different stages of life. From reproductive health and maternal care to managing chronic diseases and maintaining mental well-being, women's health is a vital aspect of public health policy and personal healthcare. It's essential to promote awareness and education on topics such as the importance of regular check-ups, balanced nutrition, and physical activity, as well as understanding the unique symptoms and risks associated with conditions like heart disease and breast cancer. Empowering women with knowledge and access to healthcare services can lead to better health outcomes and a higher quality of life.",
		},
		{
			id: 6,
			imgurl: "/images/healthguides/Childrens-Health.png",
			title: "Children’s Health and Nutrition",
			desc: "A balanced and nutritious diet is crucial for a child's development and long-term health. Adequate intake of essential vitamins and minerals not only contributes to a child's physical well-being but also supports a healthy weight and fosters a positive relationship with food. This proactive approach to nutrition can significantly decrease the risk of chronic diseases such as heart disease, diabetes, osteoporosis, and certain cancers later in life. Childhood obesity poses a significant risk not just on a child’s physical health but also on their emotional well-being. Self-esteem and body image are often intertwined with weight, affecting mental health and social interactions. Overweight children may struggle with physical activities and face social challenges, such as exclusion and bullying, which can lead to low self-esteem. Therefore, addressing weight issues through a combination of physical activity and healthy eating is essential for both the physical and emotional health of children. Having regular family meals, serving a variety of healthy food and snacks, being a role model by changing ourselves to healthy eating and involving kids in the process of grocery shopping or meal preparation are some strategies to encourage smart eating habits.",
		},
		{
			id: 7,
			imgurl: "/images/healthguides/Health-Fitness.png",
			title: "Health & Fitness",
			desc: "When combined with good nutrition, physical activity helps improve overall health and fitness. People who are physically active tend to live longer, maintain a healthy weight, and are at reduced risk for many chronic diseases including heart disease, stroke, type 2 diabetes, depression, and some cancers. Regular physical activity is vital for maintaining a good standard of health that helps to control weight, reduce risk of type 2 diabetes, improve mental health, improve sleep and improve bone density and muscle strength which in turn increases longevity or life expectancy. Physical activity can include moderate activities like walking, housework, playground play and leisure cycling or vigorous activities like jogging, hiking, swimming, fast cycling, team sports and lifting weights. For any type of activity to benefit health, individuals need to be moving quick enough to raise their heart rate, breathe faster and feel warmer.",
		},
		{
			id: 8,
			imgurl: "/images/healthguides/Health-screening.png",
			title: "Health Screening & Preventive Care",
			desc: "Health screenings are critical preventive measures that consist of various tests and examinations to detect potential diseases or conditions in individuals who may not show symptoms. These screenings can lead to early treatment and better health outcomes. Factors such as age, sex, family history, and risk factors determine the necessity for screening. Screenings can identify conditions like high blood pressure, cholesterol issues, diabetes, thyroid disorders, and some cancers. A Blood Sugar Screening (A1C test) can help diagnose prediabetes, type 1 and type 2 diabetes and a cholesterol screening (Lipid panel or Lipid profile) is a blood test which measures the levels of cholesterol and triglycerides in blood. High cholesterol is a risk factor for heart disease, however, there are generally no symptoms of high cholesterol so regular screening is important for diagnosis and treatment. Men are advised to begin cholesterol screening from 35+, while women are advised from 45+ and both should be screened at an earlier age if they have a family history of heart disease or diabetes.",
		},
		{
			id: 9,
			imgurl: "/images/healthguides/Screening-tests.png",
			title: "Common Screening Tests",
			desc: "<ul><li>Blood Sugar Screening (A1C test) – Used to diagnose prediabetes, type 1 and type 2 diabetes.</li><li>Cholesterol Screening (Lipid panel or Lipid profile) – Measures the levels of cholesterol and triglycerides in blood.</li><li>Blood Pressure Test – Determines if an individual has hypertension (high blood pressure) or hypotension (low blood pressure).</li><li>Thyroid Function Test – Measures how well your thyroid gland is working.</li><li>Liver Function Tests – Help determine the health of the liver by measuring the levels of proteins, liver enzymes, and bilirubin in blood.</li><li>Blood and Urine Tests – Can identify kidney problems.</li><li>Electrocardiography (ECG or EKG) – Measures the heart's electrical activity, allowing a doctor to check for cardiac arrhythmias and palpitations or any other heart issues.</li><li>Exercise Electrocardiogram (Stress Test) – Assesses heart function during physical activity.</li><li>Echocardiogram (Echo) – Uses ultrasound to visualize the heart and check for structural problems.</li><li>Pap Smear – A screening procedure for cervical cancer in women.</li><li>Prostate Screening – Used to detect undiagnosed prostate cancer in men.</li><li>Mammograms – Used as a screening tool, on a routine basis, to detect breast cancer in women at an early stage.</li></ul>",
		},
	];
	const breadcrumbItems = [
		{ label: "Home", href: "/" },
		{ label: "Resources", href: "/resources" },
		{ label: "Health Guides", href: "/health-guides" },
	];
	return (
		<div className="bg-red-100">
			<div className="mt-[100px] md:w-4/5 m-auto container px-0 w-11/12 py-16">
				<Breadcrumb items={breadcrumbItems} />
				{data.map((item, index) => {
					return (
						<Guides
							key={index}
							title={item.title}
							desc={item.desc}
							index={item.id}
							img={item.imgurl}
						/>
					);
				})}
			</div>
		</div>
	);
}
