This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## Environment Variables

Create a `.env.local` file and add the following keys:

```bash
# Existing integrations
GOOGLE_CLIENT_EMAIL=
GOOGLE_PRIVATE_KEY=
GOOGLE_SHEET_ID=
DOCTOR_SHEET_TITLE=Doctor Data
REGISTRATION_STATE_PIN_MAP={"Andhra Pradesh":"5100","Tamil Nadu":"6100"}

# SMSCountry OTP integration
SMSCOUNTRY_AUTH_KEY=
SMSCOUNTRY_AUTH_TOKEN=
SMSCOUNTRY_SENDER_ID=
# Optional: if SMSCountry expects base64 authKey in Accounts path, set explicitly
SMSCOUNTRY_AUTH_KEY_BASE64=

# Optional
SMSCOUNTRY_COUNTRY_CODE=91
SMSCOUNTRY_BASE_URL=https://restapi.smscountry.com
SMSCOUNTRY_AUTH_HEADER=
SMSCOUNTRY_TOOL=API
SMSCOUNTRY_OTP_MESSAGE=Dear User, {OTP} is the OTP for New user registration on the Charak HealthTech app
OTP_EXPIRY_SECONDS=300
OTP_MAX_ATTEMPTS=5

# Email OTP integration via Nodemailer (required for doctor registration email OTP)
SMTP_HOST=
SMTP_PORT=587
SMTP_USER=
SMTP_PASS=
SMTP_FROM_EMAIL=
```

> Notes:
> - Provide either `SMSCOUNTRY_AUTH_HEADER` **or** (`SMSCOUNTRY_AUTH_KEY` + `SMSCOUNTRY_AUTH_TOKEN`).
> - OTP send target is `/v0.1/Accounts/{base64(authKey)}/SMSes/` and uses Basic auth header `base64(authKey:authToken)`.
> - Set `SMSCOUNTRY_AUTH_KEY_BASE64` only if you already have the encoded key and want to pass it directly.
