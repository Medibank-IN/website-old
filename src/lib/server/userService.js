import { GoogleSpreadsheet } from "google-spreadsheet";
import { JWT } from "google-auth-library";

const SHEET_TITLE = "User Data (Beta Access)";
const HEADER_VALUES = [
  "registrationId",
  "fullName",
  "dob",
  "gender",
  "mobile",
  "email",
  "state",
  "city",
  "referralCode",
  "paymentStatus",
  "paymentReference",
  "mid",
  "createdAt",
  "updatedAt",
];

const STATE_CODE_MAP = {
  "Andhra Pradesh": "51",
  "Arunachal Pradesh": "79",
  Assam: "78",
  Bihar: "80",
  Chhattisgarh: "49",
  Goa: "40",
  Gujarat: "36",
  Haryana: "12",
  "Himachal Pradesh": "17",
  Jharkhand: "81",
  Karnataka: "56",
  Kerala: "67",
  "Madhya Pradesh": "45",
  Maharashtra: "41",
  Manipur: "79",
  Meghalaya: "79",
  Mizoram: "79",
  Nagaland: "79",
  Odisha: "75",
  Punjab: "14",
  Rajasthan: "30",
  Sikkim: "73",
  "Tamil Nadu": "61",
  Telangana: "50",
  Tripura: "79",
  Uttarakhand: "24",
  "Uttar Pradesh": "20",
  "West Bengal": "70",
  "Andaman and Nicobar Islands": "74",
  Chandigarh: "16",
  "Dadra and Nagar Haveli and Daman and Diu": "39",
  Delhi: "11",
  "Jammu and Kashmir": "18",
  Ladakh: "18",
  Lakshadweep: "68",
  Puducherry: "60",
};

function getStatePinCode(state) {
  const envMap = process.env.REGISTRATION_STATE_PIN_MAP;
  if (envMap) {
    try {
      const parsed = JSON.parse(envMap);
      if (parsed?.[state]) {
        return String(parsed[state]).padStart(2, "0").slice(0, 2) + "00";
      }
    } catch (error) {
      console.warn("Invalid REGISTRATION_STATE_PIN_MAP JSON.", error);
    }
  }

  const code = STATE_CODE_MAP[state] || "00";
  return `${code}00`;
}

function getGenderPrefix(gender) {
  const normalizedGender = String(gender || "").toLowerCase();
  if (normalizedGender === "male") return "10";
  if (normalizedGender === "female") return "20";
  return "30";
}

function getMMYY(date = new Date()) {
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = String(date.getFullYear()).slice(-2);
  return `${month}${year}`;
}

function createRegistrationId() {
  const now = Date.now().toString(36);
  const random = Math.random().toString(36).slice(2, 8).toUpperCase();
  return `REG-${now}-${random}`;
}

async function getSheet() {
  const serviceAccountAuth = new JWT({
    email: process.env.GOOGLE_CLIENT_EMAIL,
    key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEET_ID, serviceAccountAuth);
  await doc.loadInfo();

  let sheet = doc.sheetsByIndex[0];
  if (!sheet) {
    sheet = await doc.addSheet({ title: SHEET_TITLE, headerValues: HEADER_VALUES });
  }

  let headers = [];
  let shouldSetHeaders = false;

  try {
    await sheet.loadHeaderRow();
    headers = sheet.headerValues || [];
  } catch (error) {
    if (error?.message?.includes("No values in the header row")) {
      shouldSetHeaders = true;
    } else {
      throw error;
    }
  }

  if (shouldSetHeaders || !HEADER_VALUES.every((header) => headers.includes(header))) {
    await sheet.setHeaderRow(HEADER_VALUES);
  }

  return sheet;
}

async function getRows(sheet) {
  return sheet.getRows();
}

function normalizeEmail(email) {
  return String(email || "").trim().toLowerCase();
}

function normalizeMobile(mobile) {
  return String(mobile || "").replace(/\D/g, "").slice(-10);
}

export async function addUserData(data) {
  const { fullName, dob, gender, mobile, email, referralCode, state, city } = data;

  const sheet = await getSheet();
  const rows = await getRows(sheet);

  const normalizedEmail = normalizeEmail(email);
  const normalizedMobile = normalizeMobile(mobile);

  const duplicateRow = rows.find((row) => {
    const rowEmail = normalizeEmail(row.get("email"));
    const rowMobile = normalizeMobile(row.get("mobile"));
    return rowEmail === normalizedEmail || rowMobile === normalizedMobile;
  });

  if (duplicateRow) {
    return {
      success: false,
      message: "Email or mobile number is already registered.",
      duplicate: true,
    };
  }

  const now = new Date().toISOString();
  const registrationId = createRegistrationId();

  const userData = {
    registrationId,
    fullName,
    dob,
    gender,
    mobile: normalizedMobile,
    email: normalizedEmail,
    state,
    city,
    referralCode: referralCode || "",
    paymentStatus: "unpaid",
    paymentReference: "",
    mid: "",
    createdAt: now,
    updatedAt: now,
  };

  await sheet.addRow(userData);

  return {
    success: true,
    message: "User data added successfully.",
    data: {
      registrationId,
      fullName,
      email: normalizedEmail,
      mobile: normalizedMobile,
      paymentStatus: "unpaid",
    },
  };
}

export async function completeUserPayment({ registrationId, paymentReference }) {
  const sheet = await getSheet();
  const rows = await getRows(sheet);

  const row = rows.find((item) => item.get("registrationId") === registrationId);

  if (!row) {
    return { success: false, message: "Registration not found." };
  }

  if (String(row.get("paymentStatus")).toLowerCase() === "paid" && row.get("mid")) {
    return {
      success: true,
      message: "Payment already completed.",
      data: {
        registrationId,
        paymentStatus: "paid",
        mid: row.get("mid"),
      },
    };
  }

  const genderPrefix = getGenderPrefix(row.get("gender"));
  const mmyy = getMMYY(new Date());
  const statePinCode = getStatePinCode(row.get("state"));
  const basePrefix = `${genderPrefix}${mmyy}${statePinCode}`;

  let maxSequence = 1000;
  rows.forEach((existingRow) => {
    const existingMid = String(existingRow.get("mid") || "").trim();
    if (existingMid.startsWith(basePrefix) && existingMid.length >= 14) {
      const parsed = Number(existingMid.slice(-4));
      if (!Number.isNaN(parsed)) {
        maxSequence = Math.max(maxSequence, parsed);
      }
    }
  });

  const nextSequence = maxSequence + 1;
  if (nextSequence > 9999) {
    throw new Error("MID sequence exhausted for this month/state/gender combination.");
  }

  const mid = `${basePrefix}${String(nextSequence).padStart(4, "0")}`;

  row.set("paymentStatus", "paid");
  row.set("paymentReference", paymentReference || "");
  row.set("mid", mid);
  row.set("updatedAt", new Date().toISOString());

  await row.save();

  return {
    success: true,
    message: "Payment marked as paid.",
    data: {
      registrationId,
      paymentStatus: "paid",
      mid,
      paymentReference: paymentReference || "",
    },
  };
}
