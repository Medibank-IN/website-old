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
  "mid",
  "createdAt",
  "updatedAt",
];

const DOCTOR_SHEET_TITLE = process.env.DOCTOR_SHEET_TITLE || "Doctor Data";
const DOCTOR_HEADER_VALUES = [
  "doctorRegistrationId",
  "fullLegalName",
  "preferredName",
  "dob",
  "email",
  "mobile",
  "emergencyMobile",
  "primaryLicenseId",
  "specialization",
  "yearsOfExperience",
  "consultationType",
  "clinicName",
  "consultationFees",
  "languagesSpoken",
  "registrations",
  "qualifications",
  "availabilitySchedule",
  "agreeTerms",
  "agreePrivacy",
  "verificationConsent",
  "rawPayload",
  "createdAt",
  "updatedAt",
];

const STATE_PIN_CODES = {
  "Andhra Pradesh": "5100",
  "Tamil Nadu": "6100",
};

function getStatePinCode(state) {
  const envMap = process.env.REGISTRATION_STATE_PIN_MAP;
  if (envMap) {
    try {
      const parsed = JSON.parse(envMap);
      if (parsed?.[state]) {
        return String(parsed[state]);
      }
    } catch (error) {
      console.warn("Invalid REGISTRATION_STATE_PIN_MAP JSON.", error);
    }
  }
  return STATE_PIN_CODES[state] || "0000";
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
  return getOrCreateSheet({
    sheetTitle: SHEET_TITLE,
    fallbackIndex: 0,
    headerValues: HEADER_VALUES,
  });
}

async function getDoctorSheet() {
  return getOrCreateSheet({
    sheetTitle: DOCTOR_SHEET_TITLE,
    headerValues: DOCTOR_HEADER_VALUES,
  });
}

async function getOrCreateSheet({ sheetTitle, headerValues, fallbackIndex }) {
  const serviceAccountAuth = new JWT({
    email: process.env.GOOGLE_CLIENT_EMAIL,
    key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEET_ID, serviceAccountAuth);
  await doc.loadInfo();

  let sheet = doc.sheetsByTitle[sheetTitle];
  if (!sheet && Number.isInteger(fallbackIndex)) {
    sheet = doc.sheetsByIndex[fallbackIndex];
  }

  if (!sheet) {
    sheet = await doc.addSheet({ title: sheetTitle, headerValues });
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

  if (shouldSetHeaders || !headerValues.every((header) => headers.includes(header))) {
    await sheet.setHeaderRow(headerValues);
  }

  return sheet;
}

function createDoctorRegistrationId() {
  const now = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).slice(2, 8).toUpperCase();
  return `DOC-${now}-${random}`;
}

function stringifyValue(value) {
  if (Array.isArray(value) || (value && typeof value === "object")) {
    return JSON.stringify(value);
  }
  return String(value || "");
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
  row.set("mid", mid);
  row.set("updatedAt", new Date().toISOString());
  if (paymentReference) {
    row.set("referralCode", String(row.get("referralCode") || paymentReference));
  }

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

export async function addDoctorData(data) {
  const sheet = await getDoctorSheet();

  const doctorRegistrationId = createDoctorRegistrationId();
  const now = new Date().toISOString();

  const doctorData = {
    doctorRegistrationId,
    fullLegalName: String(data.fullLegalName || ""),
    preferredName: String(data.preferredName || ""),
    dob: String(data.dob || ""),
    email: normalizeEmail(data.email),
    mobile: normalizeMobile(data.mobile),
    emergencyMobile: normalizeMobile(data.emergencyMobile),
    primaryLicenseId: String(data.primaryLicenseId || ""),
    specialization: String(data.specialization || ""),
    yearsOfExperience: String(data.yearsOfExperience || ""),
    consultationType: String(data.consultationType || ""),
    clinicName: String(data.clinicName || ""),
    consultationFees: String(data.consultationFees || ""),
    languagesSpoken: String(data.languagesSpoken || ""),
    registrations: stringifyValue(data.registrations),
    qualifications: stringifyValue(data.qualifications),
    availabilitySchedule: stringifyValue(data.availabilitySchedule),
    agreeTerms: String(Boolean(data.agreeTerms)),
    agreePrivacy: String(Boolean(data.agreePrivacy)),
    verificationConsent: String(Boolean(data.verificationConsent)),
    rawPayload: JSON.stringify(data),
    createdAt: now,
    updatedAt: now,
  };

  await sheet.addRow(doctorData);

  return {
    success: true,
    message: "Doctor data added successfully.",
    data: {
      doctorRegistrationId,
      fullLegalName: doctorData.fullLegalName,
      email: doctorData.email,
      mobile: doctorData.mobile,
    },
  };
}
