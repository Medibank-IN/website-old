const DEFAULT_BASE_URL = "https://restapi.smscountry.com";

function normalizePhoneNumber(mobile) {
  const digits = String(mobile || "").replace(/\D/g, "");
  const countryCode = String(
    process.env.SMSCOUNTRY_COUNTRY_CODE || "91"
  ).replace(/\D/g, "");

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

function buildPrimarySendPath() {
  const authKey = getRequiredEnv("SMSCOUNTRY_AUTH_KEY");
  return `/v0.1/Accounts/${authKey}/SMSes/`;
}

function buildLegacyDocPath() {
  const authKey = getRequiredEnv("SMSCOUNTRY_AUTH_KEY");
  return `/v0.1/Accounts/${authKey}/SMSes/RequestAttributes`;
}

function buildAuthorizationHeader() {
  const authKey = getRequiredEnv("SMSCOUNTRY_AUTH_KEY");
  const authToken = getRequiredEnv("SMSCOUNTRY_AUTH_TOKEN");

  const credentials = `${authKey}:${authToken}`;
  const encodedCredentials = Buffer.from(credentials, "utf8").toString("base64");

  return `Basic ${encodedCredentials}`;
}

function buildPayload({ mobile, otp }) {
  const messageTemplate =
    process.env.SMSCOUNTRY_OTP_MESSAGE ||
    "Dear User, {{OTP}} is the OTP for New user registration on the Charak HealthTech app";

  return {
    Text: messageTemplate.replace(/\{\{?OTP\}?\}/g, String(otp)),
    Number: normalizePhoneNumber(mobile),
    SenderId: process.env.SMSCOUNTRY_SENDER_ID || "MEDBNK",
    Tool: process.env.SMSCOUNTRY_TOOL || "API",
  };
}

async function parseResponse(response) {
  const rawText = await response.text();

  try {
    return rawText ? JSON.parse(rawText) : null;
  } catch {
    return rawText;
  }
}

function formatErrorBody(body) {
  return typeof body === "string" ? body : JSON.stringify(body);
}

async function sendWithJson(url, payload) {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: buildAuthorizationHeader(),
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(payload),
    cache: "no-store",
  });

  const data = await parseResponse(response);

  return {
    ok: response.ok && data?.Success !== false,
    status: response.status,
    headers: Object.fromEntries(response.headers.entries()),
    data,
    url,
    contentType: "application/json",
  };
}

async function sendWithFormUrlEncoded(url, payload) {
  const formBody = new URLSearchParams({
    Text: payload.Text,
    Number: payload.Number,
    SenderId: payload.SenderId,
    Tool: payload.Tool,
  }).toString();

  const response = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: buildAuthorizationHeader(),
      "Content-Type": "application/x-www-form-urlencoded",
      Accept: "application/json",
    },
    body: formBody,
    cache: "no-store",
  });

  const data = await parseResponse(response);

  return {
    ok: response.ok && data?.Success !== false,
    status: response.status,
    headers: Object.fromEntries(response.headers.entries()),
    data,
    url,
    contentType: "application/x-www-form-urlencoded",
  };
}

function logAttempt(result, payload) {
  console.error("SMSCountry error url:", result.url);
  console.error("SMSCountry error content-type:", result.contentType);
  console.error("SMSCountry error payload:", payload);
  console.error("SMSCountry error status:", result.status);
  console.error("SMSCountry error headers:", result.headers);
  console.error("SMSCountry error data:", result.data);
}

export async function sendOtpSms({ mobile, otp }) {
  const baseUrl = process.env.SMSCOUNTRY_BASE_URL || DEFAULT_BASE_URL;
  const payload = buildPayload({ mobile, otp });

  const attempts = [
    () => sendWithJson(buildSmsCountryUrl(baseUrl, buildPrimarySendPath()), payload),
    () => sendWithFormUrlEncoded(buildSmsCountryUrl(baseUrl, buildPrimarySendPath()), payload),
    () => sendWithJson(buildSmsCountryUrl(baseUrl, buildLegacyDocPath()), payload),
    () => sendWithFormUrlEncoded(buildSmsCountryUrl(baseUrl, buildLegacyDocPath()), payload),
  ];

  const errors = [];

  for (const attempt of attempts) {
    const result = await attempt();

    if (result.ok) {
      return result.data;
    }

    errors.push({
      status: result.status,
      url: result.url,
      contentType: result.contentType,
      data: result.data,
    });

    logAttempt(result, payload);

    // If we got a non-method-related auth failure, stop immediately.
    if (result.status === 401 || result.status === 403) {
      throw new Error(
        `SMSCountry authorization failed (${result.status}): ${formatErrorBody(result.data)}`
      );
    }
  }

  throw new Error(
    `SMSCountry OTP send failed after all attempts: ${JSON.stringify(errors)}`
  );
}