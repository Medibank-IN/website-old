"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function PaymentSuccessPage() {
  const [registrationId, setRegistrationId] = useState("");
  const [mid, setMid] = useState("");
  const [paymentReference, setPaymentReference] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    setRegistrationId(params.get("registrationId") || "");
    setMid(params.get("mid") || "");
    setPaymentReference(params.get("paymentReference") || "");
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#eefbea] to-white px-4 py-16">
      <section className="mx-auto max-w-2xl rounded-3xl border border-[#d6f0cc] bg-white p-8 text-center shadow-[0_18px_50px_rgba(30,120,30,0.12)]">
        <h1 className="text-3xl font-aptos-black text-[#1d6b20]">Payment Successful</h1>
        <p className="mt-3 text-[#37643a]">Your payment is confirmed and your MID has been generated.</p>

        <div className="mt-6 space-y-2 rounded-2xl bg-[#f3fbf1] p-5 text-left text-sm text-[#204b22]">
          <p><strong>Registration ID:</strong> {registrationId}</p>
          <p><strong>Transaction Reference:</strong> {paymentReference}</p>
          <p><strong>MID:</strong> {mid}</p>
        </div>

        <Link href="/" className="mt-8 inline-block rounded-xl bg-[#1d6b20] px-5 py-3 font-semibold text-white">
          Go to Home
        </Link>
      </section>
    </main>
  );
}
