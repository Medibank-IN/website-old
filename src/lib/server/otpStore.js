const OTP_TTL_MS = Number(process.env.OTP_EXPIRY_SECONDS || 300) * 1000;
const MAX_VERIFY_ATTEMPTS = Number(process.env.OTP_MAX_ATTEMPTS || 5);

const store = globalThis.__userOtpStore || new Map();
if (!globalThis.__userOtpStore) {
  globalThis.__userOtpStore = store;
}

function normalizeMobile(mobile) {
  return String(mobile || "").replace(/\D/g, "").slice(-10);
}

export function createOtpSession(mobile) {
  const normalizedMobile = normalizeMobile(mobile);
  if (!/^[6-9]\d{9}$/.test(normalizedMobile)) {
    return { success: false, message: "Invalid mobile number." };
  }

  const otp = String(Math.floor(100000 + Math.random() * 900000));
  const now = Date.now();

  store.set(normalizedMobile, {
    otp,
    expiresAt: now + OTP_TTL_MS,
    attempts: 0,
    verified: false,
    createdAt: now,
  });

  return {
    success: true,
    mobile: normalizedMobile,
    otp,
    expiresInSeconds: Math.floor(OTP_TTL_MS / 1000),
  };
}

export function verifyOtpSession(mobile, otp) {
  const normalizedMobile = normalizeMobile(mobile);
  const entry = store.get(normalizedMobile);

  if (!entry) {
    return { success: false, message: "OTP session not found. Please request OTP again." };
  }

  if (Date.now() > entry.expiresAt) {
    store.delete(normalizedMobile);
    return { success: false, message: "OTP expired. Please request OTP again." };
  }

  if (entry.attempts >= MAX_VERIFY_ATTEMPTS) {
    store.delete(normalizedMobile);
    return { success: false, message: "Too many invalid attempts. Request a new OTP." };
  }

  if (String(otp || "").trim() !== entry.otp) {
    entry.attempts += 1;
    store.set(normalizedMobile, entry);
    return { success: false, message: "Invalid OTP. Please try again." };
  }

  entry.verified = true;
  store.set(normalizedMobile, entry);
  return { success: true, message: "Mobile number verified.", mobile: normalizedMobile };
}

export function consumeVerifiedMobile(mobile) {
  const normalizedMobile = normalizeMobile(mobile);
  const entry = store.get(normalizedMobile);

  if (!entry || !entry.verified || Date.now() > entry.expiresAt) {
    return false;
  }

  store.delete(normalizedMobile);
  return true;
}
