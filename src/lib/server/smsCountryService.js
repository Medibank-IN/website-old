const DEFAULT_BASE_URL = "https://restapi.smscountry.com";

function normalizePhoneNumber(mobile) {
  const digits = String(mobile || "").replace(/\D/g, "");
  const countryCode = String(process.env.SMSCOUNTRY_COUNTRY_CODE || "91").replace(/\D/g, "");

  if (digits.length === 10) {
    return `${countryCode}${digits}`;
  }

  return digits;
}

function getRequiredEnv(name) {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required env variable: ${name}`);
  }
  return value;
}

function buildSendPath() {
  const authKey = getRequiredEnv("SMSCOUNTRY_AUTH_KEY");
  return `/v0.1/Accounts/${authKey}/SMSes/RequestAttributes`;
}

function buildSmsCountryUrl(baseUrl, pathOrUrl) {
  if (/^https?:\/\//i.test(pathOrUrl)) {
    return pathOrUrl;
  }

  const normalizedBase = String(baseUrl || DEFAULT_BASE_URL).replace(/\/$/, "");
  const normalizedPath = String(pathOrUrl || "").startsWith("/")
    ? pathOrUrl
    : `/${pathOrUrl}`;

  return `${normalizedBase}${normalizedPath}`;
}

export async function sendOtpSms({ mobile, otp }) {
  const baseUrl = process.env.SMSCOUNTRY_BASE_URL || DEFAULT_BASE_URL;
  const url = buildSmsCountryUrl(baseUrl, buildSendPath());

  const messageTemplate =
    process.env.SMSCOUNTRY_OTP_MESSAGE ||
    "Dear User, {{OTP}} is the OTP for New user registration on the Charak HealthTech app";

  const payload = {
    Text: messageTemplate.replace(/\{\{?OTP\}?\}/g, String(otp)),
    Number: normalizePhoneNumber(mobile),
    SenderId: process.env.SMSCOUNTRY_SENDER_ID || "MEDBNK",
    Tool: process.env.SMSCOUNTRY_TOOL || "API",
  };

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const rawText = await response.text();
  let parsedResponse = null;

  try {
    parsedResponse = rawText ? JSON.parse(rawText) : null;
  } catch {
    parsedResponse = rawText;
  }

  if (!response.ok) {
    const headerEntries = Object.fromEntries(response.headers.entries());
    console.error("SMSCountry error status:", response.status);
    console.error("SMSCountry error headers:", headerEntries);
    console.error("SMSCountry error data:", parsedResponse);
    throw new Error(
      `SMSCountry OTP send failed (${response.status}): ${typeof parsedResponse === "string" ? parsedResponse : JSON.stringify(parsedResponse)}`
    );
  }

  return parsedResponse;
}
