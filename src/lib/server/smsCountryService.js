const DEFAULT_BASE_URL = "https://restapi.smscountry.com";

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

function buildAuthorizationHeader() {
  const explicitHeader = process.env.SMSCOUNTRY_AUTH_HEADER;
  if (explicitHeader) {
    return explicitHeader;
  }

  const authKey = process.env.SMSCOUNTRY_AUTH_KEY;
  const authToken = process.env.SMSCOUNTRY_AUTH_TOKEN;

  if (!authKey || !authToken) {
    throw new Error("Missing SMSCountry auth credentials. Set SMSCOUNTRY_AUTH_HEADER or SMSCOUNTRY_AUTH_KEY and SMSCOUNTRY_AUTH_TOKEN.");
  }

  return `Basic ${Buffer.from(`${authKey}:${authToken}`).toString("base64")}`;
}

export async function sendOtpSms({ mobile, otp }) {
  const accountId = getRequiredEnv("SMSCOUNTRY_ACCOUNT_ID");
  const senderId = getRequiredEnv("SMSCOUNTRY_SENDER_ID");
  const baseUrl = process.env.SMSCOUNTRY_BASE_URL || DEFAULT_BASE_URL;
  const rawSendPath = process.env.SMSCOUNTRY_SEND_PATH || "/v0.1/Accounts/${SMSCOUNTRY_ACCOUNT_ID}/SMSes/";
  const sendPath = resolveTemplateVariables(rawSendPath, {
    SMSCOUNTRY_ACCOUNT_ID: accountId,
  });
  const url = `${baseUrl.replace(/\/$/, "")}${sendPath}`;

  const messageTemplate = process.env.SMSCOUNTRY_OTP_MESSAGE || "Your OTP for registration is {{OTP}}. It expires in 5 minutes. Do not share this code.";
  const message = messageTemplate.replace(/\{\{OTP\}\}/g, otp);

  const payload = {
    Text: message,
    Number: String(mobile).trim(),
    SenderId: senderId,
  };

  if (process.env.SMSCOUNTRY_TEMPLATE_ID) {
    payload.TemplateId = process.env.SMSCOUNTRY_TEMPLATE_ID;
  }

  if (process.env.SMSCOUNTRY_ENTITY_ID) {
    payload.EntityId = process.env.SMSCOUNTRY_ENTITY_ID;
  }

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: buildAuthorizationHeader(),
    },
    body: JSON.stringify(payload),
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
