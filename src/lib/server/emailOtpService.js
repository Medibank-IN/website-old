import emailjs from "@emailjs/nodejs";

function requiredEnv(name) {
  const value = String(process.env[name] || "").trim();
  if (!value) {
    throw new Error(`${name} is not configured.`);
  }
  return value;
}

export async function sendEmailOtpMail({ email, otp }) {
  const serviceId = requiredEnv("EMAILJS_SERVICE_ID");
  const templateId = requiredEnv("EMAILJS_OTP_TEMPLATE_ID");
  const publicKey = requiredEnv("EMAILJS_PUBLIC_KEY");
  const privateKey = requiredEnv("EMAILJS_PRIVATE_KEY");

  await emailjs.send(
    serviceId,
    templateId,
    {
      to_email: email,
      otp,
      app_name: "Charak HealthTech",
      message: `${otp} is your OTP for doctor registration.`,
    },
    {
      publicKey,
      privateKey,
    },
  );
}
