"use client";

import { useEffect, useMemo, useState } from "react";
import { ChevronDown, Plus, Trash2 } from "lucide-react";
import { useFieldArray, useForm } from "react-hook-form";
import { INDIA_STATE_CITY_MAP, INDIAN_STATES } from "@/lib/indiaLocations";

function HeroWaveBackground() {
  return (
    <div className="pointer-events-none absolute inset-x-0 top-0 z-0 h-[100vh] overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(180deg,#C9C6EA_0%,#E8C9DF_55%,#F3E6F2_100%)]" />
      <svg className="hero-band hero-band-top absolute inset-x-0 h-[40%] w-full" viewBox="0 0 1440 320" preserveAspectRatio="none"><g className="wave-track wave-track-top"><path d="M0,140 C240,90 520,90 720,135 C940,185 1180,185 1440,135 L1440,0 L0,0 Z" fill="#FFFFFF" fillOpacity="0.34" /><path d="M1440,135 C1680,90 1960,90 2160,135 C2380,185 2620,185 2880,135 L2880,0 L1440,0 Z" fill="#FFFFFF" fillOpacity="0.34" /></g></svg>
      <svg className="hero-band hero-band-mid absolute inset-x-0 top-[24%] h-[50%] w-full" viewBox="0 0 1440 340" preserveAspectRatio="none"><g className="wave-track wave-track-mid"><path d="M0,155 C260,215 520,215 740,165 C980,110 1210,115 1440,165 L1440,340 L0,340 Z" fill="#FFFFFF" fillOpacity="0.42" /><path d="M1440,165 C1700,215 1960,215 2180,165 C2420,110 2650,115 2880,165 L2880,340 L1440,340 Z" fill="#FFFFFF" fillOpacity="0.42" /></g></svg>
      <svg className="hero-band hero-band-bottom absolute inset-x-0 bottom-0 h-[48%] w-full" viewBox="0 0 1440 320" preserveAspectRatio="none"><g className="wave-track wave-track-bottom"><path d="M0,110 C250,35 520,40 720,105 C950,180 1180,185 1440,115 L1440,320 L0,320 Z" fill="#FFFFFF" fillOpacity="0.98" /><path d="M1440,115 C1690,35 1960,40 2160,105 C2390,180 2620,185 2880,115 L2880,320 L1440,320 Z" fill="#FFFFFF" fillOpacity="0.98" /></g></svg>
      <style jsx>{`.hero-band{will-change:transform;mix-blend-mode:screen;animation:bandFloat 7.5s ease-in-out infinite}.hero-band-mid{animation-delay:-1.8s}.hero-band-bottom{animation-delay:-3.4s}.wave-track-top{animation:waveSlideLeft 12s linear infinite}.wave-track-mid{animation:waveSlideRight 15s linear infinite}.wave-track-bottom{animation:waveSlideLeft 9s linear infinite}@keyframes bandFloat{0%,100%{transform:translate3d(0,0,0)}50%{transform:translate3d(0,12px,0)}}@keyframes waveSlideLeft{0%{transform:translateX(0)}100%{transform:translateX(-1440px)}}@keyframes waveSlideRight{0%{transform:translateX(-1440px)}100%{transform:translateX(0)}}`}</style>
    </div>
  );
}

const inputClass = "w-full rounded-xl border border-[#ddd9f5] bg-[#faf9ff] px-4 py-3 text-sm outline-none transition duration-300 placeholder:text-[#79778f] focus:border-[#7b1fa2] focus:ring-2 focus:ring-[#7b1fa2]/20";
const sectionTitleClass = "sm:col-span-2 mt-6 border-b border-[#ece8fb] pb-2 text-lg font-aptos-extrabold text-[#3b0aa3]";

export default function DoctorRegistrationPage() {
  const [showForm, setShowForm] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");
  const [submitSuccess, setSubmitSuccess] = useState(true);
  const [mobileOtp, setMobileOtp] = useState("");
  const [mobileOtpSent, setMobileOtpSent] = useState(false);
  const [mobileOtpVerified, setMobileOtpVerified] = useState("");
  const [mobileOtpMessage, setMobileOtpMessage] = useState("");
  const [mobileOtpError, setMobileOtpError] = useState("");
  const [isSendingMobileOtp, setIsSendingMobileOtp] = useState(false);
  const [isVerifyingMobileOtp, setIsVerifyingMobileOtp] = useState(false);
  const [emailOtp, setEmailOtp] = useState("");
  const [emailOtpSent, setEmailOtpSent] = useState(false);
  const [emailOtpVerified, setEmailOtpVerified] = useState("");
  const [emailOtpMessage, setEmailOtpMessage] = useState("");
  const [emailOtpError, setEmailOtpError] = useState("");
  const [isSendingEmailOtp, setIsSendingEmailOtp] = useState(false);
  const [isVerifyingEmailOtp, setIsVerifyingEmailOtp] = useState(false);

  const {
    register,
    watch,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      registrations: [{ licenseId: "", licenseName: "" }],
      qualifications: [{ qualification: "", college: "", country: "", state: "", city: "" }],
    },
  });

  const {
    fields: registrationFields,
    append: appendRegistration,
    remove: removeRegistration,
  } = useFieldArray({ name: "registrations", control });
  const {
    fields: qualificationFields,
    append: appendQualification,
    remove: removeQualification,
  } = useFieldArray({ name: "qualifications", control });

  useEffect(() => {
    const timer = setTimeout(() => setShowForm(true), 500);
    return () => clearTimeout(timer);
  }, []);

  const primaryQualificationState = watch("qualifications.0.state");
  const mobileValue = watch("mobile");
  const emailValue = watch("email");
  const primaryCityOptions = useMemo(
    () => INDIA_STATE_CITY_MAP[primaryQualificationState] || [],
    [primaryQualificationState],
  );

  useEffect(() => {
    const normalizedMobile = String(mobileValue || "").replace(/\D/g, "").slice(-10);
    if (mobileOtpVerified && normalizedMobile !== mobileOtpVerified) {
      setMobileOtpVerified("");
      setMobileOtpSent(false);
      setMobileOtp("");
      setMobileOtpMessage("");
      setMobileOtpError("Mobile number changed. Please verify the new number.");
    }
  }, [mobileValue, mobileOtpVerified]);

  useEffect(() => {
    const normalizedEmail = String(emailValue || "").trim().toLowerCase();
    if (emailOtpVerified && normalizedEmail !== emailOtpVerified) {
      setEmailOtpVerified("");
      setEmailOtpSent(false);
      setEmailOtp("");
      setEmailOtpMessage("");
      setEmailOtpError("Email changed. Please verify again if you want to submit a verified email.");
    }
  }, [emailValue, emailOtpVerified]);

  const sendMobileOtp = async () => {
    setMobileOtpMessage("");
    setMobileOtpError("");

    const normalizedMobile = String(mobileValue || "").replace(/\D/g, "").slice(-10);
    if (!/^[6-9]\d{9}$/.test(normalizedMobile)) {
      setMobileOtpError("Enter a valid 10-digit Indian mobile number before requesting OTP.");
      return;
    }

    try {
      setIsSendingMobileOtp(true);
      const response = await fetch("/api/user/sendOtp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ mobile: normalizedMobile }),
      });

      const result = await response.json();
      if (!response.ok || !result?.success) {
        setMobileOtpError(result?.message || "Unable to send OTP.");
        return;
      }

      setMobileOtpSent(true);
      setMobileOtp("");
      setMobileOtpVerified("");
      setMobileOtpMessage("OTP sent to your mobile number.");
    } catch (_error) {
      setMobileOtpError("Unable to send OTP right now. Please try again.");
    } finally {
      setIsSendingMobileOtp(false);
    }
  };

  const verifyMobileOtp = async () => {
    setMobileOtpMessage("");
    setMobileOtpError("");

    const normalizedMobile = String(mobileValue || "").replace(/\D/g, "").slice(-10);
    if (!mobileOtpSent) {
      setMobileOtpError("Request OTP before verification.");
      return;
    }

    if (!/^\d{6}$/.test(String(mobileOtp || "").trim())) {
      setMobileOtpError("Enter a valid 6-digit OTP.");
      return;
    }

    try {
      setIsVerifyingMobileOtp(true);
      const response = await fetch("/api/user/verifyOtp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ mobile: normalizedMobile, otp: String(mobileOtp).trim() }),
      });

      const result = await response.json();
      if (!response.ok || !result?.success) {
        setMobileOtpError(result?.message || "OTP verification failed.");
        return;
      }

      setMobileOtpVerified(normalizedMobile);
      setMobileOtpMessage("Mobile number verified successfully.");
    } catch (_error) {
      setMobileOtpError("Unable to verify OTP right now. Please try again.");
    } finally {
      setIsVerifyingMobileOtp(false);
    }
  };

  const sendEmailOtp = async () => {
    setEmailOtpMessage("");
    setEmailOtpError("");

    const normalizedEmail = String(emailValue || "").trim().toLowerCase();
    if (!normalizedEmail) {
      setEmailOtpError("Enter an email address before requesting OTP.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
      setEmailOtpError("Enter a valid email address before requesting OTP.");
      return;
    }

    try {
      setIsSendingEmailOtp(true);
      const response = await fetch("/api/user/sendEmailOtp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: normalizedEmail }),
      });

      const result = await response.json();
      if (!response.ok || !result?.success) {
        setEmailOtpError(result?.message || "Unable to send email OTP.");
        return;
      }

      setEmailOtpSent(true);
      setEmailOtp("");
      setEmailOtpVerified("");
      setEmailOtpMessage("OTP sent to your email address.");
    } catch (_error) {
      setEmailOtpError("Unable to send email OTP right now. Please try again.");
    } finally {
      setIsSendingEmailOtp(false);
    }
  };

  const verifyEmailOtp = async () => {
    setEmailOtpMessage("");
    setEmailOtpError("");

    const normalizedEmail = String(emailValue || "").trim().toLowerCase();
    if (!emailOtpSent) {
      setEmailOtpError("Request OTP before verification.");
      return;
    }

    if (!/^\d{6}$/.test(String(emailOtp || "").trim())) {
      setEmailOtpError("Enter a valid 6-digit OTP.");
      return;
    }

    try {
      setIsVerifyingEmailOtp(true);
      const response = await fetch("/api/user/verifyEmailOtp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: normalizedEmail, otp: String(emailOtp).trim() }),
      });

      const result = await response.json();
      if (!response.ok || !result?.success) {
        setEmailOtpError(result?.message || "Email OTP verification failed.");
        return;
      }

      setEmailOtpVerified(normalizedEmail);
      setEmailOtpMessage("Email verified successfully.");
    } catch (_error) {
      setEmailOtpError("Unable to verify email OTP right now. Please try again.");
    } finally {
      setIsVerifyingEmailOtp(false);
    }
  };

  const onSubmit = async (formData) => {
    setSubmitMessage("");
    setSubmitSuccess(true);

    const normalizedMobile = String(formData.mobile || "").replace(/\D/g, "").slice(-10);
    const normalizedEmail = String(formData.email || "").trim().toLowerCase();

    if (mobileOtpVerified !== normalizedMobile) {
      setSubmitSuccess(false);
      setSubmitMessage("Please complete mobile OTP verification before submitting doctor registration.");
      return;
    }

    if (normalizedEmail && emailOtpVerified !== normalizedEmail) {
      setSubmitSuccess(false);
      setSubmitMessage("Please verify your email with OTP or clear the email field to continue.");
      return;
    }

    try {
      const response = await fetch("/api/user/addDoctordataToSheet", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      if (!response.ok || !result?.success) {
        throw new Error(result?.message || "Failed to submit doctor details.");
      }

      setSubmitSuccess(true);
      setSubmitMessage("Doctor details submitted successfully.");
    } catch (error) {
      setSubmitSuccess(false);
      setSubmitMessage(error.message || "Failed to submit doctor details.");
    }
  };

  return (
    <main className="relative overflow-hidden bg-gradient-to-b from-[#eef4ff] via-[#f8eefe] to-white px-4 py-12 md:py-20">
      <HeroWaveBackground />
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-20 top-16 h-56 w-56 rounded-full bg-[#d81b60]/20 blur-3xl" />
        <div className="absolute -right-16 bottom-8 h-64 w-64 rounded-full bg-[#3b0aa3]/20 blur-3xl" />
      </div>

      <section className="relative mx-auto w-full max-w-6xl space-y-6 rounded-3xl border border-white/60 bg-white/80 p-4 shadow-[0_20px_60px_rgba(59,10,163,0.14)] backdrop-blur-sm sm:p-8 md:p-10">
        <div className="overflow-hidden rounded-3xl bg-gradient-to-r from-[#d81b60] via-[#7b1fa2] to-[#3b0aa3] p-6 text-white md:p-8">
          <p className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs tracking-[0.14em] text-white/90">DOCTOR ONBOARDING</p>
          <h1 className="font-aptos-black text-3xl leading-tight md:text-4xl">Doctor Registration</h1>
          <p className="mt-4 text-sm text-white/85 md:text-base">Fill in your details to complete your registration.</p>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className={`grid gap-4 overflow-hidden rounded-2xl border border-[#ece8fb] bg-white p-4 transition-all duration-700 ease-out sm:grid-cols-2 sm:p-6 ${
            showForm ? "max-h-[5000px] translate-y-0 opacity-100" : "pointer-events-none max-h-0 translate-y-6 opacity-0"
          }`}
        >
          <h2 className={sectionTitleClass}>1. Profile Information</h2>

          <div>
            <label className="mb-1 block text-sm text-[#2b2b43]">Full Legal Name</label>
            <input className={inputClass} type="text" placeholder="Enter Full Legal Name" {...register("fullLegalName", { required: "Full legal name is required." })} />
            {errors.fullLegalName && <p className="mt-1 text-xs text-red-500">{errors.fullLegalName.message}</p>}
          </div>

          <div>
            <label className="mb-1 block text-sm text-[#2b2b43]">Date of Birth</label>
            <input className={inputClass} type="date" max={new Date().toISOString().split("T")[0]} {...register("dob", { required: "Date of birth is required." })} />
            {errors.dob && <p className="mt-1 text-xs text-red-500">{errors.dob.message}</p>}
          </div>

          <div className="sm:col-span-2">
            <label className="mb-1 block text-sm text-[#2b2b43]">Preferred Name</label>
            <input className={inputClass} type="text" placeholder="Enter Preferred Name" {...register("preferredName", { required: "Preferred name is required." })} />
            {errors.preferredName && <p className="mt-1 text-xs text-red-500">{errors.preferredName.message}</p>}
          </div>

          <div className="sm:col-span-2">
            <label className="mb-1 block text-sm text-[#2b2b43]">Email</label>
            <input className={inputClass} type="email" placeholder="Enter Email (Optional)" {...register("email")} />
            {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>}
            <div className="mt-3 flex flex-wrap gap-2">
              <button type="button" onClick={sendEmailOtp} disabled={isSendingEmailOtp} className="rounded-lg border border-[#cabaf8] px-3 py-2 text-xs font-semibold text-[#5f2bb3] hover:bg-[#f3edff] disabled:opacity-60">
                {isSendingEmailOtp ? "Sending..." : emailOtpSent ? "Resend Email OTP" : "Send Email OTP"}
              </button>
              {emailOtpVerified === String(emailValue || "").trim().toLowerCase() && String(emailValue || "").trim() && (
                <span className="rounded-lg bg-emerald-50 px-3 py-2 text-xs font-semibold text-emerald-700">Email verified</span>
              )}
            </div>
            {emailOtpSent && (
              <div className="mt-2 flex flex-wrap items-center gap-2">
                <input
                  className="max-w-[220px] rounded-lg border border-[#ddd9f5] bg-[#faf9ff] px-3 py-2 text-xs outline-none focus:border-[#7b1fa2]"
                  type="text"
                  inputMode="numeric"
                  maxLength={6}
                  placeholder="Enter Email OTP"
                  value={emailOtp}
                  onChange={(event) => setEmailOtp(event.target.value.replace(/\D/g, "").slice(0, 6))}
                />
                <button type="button" onClick={verifyEmailOtp} disabled={isVerifyingEmailOtp} className="rounded-lg bg-[#5f2bb3] px-3 py-2 text-xs font-semibold text-white hover:opacity-90 disabled:opacity-60">
                  {isVerifyingEmailOtp ? "Verifying..." : "Verify Email OTP"}
                </button>
              </div>
            )}
            {emailOtpMessage && <p className="mt-2 text-xs text-emerald-600">{emailOtpMessage}</p>}
            {emailOtpError && <p className="mt-2 text-xs text-red-500">{emailOtpError}</p>}
            <p className="mt-1 text-xs text-[#6e648f]">Email OTP verification is optional.</p>
          </div>

          <h2 className={sectionTitleClass}>2. Registration Details</h2>
          {registrationFields.map((field, index) => (
            <div key={field.id} className="sm:col-span-2 rounded-2xl border border-[#ece8fb] p-4">
              <div className="mb-3 flex items-center justify-between">
                <h3 className="text-sm font-aptos-bold text-[#3b0aa3]">Registration #{index + 1}</h3>
                {registrationFields.length > 1 && (
                  <button type="button" className="rounded-lg p-2 text-[#d81b60] hover:bg-[#fce5f0]" onClick={() => removeRegistration(index)}>
                    <Trash2 size={16} />
                  </button>
                )}
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block text-sm text-[#2b2b43]">License Id</label>
                  <input className={inputClass} placeholder="Enter License Id" {...register(`registrations.${index}.licenseId`, { required: "License Id is required." })} />
                  {errors?.registrations?.[index]?.licenseId && <p className="mt-1 text-xs text-red-500">{errors.registrations[index].licenseId.message}</p>}
                </div>
                <div>
                  <label className="mb-1 block text-sm text-[#2b2b43]">License Name</label>
                  <input className={inputClass} placeholder="Enter License Name" {...register(`registrations.${index}.licenseName`)} />
                </div>
              </div>
            </div>
          ))}

          <button
            type="button"
            className="sm:col-span-2 inline-flex items-center gap-2 justify-self-start rounded-xl border border-[#cabaf8] px-4 py-2 text-sm font-semibold text-[#5f2bb3] hover:bg-[#f3edff]"
            onClick={() => appendRegistration({ licenseId: "", licenseName: "" })}
          >
            <Plus size={15} /> Add more Registration Id
          </button>

          <h2 className={sectionTitleClass}>3. Contact Details</h2>
          <div>
            <label className="mb-1 block text-sm text-[#2b2b43]">Mobile Number</label>
            <input className={inputClass} type="tel" placeholder="Enter 10 digit number" {...register("mobile", { required: "Mobile number is required." })} />
            {errors.mobile && <p className="mt-1 text-xs text-red-500">{errors.mobile.message}</p>}
            <div className="mt-3 flex flex-wrap gap-2">
              <button type="button" onClick={sendMobileOtp} disabled={isSendingMobileOtp} className="rounded-lg border border-[#cabaf8] px-3 py-2 text-xs font-semibold text-[#5f2bb3] hover:bg-[#f3edff] disabled:opacity-60">
                {isSendingMobileOtp ? "Sending..." : mobileOtpSent ? "Resend Mobile OTP" : "Send Mobile OTP"}
              </button>
              {mobileOtpVerified === String(mobileValue || "").replace(/\D/g, "").slice(-10) && (
                <span className="rounded-lg bg-emerald-50 px-3 py-2 text-xs font-semibold text-emerald-700">Mobile verified</span>
              )}
            </div>
            {mobileOtpSent && (
              <div className="mt-2 flex flex-wrap items-center gap-2">
                <input
                  className="max-w-[220px] rounded-lg border border-[#ddd9f5] bg-[#faf9ff] px-3 py-2 text-xs outline-none focus:border-[#7b1fa2]"
                  type="text"
                  inputMode="numeric"
                  maxLength={6}
                  placeholder="Enter Mobile OTP"
                  value={mobileOtp}
                  onChange={(event) => setMobileOtp(event.target.value.replace(/\D/g, "").slice(0, 6))}
                />
                <button type="button" onClick={verifyMobileOtp} disabled={isVerifyingMobileOtp} className="rounded-lg bg-[#5f2bb3] px-3 py-2 text-xs font-semibold text-white hover:opacity-90 disabled:opacity-60">
                  {isVerifyingMobileOtp ? "Verifying..." : "Verify Mobile OTP"}
                </button>
              </div>
            )}
            {mobileOtpMessage && <p className="mt-2 text-xs text-emerald-600">{mobileOtpMessage}</p>}
            {mobileOtpError && <p className="mt-2 text-xs text-red-500">{mobileOtpError}</p>}
            <p className="mt-1 text-xs text-[#6e648f]">Mobile OTP verification is mandatory.</p>
          </div>
          <div>
            <label className="mb-1 block text-sm text-[#2b2b43]">Emergency Mob No (Optional)</label>
            <input className={inputClass} type="tel" placeholder="Enter 10 digit number" {...register("emergencyMobile")} />
          </div>

          <h2 className={sectionTitleClass}>4. Qualifications</h2>
          {qualificationFields.map((field, index) => {
            const selectedState = watch(`qualifications.${index}.state`);
            const cityOptions = index === 0 ? primaryCityOptions : INDIA_STATE_CITY_MAP[selectedState] || [];

            return (
              <div key={field.id} className="sm:col-span-2 rounded-2xl border border-[#ece8fb] p-4">
                <div className="mb-3 flex items-center justify-between">
                  <h3 className="text-sm font-aptos-bold text-[#3b0aa3]">Qualification #{index + 1}</h3>
                  {qualificationFields.length > 1 && (
                    <button type="button" className="rounded-lg p-2 text-[#d81b60] hover:bg-[#fce5f0]" onClick={() => removeQualification(index)}>
                      <Trash2 size={16} />
                    </button>
                  )}
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="sm:col-span-2">
                    <label className="mb-1 block text-sm text-[#2b2b43]">Qualifications</label>
                    <input className={inputClass} placeholder="Enter Qualifications (e.g., MBBS, MD)" {...register(`qualifications.${index}.qualification`)} />
                  </div>

                  <div>
                    <label className="mb-1 block text-sm text-[#2b2b43]">Medical College Name</label>
                    <input className={inputClass} placeholder="Enter Medical College Name" {...register(`qualifications.${index}.college`, { required: "Medical college name is required." })} />
                    {errors?.qualifications?.[index]?.college && <p className="mt-1 text-xs text-red-500">{errors.qualifications[index].college.message}</p>}
                  </div>

                  <div>
                    <label className="mb-1 block text-sm text-[#2b2b43]">Country</label>
                    <input className={inputClass} placeholder="Type or select country" {...register(`qualifications.${index}.country`)} />
                  </div>

                  <div className="group relative">
                    <label className="mb-1 block text-sm text-[#2b2b43]">State</label>
                    <select className={`${inputClass} appearance-none pr-10`} {...register(`qualifications.${index}.state`)}>
                      <option value="">Type or select state</option>
                      {INDIAN_STATES.map((state) => (
                        <option key={state} value={state}>{state}</option>
                      ))}
                    </select>
                    <ChevronDown className="pointer-events-none absolute right-3 top-[70%] size-4 -translate-y-1/2 text-[#7b1fa2]" />
                  </div>

                  <div className="group relative">
                    <label className="mb-1 block text-sm text-[#2b2b43]">City</label>
                    <select className={`${inputClass} appearance-none pr-10`} disabled={!selectedState} {...register(`qualifications.${index}.city`)}>
                      <option value="">{selectedState ? "Type or select city" : "Select state first"}</option>
                      {cityOptions.map((city) => (
                        <option key={city} value={city}>{city}</option>
                      ))}
                    </select>
                    <ChevronDown className="pointer-events-none absolute right-3 top-[70%] size-4 -translate-y-1/2 text-[#7b1fa2]" />
                  </div>
                </div>
              </div>
            );
          })}

          <button
            type="button"
            className="sm:col-span-2 inline-flex items-center gap-2 justify-self-start rounded-xl border border-[#cabaf8] px-4 py-2 text-sm font-semibold text-[#5f2bb3] hover:bg-[#f3edff]"
            onClick={() => appendQualification({ qualification: "", college: "", country: "", state: "", city: "" })}
          >
            <Plus size={15} /> Add More Qualifications
          </button>

          <button type="submit" disabled={isSubmitting} className="sm:col-span-2 mt-3 rounded-xl bg-gradient-to-r from-[#d81b60] via-[#7b1fa2] to-[#3b0aa3] px-6 py-3 text-base font-aptos-extrabold text-white shadow-[0_12px_30px_rgba(123,31,162,0.35)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_44px_rgba(216,27,96,0.4)] disabled:opacity-70">
            {isSubmitting ? "Submitting..." : "Create Doctor Account"}
          </button>
          {submitMessage && <p className={`sm:col-span-2 text-sm font-medium ${submitSuccess ? "text-emerald-600" : "text-red-500"}`}>{submitMessage}</p>}
        </form>
      </section>
    </main>
  );
}
