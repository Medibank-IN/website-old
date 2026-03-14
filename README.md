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
REGISTRATION_STATE_PIN_MAP={"Andhra Pradesh":"5100","Tamil Nadu":"6100"}

# SMSCountry OTP integration
SMSCOUNTRY_ACCOUNT_ID=
SMSCOUNTRY_AUTH_KEY=
SMSCOUNTRY_AUTH_TOKEN=
SMSCOUNTRY_SENDER_ID=

# Optional (use if your SMSCountry setup requires DLT data / custom endpoint)
SMSCOUNTRY_TEMPLATE_ID=
SMSCOUNTRY_ENTITY_ID=
SMSCOUNTRY_BASE_URL=https://restapi.smscountry.com
SMSCOUNTRY_SEND_PATH=/v0.1/Accounts/${SMSCOUNTRY_ACCOUNT_ID}/SMSes/
SMSCOUNTRY_AUTH_HEADER=
SMSCOUNTRY_OTP_MESSAGE=Your OTP for registration is {{OTP}}. It expires in 5 minutes. Do not share this code.
OTP_EXPIRY_SECONDS=300
OTP_MAX_ATTEMPTS=5
```

> Note: Provide either `SMSCOUNTRY_AUTH_HEADER` **or** (`SMSCOUNTRY_AUTH_KEY` + `SMSCOUNTRY_AUTH_TOKEN`).
