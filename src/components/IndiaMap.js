"use client";
import React, { useState } from "react";
import Image from "next/image";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import SignupPopup from "./ui/SignupPopup";

const INDIA_TOPO_JSON = require("../components/Map/india.topo.json");

const PROJECTION_CONFIG = {
	scale: 1720,
	center: [82.9629, 22.5937],
};

const geographyStyle = {
	default: {
		outline: "none",
		fill: "#464646",
	},
	hover: {
		fill: "#d9d9d9",
		transition: "all 250ms",
		outline: "none",
	},
	pressed: {
		fill: "#d9d9d9",
		transition: "all 250ms",
		outline: "none",
	},
};

const getHeatMapData = () => [
	{
		id: "AP",
		state: "Andhra Pradesh",
		value: {
			Doctors: {
				"General Physician": 30,
				Cardiologist: 20,
				Dermatologist: 15,
				Dentist: 10,
			},
			Labs: {
				Pathology: 40,
				Radiology: 30,
				Biochemistry: 25,
				Microbiology: 25,
			},
			Hospitals: {
				Government: 10,
				Private: 10,
				Multispecialty: 3,
				"Children's": 2,
			},
		},
	},
	{
		id: "JK",
		state: "Jammu and Kashmir",
		value: {
			Doctors: {
				"General Physician": 30,
				Cardiologist: 20,
				Dermatologist: 15,
				Dentist: 10,
			},
			Labs: {
				Pathology: 40,
				Radiology: 30,
				Biochemistry: 25,
				Microbiology: 25,
			},
			Hospitals: {
				Government: 10,
				Private: 10,
				Multispecialty: 3,
				"Children's": 2,
			},
		},
	},
	{
		id: "CT",
		state: "Chhattisgarh",
		value: {
		  Doctors: { "General Physician": 5, Cardiologist: 3, Dermatologist: 1, Dentist: 1 },
		  Labs: { Pathology: 5, Radiology: 4, Biochemistry: 3, Microbiology: 3 },
		  Hospitals: { Government: 2, Private: 1, Multispecialty: 0, "Children's": 0 },
		},
	  },
	  {
		id: "OD",
		state: "Odisha",
		value: {
		  Doctors: { "General Physician": 5, Cardiologist: 3, Dermatologist: 1, Dentist: 1 },
		  Labs: { Pathology: 5, Radiology: 4, Biochemistry: 3, Microbiology: 3 },
		  Hospitals: { Government: 2, Private: 1, Multispecialty: 0, "Children's": 0 },
		},
	  },
	  {
		id: "TS",
		state: "Telangana",
		value: {
		  Doctors: { "General Physician": 5, Cardiologist: 3, Dermatologist: 1, Dentist: 1 },
		  Labs: { Pathology: 5, Radiology: 4, Biochemistry: 3, Microbiology: 3 },
		  Hospitals: { Government: 2, Private: 1, Multispecialty: 0, "Children's": 0 },
		},
	  },
	{
	  id: "AS",
	  state: "Assam",
	  value: {
		Doctors: { "General Physician": 25, Cardiologist: 15, Dermatologist: 10, Dentist: 10 },
		Labs: { Pathology: 25, Radiology: 20, Biochemistry: 15, Microbiology: 10 },
		Hospitals: { Government: 10, Private: 5, Multispecialty: 2, "Children's": 1 },
	  },
	},
	{
		id: "AS",
		state: "Assam",
		value: {
			Doctors: {
				"General Physician": 25,
				Cardiologist: 15,
				Dermatologist: 10,
				Dentist: 10,
			},
			Labs: {
				Pathology: 25,
				Radiology: 20,
				Biochemistry: 15,
				Microbiology: 10,
			},
			Hospitals: {
				Government: 10,
				Private: 5,
				Multispecialty: 2,
				"Children's": 1,
			},
		},
	},
	{
		id: "BR",
		state: "Bihar",
		value: {
			Doctors: {
				"General Physician": 20,
				Cardiologist: 10,
				Dermatologist: 8,
				Dentist: 7,
			},
			Labs: { Pathology: 30, Radiology: 20, Biochemistry: 10, Microbiology: 5 },
			Hospitals: {
				Government: 8,
				Private: 3,
				Multispecialty: 1,
				"Children's": 0,
			},
		},
	},
	{
		id: "CG",
		state: "Chhattisgarh",
		value: {
			Doctors: {
				"General Physician": 18,
				Cardiologist: 10,
				Dermatologist: 7,
				Dentist: 5,
			},
			Labs: {
				Pathology: 20,
				Radiology: 15,
				Biochemistry: 10,
				Microbiology: 10,
			},
			Hospitals: {
				Government: 5,
				Private: 4,
				Multispecialty: 1,
				"Children's": 0,
			},
		},
	},
	{
		id: "GA",
		state: "Goa",
		value: {
			Doctors: {
				"General Physician": 10,
				Cardiologist: 5,
				Dermatologist: 5,
				Dentist: 5,
			},
			Labs: { Pathology: 10, Radiology: 8, Biochemistry: 7, Microbiology: 5 },
			Hospitals: {
				Government: 3,
				Private: 2,
				Multispecialty: 1,
				"Children's": 1,
			},
		},
	},
	{
		id: "GJ",
		state: "Gujarat",
		value: {
			Doctors: {
				"General Physician": 40,
				Cardiologist: 25,
				Dermatologist: 20,
				Dentist: 15,
				"ENT Specialist": 87,
				Ophthalmologist: 2,
				Gynaecologist: 23,
			},
			Labs: {
				Pathology: 60,
				Radiology: 50,
				Biochemistry: 40,
				Microbiology: 30,
			},
			Hospitals: {
				Government: 20,
				Private: 10,
				Multispecialty: 5,
				"Children's": 3,
			},
		},
	},
	{
		id: "HR",
		state: "Haryana",
		value: {
			Doctors: {
				"General Physician": 30,
				Cardiologist: 20,
				Dermatologist: 10,
				Dentist: 10,
			},
			Labs: {
				Pathology: 30,
				Radiology: 25,
				Biochemistry: 20,
				Microbiology: 15,
			},
			Hospitals: {
				Government: 10,
				Private: 7,
				Multispecialty: 2,
				"Children's": 1,
			},
		},
	},
	{
		id: "HP",
		state: "Himachal Pradesh",
		value: {
			Doctors: {
				"General Physician": 15,
				Cardiologist: 8,
				Dermatologist: 5,
				Dentist: 2,
			},
			Labs: { Pathology: 20, Radiology: 15, Biochemistry: 10, Microbiology: 5 },
			Hospitals: {
				Government: 5,
				Private: 3,
				Multispecialty: 1,
				"Children's": 1,
			},
		},
	},
	{
		id: "JH",
		state: "Jharkhand",
		value: {
			Doctors: {
				"General Physician": 18,
				Cardiologist: 10,
				Dermatologist: 5,
				Dentist: 2,
			},
			Labs: {
				Pathology: 20,
				Radiology: 15,
				Biochemistry: 10,
				Microbiology: 10,
			},
			Hospitals: {
				Government: 10,
				Private: 3,
				Multispecialty: 1,
				"Children's": 1,
			},
		},
	},
	{
		id: "KA",
		state: "Karnataka",
		value: {
			Doctors: {
				"General Physician": 30,
				Cardiologist: 20,
				Dermatologist: 15,
				Dentist: 12,
			},
			Labs: {
				Pathology: 50,
				Radiology: 40,
				Biochemistry: 30,
				Microbiology: 20,
			},
			Hospitals: {
				Government: 10,
				Private: 10,
				Multispecialty: 5,
				"Children's": 2,
			},
		},
	},
	{
		id: "KL",
		state: "Kerala",
		value: {
			Doctors: {
				"General Physician": 40,
				Cardiologist: 25,
				Dermatologist: 20,
				Dentist: 15,
			},
			Labs: {
				Pathology: 60,
				Radiology: 50,
				Biochemistry: 40,
				Microbiology: 30,
			},
			Hospitals: {
				Government: 15,
				Private: 10,
				Multispecialty: 5,
				"Children's": 3,
			},
		},
	},
	{
		id: "MP",
		state: "Madhya Pradesh",
		value: {
			Doctors: {
				"General Physician": 40,
				Cardiologist: 25,
				Dermatologist: 20,
				Dentist: 15,
			},
			Labs: {
				Pathology: 60,
				Radiology: 50,
				Biochemistry: 40,
				Microbiology: 30,
			},
			Hospitals: {
				Government: 15,
				Private: 10,
				Multispecialty: 5,
				"Children's": 3,
			},
		},
	},
	{
		id: "MH",
		state: "Maharashtra",
		value: {
			Doctors: {
				"General Physician": 40,
				Cardiologist: 25,
				Dermatologist: 20,
				Dentist: 15,
				"ENT Specialist": 87,
				Ophthalmologist: 2,
				Gynaecologist: 23,
			},
			Labs: {
				Pathology: 80,
				Radiology: 70,
				Biochemistry: 60,
				Microbiology: 50,
			},
			Hospitals: {
				Government: 30,
				Private: 20,
				Multispecialty: 10,
				"Children's": 5,
			},
		},
	},
	{
		id: "MN",
		state: "Manipur",
		value: {
			Doctors: {
				"General Physician": 40,
				Cardiologist: 25,
				Dermatologist: 20,
				Dentist: 15,
				"ENT Specialist": 87,
				Ophthalmologist: 2,
				Gynaecologist: 23,
			},
			Labs: {
				Pathology: 80,
				Radiology: 70,
				Biochemistry: 60,
				Microbiology: 50,
			},
			Hospitals: {
				Government: 30,
				Private: 20,
				Multispecialty: 10,
				"Children's": 5,
			},
		},
	},
	{
		id: "ML",
		state: "Meghalaya",
		value: {
			Doctors: {
				"General Physician": 40,
				Cardiologist: 25,
				Dermatologist: 20,
				Dentist: 15,
				"ENT Specialist": 87,
				Ophthalmologist: 2,
				Gynaecologist: 23,
			},
			Labs: {
				Pathology: 80,
				Radiology: 70,
				Biochemistry: 60,
				Microbiology: 50,
			},
			Hospitals: {
				Government: 30,
				Private: 20,
				Multispecialty: 10,
				"Children's": 5,
			},
		},
	},
	{
		id: "MZ",
		state: "Mizoram",
		value: {
			Doctors: {
				"General Physician": 40,
				Cardiologist: 25,
				Dermatologist: 20,
				Dentist: 15,
				"ENT Specialist": 87,
				Ophthalmologist: 2,
				Gynaecologist: 23,
			},
			Labs: {
				Pathology: 100,
				Radiology: 80,
				Biochemistry: 60,
				Microbiology: 50,
			},
			Hospitals: {
				Government: 25,
				Private: 15,
				Multispecialty: 10,
				"Children's": 5,
			},
		},
	},
	{
		id: "NL",
		state: "Nagaland",
		value: {
			Doctors: {
				"General Physician": 40,
				Cardiologist: 25,
				Dermatologist: 20,
				Dentist: 15,
				"ENT Specialist": 87,
				Ophthalmologist: 2,
				Gynaecologist: 23,
			},
			Labs: {
				Pathology: 100,
				Radiology: 80,
				Biochemistry: 60,
				Microbiology: 50,
			},
			Hospitals: {
				Government: 25,
				Private: 15,
				Multispecialty: 10,
				"Children's": 5,
			},
		},
	},
	{
		id: "OR",
		state: "Odisha",
		value: {
			Doctors: {
				"General Physician": 40,
				Cardiologist: 25,
				Dermatologist: 20,
				Dentist: 15,
				"ENT Specialist": 87,
				Ophthalmologist: 2,
				Gynaecologist: 23,
			},
			Labs: {
				Pathology: 100,
				Radiology: 80,
				Biochemistry: 60,
				Microbiology: 50,
			},
			Hospitals: {
				Government: 25,
				Private: 15,
				Multispecialty: 10,
				"Children's": 5,
			},
		},
	},
	{
		id: "PB",
		state: "Punjab",
		value: {
			Doctors: {
				"General Physician": 40,
				Cardiologist: 25,
				Dermatologist: 20,
				Dentist: 15,
				"ENT Specialist": 87,
				Ophthalmologist: 2,
				Gynaecologist: 23,
			},
			Labs: {
				Pathology: 100,
				Radiology: 80,
				Biochemistry: 60,
				Microbiology: 50,
			},
			Hospitals: {
				Government: 25,
				Private: 15,
				Multispecialty: 10,
				"Children's": 5,
			},
		},
	},
	{
		id: "RJ",
		state: "Rajasthan",
		value: {
			Doctors: {
				"General Physician": 40,
				Cardiologist: 25,
				Dermatologist: 20,
				Dentist: 15,
				"ENT Specialist": 87,
				Ophthalmologist: 2,
				Gynaecologist: 23,
			},
			Labs: {
				Pathology: 100,
				Radiology: 80,
				Biochemistry: 60,
				Microbiology: 50,
			},
			Hospitals: {
				Government: 25,
				Private: 15,
				Multispecialty: 10,
				"Children's": 5,
			},
		},
	},
	{
		id: "SK",
		state: "Sikkim",
		value: {
			Doctors: {
				"General Physician": 40,
				Cardiologist: 25,
				Dermatologist: 20,
				Dentist: 15,
				"ENT Specialist": 87,
				Ophthalmologist: 2,
				Gynaecologist: 23,
			},
			Labs: {
				Pathology: 100,
				Radiology: 80,
				Biochemistry: 60,
				Microbiology: 50,
			},
			Hospitals: {
				Government: 25,
				Private: 15,
				Multispecialty: 10,
				"Children's": 5,
			},
		},
	},
	{
		id: "TN",
		state: "Tamil Nadu",
		value: {
			Doctors: {
				"General Physician": 40,
				Cardiologist: 25,
				Dermatologist: 20,
				Dentist: 15,
				"ENT Specialist": 87,
				Ophthalmologist: 2,
				Gynaecologist: 23,
			},
			Labs: {
				Pathology: 100,
				Radiology: 80,
				Biochemistry: 60,
				Microbiology: 50,
			},
			Hospitals: {
				Government: 25,
				Private: 15,
				Multispecialty: 10,
				"Children's": 5,
			},
		},
	},
	{
		id: "TR",
		state: "Tripura",
		value: {
			Doctors: {
				"General Physician": 40,
				Cardiologist: 25,
				Dermatologist: 20,
				Dentist: 15,
				"ENT Specialist": 87,
				Ophthalmologist: 2,
				Gynaecologist: 23,
			},
			Labs: {
				Pathology: 100,
				Radiology: 80,
				Biochemistry: 60,
				Microbiology: 50,
			},
			Hospitals: {
				Government: 25,
				Private: 15,
				Multispecialty: 10,
				"Children's": 5,
			},
		},
	},
	{
		id: "UP",
		state: "Uttar Pradesh",
		value: {
			Doctors: {
				"General Physician": 40,
				Cardiologist: 25,
				Dermatologist: 20,
				Dentist: 15,
				"ENT Specialist": 87,
				Ophthalmologist: 2,
				Gynaecologist: 23,
			},
			Labs: {
				Pathology: 100,
				Radiology: 80,
				Biochemistry: 60,
				Microbiology: 50,
			},
			Hospitals: {
				Government: 25,
				Private: 15,
				Multispecialty: 10,
				"Children's": 5,
			},
		},
	},
	{
		id: "UT",
		state: "Uttarakhand",
		value: {
			Doctors: {
				"General Physician": 40,
				Cardiologist: 25,
				Dermatologist: 20,
				Dentist: 15,
				"ENT Specialist": 87,
				Ophthalmologist: 2,
				Gynaecologist: 23,
			},
			Labs: {
				Pathology: 100,
				Radiology: 80,
				Biochemistry: 60,
				Microbiology: 50,
			},
			Hospitals: {
				Government: 25,
				Private: 15,
				Multispecialty: 10,
				"Children's": 5,
			},
		},
	},
	{
		id: "WB",
		state: "West Bengal",
		value: {
			Doctors: {
				"General Physician": 40,
				Cardiologist: 25,
				Dermatologist: 20,
				Dentist: 15,
				"ENT Specialist": 87,
				Ophthalmologist: 2,
				Gynaecologist: 23,
			},
			Labs: {
				Pathology: 100,
				Radiology: 80,
				Biochemistry: 60,
				Microbiology: 50,
			},
			Hospitals: {
				Government: 25,
				Private: 15,
				Multispecialty: 10,
				"Children's": 5,
			},
		},
	},
	{
		id: "DL",
		state: "Delhi",
		value: {
			Doctors: {
				"General Physician": 40,
				Cardiologist: 25,
				Dermatologist: 20,
				Dentist: 15,
				"ENT Specialist": 87,
				Ophthalmologist: 2,
				Gynaecologist: 23,
			},
			Labs: {
				Pathology: 100,
				Radiology: 80,
				Biochemistry: 60,
				Microbiology: 50,
			},
			Hospitals: {
				Government: 25,
				Private: 15,
				Multispecialty: 10,
				"Children's": 5,
			},
		},
	},
	{
		id: "JK",
		state: "Jammu and Kashmir",
		value: {
			Doctors: {
				"General Physician": 40,
				Cardiologist: 25,
				Dermatologist: 20,
				Dentist: 15,
				"ENT Specialist": 87,
				Ophthalmologist: 2,
				Gynaecologist: 23,
			},
			Labs: {
				Pathology: 100,
				Radiology: 80,
				Biochemistry: 60,
				Microbiology: 50,
			},
			Hospitals: {
				Government: 25,
				Private: 15,
				Multispecialty: 10,
				"Children's": 5,
			},
		},
	},
	{
		id: "LD",
		state: "Lakshadweep",
		value: {
			Doctors: {
				"General Physician": 40,
				Cardiologist: 25,
				Dermatologist: 20,
				Dentist: 15,
				"ENT Specialist": 87,
				Ophthalmologist: 2,
				Gynaecologist: 23,
			},
			Labs: {
				Pathology: 100,
				Radiology: 80,
				Biochemistry: 60,
				Microbiology: 50,
			},
			Hospitals: {
				Government: 25,
				Private: 15,
				Multispecialty: 10,
				"Children's": 5,
			},
		},
	},
	{
		id: "PY",
		state: "Puducherry",
		value: {
			Doctors: {
				"General Physician": 40,
				Cardiologist: 25,
				Dermatologist: 20,
				Dentist: 15,
				"ENT Specialist": 87,
				Ophthalmologist: 2,
				Gynaecologist: 23,
			},
			Labs: {
				Pathology: 100,
				Radiology: 80,
				Biochemistry: 60,
				Microbiology: 50,
			},
			Hospitals: {
				Government: 25,
				Private: 15,
				Multispecialty: 10,
				"Children's": 5,
			},
		},
	},
	{
		id: "AN",
		state: "Andaman & Nicobar",
		value: {
			Doctors: {
				"General Physician": 35,
				Cardiologist: 25,
				Dermatologist: 20,
				Dentist: 15,
				"ENT Specialist": 87,
				Ophthalmologist: 2,
				Gynaecologist: 23,
			},
			Labs: {
				Pathology: 100,
				Radiology: 80,
				Biochemistry: 60,
				Microbiology: 50,
			},
			Hospitals: {
				Government: 25,
				Private: 15,
				Multispecialty: 10,
				"Children's": 5,
			},
		},
	},
	{
		id: "CH",
		state: "Chandigarh",
		value: {
			Doctors: {
				"General Physician": 40,
				Cardiologist: 25,
				Dermatologist: 20,
				Dentist: 15,
				"ENT Specialist": 87,
				Ophthalmologist: 2,
				Gynaecologist: 23,
			},
			Labs: {
				Pathology: 100,
				Radiology: 80,
				Biochemistry: 60,
				Microbiology: 50,
			},
			Hospitals: {
				Government: 25,
				Private: 15,
				Multispecialty: 10,
				"Children's": 5,
			},
		},
	  },
	  {
		id: "UK",
		state: "Uttrakhand",
		value: {
		  Doctors: { "General Physician": 40, Cardiologist: 25, Dermatologist: 20, Dentist: 15,  "ENT Specialist": 87, Ophthalmologist: 2, Gynaecologist: 23 },
		  Labs: { Pathology: 100, Radiology: 80, Biochemistry: 60, Microbiology: 50 },
		  Hospitals: { Government: 25, Private: 15, Multispecialty: 10, "Children's": 5 },
		},
	  },
	  {
		id: "DN",
		state: "Dadra & Nagar Haveli and Daman & Diu",
		value: {
			Doctors: {
				"General Physician": 40,
				Cardiologist: 25,
				Dermatologist: 20,
				Dentist: 15,
				"ENT Specialist": 87,
				Ophthalmologist: 2,
				Gynaecologist: 23,
			},
			Labs: {
				Pathology: 100,
				Radiology: 80,
				Biochemistry: 60,
				Microbiology: 50,
			},
			Hospitals: {
				Government: 25,
				Private: 15,
				Multispecialty: 10,
				"Children's": 5,
			},
		},
	},
	{
		id: "OD",
		state: "Odisha",
		value: {
			Doctors: {
				"General Physician": 40,
				Cardiologist: 25,
				Dermatologist: 20,
				Dentist: 15,
				"ENT Specialist": 87,
				Ophthalmologist: 2,
				Gynaecologist: 23,
			},
			Labs: {
				Pathology: 100,
				Radiology: 80,
				Biochemistry: 60,
				Microbiology: 50,
			},
			Hospitals: {
				Government: 25,
				Private: 15,
				Multispecialty: 10,
				"Children's": 5,
			},
		},
	},
	{
		id: "CT",
		state: "Chhattisgarh",
		value: {
			Doctors: {
				"General Physician": 40,
				Cardiologist: 25,
				Dermatologist: 20,
				Dentist: 15,
				"ENT Specialist": 87,
				Ophthalmologist: 2,
				Gynaecologist: 23,
			},
			Labs: {
				Pathology: 100,
				Radiology: 80,
				Biochemistry: 60,
				Microbiology: 50,
			},
			Hospitals: {
				Government: 25,
				Private: 15,
				Multispecialty: 10,
				"Children's": 5,
			},
		},
	},
	{
		id: "UK",
		state: "Uttarakhand",
		value: {
			Doctors: {
				"General Physician": 40,
				Cardiologist: 25,
				Dermatologist: 20,
				Dentist: 15,
				"ENT Specialist": 87,
				Ophthalmologist: 2,
				Gynaecologist: 23,
			},
			Labs: {
				Pathology: 100,
				Radiology: 80,
				Biochemistry: 60,
				Microbiology: 50,
			},
			Hospitals: {
				Government: 25,
				Private: 15,
				Multispecialty: 10,
				"Children's": 5,
			},
		},
	},
	{
		id: "TS",
		state: "Telangana",
		value: {
			Doctors: {
				"General Physician": 40,
				Cardiologist: 25,
				Dermatologist: 20,
				Dentist: 15,
				"ENT Specialist": 87,
				Ophthalmologist: 2,
				Gynaecologist: 23,
			},
			Labs: {
				Pathology: 100,
				Radiology: 80,
				Biochemistry: 60,
				Microbiology: 50,
			},
			Hospitals: {
				Government: 25,
				Private: 15,
				Multispecialty: 10,
				"Children's": 5,
			},
		},
	},
];

const App = () => {
	const [data] = useState(getHeatMapData());
	const [activeTab, setActiveTab] = useState("Doctors");
	const [activeState, setActiveState] = useState(data[0]);
	const [currentPage, setCurrentPage] = useState(1);
	const [showAllSubcategories, setShowAllSubcategories] = useState({
		Doctors: false,
		Labs: false,
		Hospitals: false,
	}); // Modified to separate state for each tab

	const [isOpenModel, setIsOpenModel] = useState(false);

	const cardsPerPage = 12;
	const subcategories = activeState?.value[activeTab] || {};
	const subcategoryEntries = Object.entries(subcategories);
	const totalCards = Object.values(subcategories).reduce(
		(sum, count) => sum + count,
		0
	);
	const totalPages = Math.ceil(totalCards / cardsPerPage);
	const startIndex = (currentPage - 1) * cardsPerPage;
	const endIndex = startIndex + cardsPerPage;

	const handleStateClick = (geo) => {
		console.log("geo", geo);
		const current = data.find((state) => state.id === geo.id);
		if (current) {
			setActiveState(current);
			setCurrentPage(1);
			setShowAllSubcategories({
				Doctors: false,
				Labs: false,
				Hospitals: false,
			}); // Reset subcategories state for all tabs
		}
	};

	const handlePrevPage = () => {
		if (currentPage > 1) setCurrentPage((prev) => prev - 1);
	};

	const handleNextPage = () => {
		if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
	};

	const toggleShowAllSubcategories = (tab) => {
		setShowAllSubcategories((prev) => ({
			...prev,
			[tab]: !prev[tab], // Toggle only the selected tab
		}));
	};

	const getIconForCategory = (tab) => {
		if (tab === "Doctors") return "/images/plus.png";
		if (tab === "Labs") return "/images/microscope.png";
		if (tab === "Hospitals") return "/images/hospital.png";
		return "/images/default-icon.png";
	};

	return (
		<>
			<div className="bg-gray-100 mt-[90px] min-h-screen flex flex-col justify-between">
				<div className="py-6">
					<div className="container mx-auto text-center">
						<h1 className="text-4xl font-bold text-black">Our Partners</h1>
					</div>
				</div>

				<div className="container mx-auto">
					{/* Tabs for Doctors, Labs, Hospitals */}
					<div className="flex justify-between items-center mb-4">
						<div className="flex space-x-8">
							{["Doctors", "Labs", "Hospitals"].map((tab) => (
								<button
									key={tab}
									onClick={() => setActiveTab(tab)}
									className={`py-2 px-4 font-semibold ${
										activeTab === tab
											? "text-blue-500 border-b-2 border-blue-500"
											: "text-gray-500"
									}`}
								>
									{tab}
								</button>
							))}
						</div>
					</div>

					<hr className="border-gray-300 mb-6" />

					{/* Subcategories Section */}
					<div className="flex flex-wrap sm:flex-nowrap text-center gap-4 bg-gray-100 py-3 rounded-md mb-6 shadow relative">
						{subcategoryEntries
							.slice(
								0,
								showAllSubcategories[activeTab] ? subcategoryEntries.length : 3
							)
							.map(([category, count], index) => (
								<p
									key={index}
									className="flex sm:items-center flex-col text-sm font-semibold text-gray-600"
								>
									<span>{category}</span>
									<span>
										(<span className="text-blue-500">{count}</span>)
									</span>
								</p>
							))}
						{subcategoryEntries.length > 4 && (
							<button
								className="text-blue-500 font-semibold text-sm"
								onClick={() => toggleShowAllSubcategories(activeTab)}
							>
								{showAllSubcategories[activeTab] ? "Show Less" : "See More"}
							</button>
						)}
					</div>

					{/* Cards Section */}
					<div className="flex flex-col-reverse md:flex-row gap-4 md:gap-8">
						<div className="md:w-4/5 w-full md:mb-8 mx-auto">
							<div className="grid grid-cols-2 lg:grid-cols-3 grid-rows-4 gap-2 lg:gap-6 relative">
								<div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 backdrop-blur-sm w-full h-full flex items-center justify-center">
									<span
										className="text-white font-semibold bg-blue-500 locked-partners mx-auto my-auto rounded-lg p-2 cursor-pointer flex gap-1 items-center justify-center"
										onClick={() => setIsOpenModel(true)}
									>
										Join the Beta Waitlist
										<Image
											src="/images/lock.png"
											width={500}
											height={500}
											alt="India Map"
											className="w-6 h-6"
										/>
									</span>
								</div>

								{Object.entries(subcategories)
									.flatMap(([category, count]) =>
										Array(count)
											.fill(0)
											.map((_, index) => ({ category, index }))
									)
									.slice(startIndex, endIndex)
									.map(({ category, index }) => (
										<div
											key={`${category}-${index}`}
											className="bg-white shadow-md rounded-lg p-4 flex items-center gap-2"
										>
											<div className="w-30 h-30 rounded-full flex items-center justify-center ">
												<Image
													src={getIconForCategory(activeTab)}
													alt={`${category} Icon`}
													className="text-center"
													width="60"
													height="60"
													loading="lazy"
												/>
											</div>
											<div className="flex flex-col w-full">
												<div className="text-left">
													<p className="font-bold text-sm">{`${category}  #${
														index + 1
													}`}</p>
													<p className="text-xs text-gray-500">
														Details for {activeTab.toLowerCase()}
													</p>
												</div>
												<div className="mt-2 flex gap-2">
													<button className="bg-blue-500 text-white text-xs px-3 py-1 rounded">
														Book
													</button>
													<button className="bg-gray-200 text-gray-600 text-xs px-3 py-1 rounded">
														Location
													</button>
												</div>
											</div>
										</div>
									))}
							</div>

							{/* Pagination */}
							<div className="my-12 flex justify-center items-center space-x-2">
								<button
									onClick={handlePrevPage}
									disabled={currentPage === 1}
									className={`px-4 py-2 rounded-full ${
										currentPage === 1
											? "bg-gray-300 text-gray-500"
											: "bg-blue-500 text-white"
									}`}
								>
									&lt;
								</button>
								<div className="flex space-x-2 w-max overflow-x-auto">
									{/* First Page */}
									<button
										onClick={() => setCurrentPage(1)}
										className={`px-4 py-2 rounded-full ${
											currentPage === 1
												? "bg-blue-500 text-white"
												: "bg-gray-200 text-gray-700"
										}`}
									>
										1
									</button>

									{/* Dots before current page if needed */}
									{currentPage > 3 && (
										<span className="px-2 py-1 text-gray-500">...</span>
									)}

									{/* Current page and its neighbors */}
									{Array.from({ length: totalPages }, (_, i) => i + 1)
										.filter(
											(page) =>
												page !== 1 &&
												page !== totalPages && // Exclude first and last pages
												(page === currentPage ||
													page === currentPage - 1 ||
													page === currentPage + 1)
										)
										.map((page) => (
											<button
												key={page}
												onClick={() => setCurrentPage(page)}
												className={`px-4 py-2 rounded-full ${
													currentPage === page
														? "bg-blue-500 text-white"
														: "bg-gray-200 text-gray-700"
												}`}
											>
												{page}
											</button>
										))}

									{/* Dots after current page if needed */}
									{currentPage < totalPages - 2 && (
										<span className="px-2 py-1 text-gray-500">...</span>
									)}

									{/* Last Page */}
									{totalPages > 1 && (
										<button
											onClick={() => setCurrentPage(totalPages)}
											className={`px-4 py-2 rounded-full ${
												currentPage === totalPages
													? "bg-blue-500 text-white"
													: "bg-gray-200 text-gray-700"
											}`}
										>
											{totalPages}
										</button>
									)}
								</div>
								<button
									onClick={handleNextPage}
									disabled={currentPage === totalPages}
									className={`px-4 py-2 rounded-full ${
										currentPage === totalPages
											? "bg-gray-300 text-gray-500"
											: "bg-blue-500 text-white"
									}`}
								>
									&gt;
								</button>
							</div>
						</div>

						{/* Map Section */}
						<div className="md:w-3/5 relative w-full h-max bg-white shadow rounded-lg p-4 mb-2 md:mb-10 lg:mx-auto">
							{/* Active State Name */}
							<div className="text-center absolute top-[100px] right-[50px] mb-4">
								<h2 className="text-2xl font-semibold bg-gradient-to-r from-indigo-500 to-blue-500 bg-clip-text text-transparent">
									{activeState?.state
										? `${activeState.state}`
										: "Select a State"}
								</h2>
							</div>
							<ComposableMap
								projectionConfig={PROJECTION_CONFIG}
								projection="geoMercator"
								width={900}
								height={950}
							>
								<Geographies geography={INDIA_TOPO_JSON}>
									{({ geographies }) =>
										geographies.map((geo) => {
											const current = data.find((state) => state.id === geo.id);
											return (
												<Geography
													key={geo.rsmKey}
													geography={geo}
													style={geographyStyle}
													onClick={() => handleStateClick(geo)}
													className="cursor-pointer"
												/>
											);
										})
									}
								</Geographies>
							</ComposableMap>
						</div>
					</div>
				</div>
			</div>

			<SignupPopup isOpen={isOpenModel} setIsOpen={setIsOpenModel} />
		</>
	);
};

export default App;
