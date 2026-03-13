"use client";

import { useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function PaymentPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isProcessing, setIsProcessing] = useState(false);
  const [message, setMessage] = useState("");

  const registrationId = searchParams.get("registrationId") || "";
  const fullName = searchParams.get("fullName") || "User";
  const email = searchParams.get("email") || "";

  const paymentReference = useMemo(() => `TXN-${Date.now()}`, []);

  const handlePayment = async () => {
    if (!registrationId) {
      setMessage("Missing registration details. Please register again.");
      return;
    }

    setIsProcessing(true);
    setMessage("Redirecting to payment gateway and validating transaction...");

    await new Promise((resolve) => setTimeout(resolve, 1200));

    const response = await fetch("/api/user/completePayment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ registrationId, paymentReference }),
    });

    const result = await response.json();

    if (!response.ok || !result.success) {
      setMessage(result.message || "Payment verification failed.");
      setIsProcessing(false);
      return;
    }

    const query = new URLSearchParams({
      registrationId,
      mid: result.data.mid,
      paymentReference,
    });

    router.push(`/payment/success?${query.toString()}`);
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#f7f0fd] to-white px-4 py-16">
      <section className="mx-auto max-w-2xl rounded-3xl border border-[#ebdff7] bg-white p-8 shadow-[0_20px_60px_rgba(59,10,163,0.12)]">
        <h1 className="text-3xl font-aptos-black text-[#2a0a65]">Complete Payment</h1>
        <p className="mt-3 text-sm text-[#544f73]">
          Registration saved successfully with <strong>payment status: unpaid</strong>. Please review and proceed to the gateway.
        </p>

        <div className="mt-6 space-y-3 rounded-2xl bg-[#f9f6ff] p-5 text-sm text-[#362e57]">
          <p><strong>Name:</strong> {fullName}</p>
          <p><strong>Email:</strong> {email}</p>
          <p><strong>Registration ID:</strong> {registrationId || "N/A"}</p>
          <p><strong>Amount:</strong> ₹499</p>
          <p><strong>Payment Reference:</strong> {paymentReference}</p>
        </div>

        <button
          type="button"
          disabled={isProcessing}
          onClick={handlePayment}
          className="mt-8 w-full rounded-xl bg-gradient-to-r from-[#d81b60] via-[#7b1fa2] to-[#3b0aa3] px-6 py-3 font-aptos-extrabold text-white disabled:opacity-70"
        >
          {isProcessing ? "Processing Payment..." : "Proceed to Payment Gateway"}
        </button>

        {message && <p className="mt-4 text-sm text-[#5a4d85]">{message}</p>}
      </section>
    </main>
  );
}
