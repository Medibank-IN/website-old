const DEFAULT_BASE_URL = "https://restapi.smscountry.com";

function normalizePhoneNumber(mobile) {
  const digits = String(mobile || "").replace(/\D/g, "");
  const countryCode = String(process.env.SMSCOUNTRY_COUNTRY_CODE || "91").replace(/\D/g, "");

  if (digits.length === 10) {
    return `${countryCode}${digits}`;
  }

  if (digits.length > 10 && digits.endsWith(digits.slice(-10))) {
    return digits;
  }

  return digits;
}

function resolveTemplateVariables(value, variables) {
  if (!value) {
    return value;
  }

  return value.replace(/\$\{([^}]+)\}/g, (_match, name) => {
    if (Object.prototype.hasOwnProperty.call(variables, name)) {
      return variables[name];
    }
    return _match;
  });
}

function getRequiredEnv(name) {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required env variable: ${name}`);
  }
  return value;
}

function ensureNoUnresolvedTemplate(pathValue) {
  if (!pathValue || /\$\{[^}]+\}/.test(pathValue)) {
    throw new Error(
      "SMSCOUNTRY_SEND_PATH contains unresolved variables. Ensure required env vars like SMSCOUNTRY_AUTH_KEY or SMSCOUNTRY_ACCOUNT_ID are set."
    );
  }
}

function buildSendPath() {
  const accountId = process.env.SMSCOUNTRY_ACCOUNT_ID;
  const authKey = process.env.SMSCOUNTRY_AUTH_KEY;
  const configuredPath = process.env.SMSCOUNTRY_SEND_PATH;

  if (!configuredPath) {
    const resolvedAuthKey = authKey || accountId;
    if (!resolvedAuthKey) {
      throw new Error(
        "Missing required env variable: SMSCOUNTRY_AUTH_KEY (or SMSCOUNTRY_ACCOUNT_ID for legacy setup)."
      );
    }
    return `/v0.1/Accounts/${resolvedAuthKey}/SMSes/RequestAttributes`;
  }

  return resolveTemplateVariables(configuredPath, {
    SMSCOUNTRY_ACCOUNT_ID: accountId,
    SMSCOUNTRY_AUTH_KEY: authKey || accountId,
  });
}

function buildAuthorizationHeader() {
  const explicitHeader = process.env.SMSCOUNTRY_AUTH_HEADER;
  if (explicitHeader) {
    return explicitHeader;
  }

  const authKey = process.env.SMSCOUNTRY_AUTH_KEY;
  const authToken = process.env.SMSCOUNTRY_AUTH_TOKEN;

  if (!authKey || !authToken) {
    return null;
  }

  return `Basic ${Buffer.from(`${authKey}:${authToken}`).toString("base64")}`;
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
  const senderId = getRequiredEnv("SMSCOUNTRY_SENDER_ID");
  const baseUrl = process.env.SMSCOUNTRY_BASE_URL || DEFAULT_BASE_URL;
  const sendPath = buildSendPath();

  ensureNoUnresolvedTemplate(sendPath);

  const url = buildSmsCountryUrl(baseUrl, sendPath);

  const messageTemplate =
    process.env.SMSCOUNTRY_OTP_MESSAGE ||
    "Dear User, {OTP} is the OTP for New user registration on the Charak HealthTech app";
  const message = messageTemplate.replace(/\{\{?OTP\}?\}/g, otp);

  const payload = {
    Text: message,
    Number: normalizePhoneNumber(mobile),
    SenderId: senderId,
    Tool: process.env.SMSCOUNTRY_TOOL || "API",
  };

  if (process.env.SMSCOUNTRY_TEMPLATE_ID) {
    payload.TemplateId = process.env.SMSCOUNTRY_TEMPLATE_ID;
  }

  if (process.env.SMSCOUNTRY_ENTITY_ID) {
    payload.EntityId = process.env.SMSCOUNTRY_ENTITY_ID;
  }

  const requestFormat = String(process.env.SMSCOUNTRY_REQUEST_FORMAT || "json").toLowerCase();
  const isFormEncoded = requestFormat === "form" || requestFormat === "x-www-form-urlencoded";

  const authorizationHeader = buildAuthorizationHeader();
  const headers = {
    "Content-Type": isFormEncoded ? "application/x-www-form-urlencoded" : "application/json",
    Accept: "application/json",
  };

  if (authorizationHeader) {
    headers.Authorization = authorizationHeader;
  }

  const response = await fetch(url, {
    method: "POST",
    headers,
    body: isFormEncoded
      ? new URLSearchParams(
          Object.entries(payload)
            .filter(([, value]) => value !== undefined && value !== null && value !== "")
            .map(([key, value]) => [key, String(value)])
        ).toString()
      : JSON.stringify(payload),
  });

  const rawText = await response.text();
  let parsedResponse = null;
  try {
    parsedResponse = rawText ? JSON.parse(rawText) : null;
  } catch (_error) {
    parsedResponse = rawText;
  }

  if (!response.ok) {
    throw new Error(`SMSCountry OTP send failed (${response.status}): ${typeof parsedResponse === "string" ? parsedResponse : JSON.stringify(parsedResponse)}`);
  }

  return {
    success: true,
    providerResponse: parsedResponse,
  };
}
