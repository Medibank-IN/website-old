import nodemailer from "nodemailer";

function requiredEnv(name) {
  const value = String(process.env[name] || "").trim();
  if (!value) {
    throw new Error(`${name} is not configured.`);
  }
  return value;
}

function createTransport() {
  const host = requiredEnv("SMTP_HOST");
  const port = Number(requiredEnv("SMTP_PORT"));
  const user = requiredEnv("SMTP_USER");
  const pass = requiredEnv("SMTP_PASS");

  if (!Number.isFinite(port) || port <= 0) {
    throw new Error("SMTP_PORT must be a valid positive number.");
  }

  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: {
      user,
      pass,
    },
  });
}

export async function sendEmailOtpMail({ email, otp }) {
  const transporter = createTransport();
  const from = requiredEnv("SMTP_FROM_EMAIL");

  await transporter.sendMail({
    from,
    to: email,
    subject: "Your OTP for doctor registration",
    text: `${otp} is your OTP for doctor registration on Charak HealthTech.`,
    html: `<p><strong>${otp}</strong> is your OTP for doctor registration on Charak HealthTech.</p>`,
  });
}
