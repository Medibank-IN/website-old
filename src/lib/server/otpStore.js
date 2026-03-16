const OTP_TTL_MS = Number(process.env.OTP_EXPIRY_SECONDS || 300) * 1000;
const MAX_VERIFY_ATTEMPTS = Number(process.env.OTP_MAX_ATTEMPTS || 5);

const store = globalThis.__userOtpStore || new Map();
if (!globalThis.__userOtpStore) {
  globalThis.__userOtpStore = store;
}

const emailStore = globalThis.__userEmailOtpStore || new Map();
if (!globalThis.__userEmailOtpStore) {
  globalThis.__userEmailOtpStore = emailStore;
}

function normalizeMobile(mobile) {
  return String(mobile || "").replace(/\D/g, "").slice(-10);
}

function normalizeEmail(email) {
  return String(email || "").trim().toLowerCase();
}

function createOtpEntry() {
  const now = Date.now();
  return {
    otp: String(Math.floor(100000 + Math.random() * 900000)),
    expiresAt: now + OTP_TTL_MS,
    attempts: 0,
    verified: false,
    createdAt: now,
  };
}

export function createOtpSession(mobile) {
  const normalizedMobile = normalizeMobile(mobile);
  if (!/^[6-9]\d{9}$/.test(normalizedMobile)) {
    return { success: false, message: "Invalid mobile number." };
  }

  const entry = createOtpEntry();
  store.set(normalizedMobile, entry);

  return {
    success: true,
    mobile: normalizedMobile,
    otp: entry.otp,
    expiresInSeconds: Math.floor(OTP_TTL_MS / 1000),
  };
}

export function createEmailOtpSession(email) {
  const normalizedEmail = normalizeEmail(email);
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
    return { success: false, message: "Invalid email address." };
  }

  const entry = createOtpEntry();
  emailStore.set(normalizedEmail, entry);

  return {
    success: true,
    email: normalizedEmail,
    otp: entry.otp,
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

export function consumeVerifiedEmail(email) {
  const normalizedEmail = normalizeEmail(email);
  const entry = emailStore.get(normalizedEmail);

  if (!entry || !entry.verified || Date.now() > entry.expiresAt) {
    return false;
  }

  emailStore.delete(normalizedEmail);
  return true;
}

export function verifyEmailOtpSession(email, otp) {
  const normalizedEmail = normalizeEmail(email);
  const entry = emailStore.get(normalizedEmail);

  if (!entry) {
    return { success: false, message: "OTP session not found. Please request OTP again." };
  }

  if (Date.now() > entry.expiresAt) {
    emailStore.delete(normalizedEmail);
    return { success: false, message: "OTP expired. Please request OTP again." };
  }

  if (entry.attempts >= MAX_VERIFY_ATTEMPTS) {
    emailStore.delete(normalizedEmail);
    return { success: false, message: "Too many invalid attempts. Request a new OTP." };
  }

  if (String(otp || "").trim() !== entry.otp) {
    entry.attempts += 1;
    emailStore.set(normalizedEmail, entry);
    return { success: false, message: "Invalid OTP. Please try again." };
  }

  entry.verified = true;
  emailStore.set(normalizedEmail, entry);
  return { success: true, message: "Email verified.", email: normalizedEmail };
}
