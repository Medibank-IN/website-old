import { GoogleSpreadsheet } from "google-spreadsheet";
import { JWT } from "google-auth-library";

const SHEET_TITLE = "User  Data (Beta Access)";
const HEADER_VALUES = ["firstName", "lastName", "mobile", "email", "timestamp"];

async function initializeSheet(doc) {
	const sheet = await doc.addSheet({ headerValues: HEADER_VALUES });
	await doc.updateProperties({ title: SHEET_TITLE });
	return sheet;
}

async function addUserDataToSheet(sheet, userData) {
	await sheet.addRow(userData);
}

export const addUserData = async (data) => {
	const MAX_RETRIES = 5;
	const BASE_DELAY = 1000;

	const { firstName, lastName, mobile, email } = data;

	const serviceAccountAuth = new JWT({
		email: process.env.GOOGLE_CLIENT_EMAIL,
		key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
		scopes: ["https://www.googleapis.com/auth/spreadsheets"],
	});

	const doc = new GoogleSpreadsheet(
		process.env.GOOGLE_SHEET_ID,
		serviceAccountAuth
	);

	await doc.loadInfo();

	let sheet = doc.sheetsByIndex[0];

	if (!sheet) {
		sheet = await initializeSheet(doc);
	} else {
		let headers = [];
		let shouldSetHeaders = false;
		try {
			await sheet.loadHeaderRow();
			headers = sheet.headerValues;
		} catch (error) {
			if (error?.message?.includes("No values in the header row")) {
				shouldSetHeaders = true;
			} else {
				throw error;
			}
		}
		if (
			shouldSetHeaders ||
			!headers ||
			headers.length === 0 ||
			!HEADER_VALUES.every((header) => headers.includes(header))
		) {
			await sheet.setHeaderRow(HEADER_VALUES);
		}
	}

	const userData = {
		firstName,
		lastName,
		mobile,
		email,
		timestamp: new Date().toISOString(),
	};

	for (let attempt = 0; attempt < MAX_RETRIES; attempt += 1) {
		try {
			await addUserDataToSheet(sheet, userData);
			return {
				success: true,
				message: "User  data added successfully",
				data: userData,
			};
		} catch (error) {
			if (error.response && error.response.status === 429) {
				const waitTime = BASE_DELAY * Math.pow(2, attempt);
				console.log(`Rate limit exceeded. Retrying in ${waitTime} ms...`);
				await new Promise((resolve) => setTimeout(resolve, waitTime));
			} else {
				console.error("Error adding user data to sheet:", error);
				throw new Error("Failed to add user data to the sheet.");
			}
		}
	}

	throw new Error("Max retries exceeded");
};
