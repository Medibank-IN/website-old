"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { CalendarDays, ChevronDown } from "lucide-react";
import { useForm } from "react-hook-form";
import { INDIA_STATE_CITY_MAP, INDIAN_STATES } from "@/lib/indiaLocations";

function HeroWaveBackground() {
  return (
    <div className="pointer-events-none absolute inset-x-0 top-0 z-0 h-[100vh] overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(180deg,#C9C6EA_0%,#E8C9DF_55%,#F3E6F2_100%)]" />

      <svg className="hero-band hero-band-top absolute inset-x-0 h-[40%] w-full" viewBox="0 0 1440 320" preserveAspectRatio="none">
        <g className="wave-track wave-track-top">
          <path d="M0,140 C240,90 520,90 720,135 C940,185 1180,185 1440,135 L1440,0 L0,0 Z" fill="#FFFFFF" fillOpacity="0.34" />
          <path d="M1440,135 C1680,90 1960,90 2160,135 C2380,185 2620,185 2880,135 L2880,0 L1440,0 Z" fill="#FFFFFF" fillOpacity="0.34" />
        </g>
      </svg>

      <svg className="hero-band hero-band-mid absolute inset-x-0 top-[24%] h-[50%] w-full" viewBox="0 0 1440 340" preserveAspectRatio="none">
        <g className="wave-track wave-track-mid">
          <path d="M0,155 C260,215 520,215 740,165 C980,110 1210,115 1440,165 L1440,340 L0,340 Z" fill="#FFFFFF" fillOpacity="0.42" />
          <path d="M1440,165 C1700,215 1960,215 2180,165 C2420,110 2650,115 2880,165 L2880,340 L1440,340 Z" fill="#FFFFFF" fillOpacity="0.42" />
        </g>
      </svg>

      <svg className="hero-band hero-band-bottom absolute inset-x-0 bottom-0 h-[48%] w-full" viewBox="0 0 1440 320" preserveAspectRatio="none">
        <g className="wave-track wave-track-bottom">
          <path d="M0,110 C250,35 520,40 720,105 C950,180 1180,185 1440,115 L1440,320 L0,320 Z" fill="#FFFFFF" fillOpacity="0.98" />
          <path d="M1440,115 C1690,35 1960,40 2160,105 C2390,180 2620,185 2880,115 L2880,320 L1440,320 Z" fill="#FFFFFF" fillOpacity="0.98" />
        </g>
      </svg>

      <style jsx>{`
        .hero-band {
          will-change: transform;
          mix-blend-mode: screen;
          animation: bandFloat 7.5s ease-in-out infinite;
        }
        .hero-band-top {
          filter: drop-shadow(0 10px 28px rgba(255, 255, 255, 0.45));
        }
        .hero-band-mid {
          filter: drop-shadow(0 12px 30px rgba(255, 255, 255, 0.5));
          animation-delay: -1.8s;
        }
        .hero-band-bottom {
          filter: drop-shadow(0 14px 30px rgba(255, 255, 255, 0.55));
          animation-delay: -3.4s;
        }
        .wave-track {
          will-change: transform;
          transform: translateX(0);
        }
        .wave-track-top {
          animation: waveSlideLeft 12s linear infinite;
        }
        .wave-track-mid {
          animation: waveSlideRight 15s linear infinite;
        }
        .wave-track-bottom {
          animation: waveSlideLeft 9s linear infinite;
        }
        @keyframes bandFloat {
          0%,
          100% {
            transform: translate3d(0, 0, 0);
          }
          50% {
            transform: translate3d(0, 12px, 0);
          }
        }
        @keyframes waveSlideLeft {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-1440px);
          }
        }
        @keyframes waveSlideRight {
          0% {
            transform: translateX(-1440px);
          }
          100% {
            transform: translateX(0);
          }
        }
      `}</style>
    </div>
  );
}

const inputClass =
  "w-full rounded-xl border border-[#ddd9f5] bg-[#faf9ff] px-4 py-3 text-sm outline-none transition duration-300 placeholder:text-[#79778f] focus:border-[#7b1fa2] focus:ring-2 focus:ring-[#7b1fa2]/20";

export default function UserRegistrationPage() {
  const router = useRouter();
  const [showForm, setShowForm] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");

  const {
    register,
    watch,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      fullName: "",
      dob: "",
      gender: "",
      mobile: "",
      email: "",
      referralCode: "",
      state: "",
      city: "",
    },
  });

  const selectedState = watch("state");
  const cityOptions = useMemo(() => INDIA_STATE_CITY_MAP[selectedState] || [], [selectedState]);

  useEffect(() => {
    const timer = setTimeout(() => setShowForm(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  const onSubmit = async (formValues) => {
    setSubmitMessage("");

    const response = await fetch("/api/user/addUserdataToSheet", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formValues),
    });

    const result = await response.json();

    if (!response.ok || !result.success) {
      setSubmitMessage(result.message || "Registration failed. Please try again.");
      return;
    }

    const query = new URLSearchParams({
      registrationId: result.data.registrationId,
      fullName: result.data.fullName,
      email: result.data.email,
    });

    router.push(`/payment?${query.toString()}`);
  };

  return (
    <main className="relative overflow-hidden bg-gradient-to-b from-[#eef4ff] via-[#f8eefe] to-white px-4 py-12 md:py-36">
      <HeroWaveBackground />
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-20 top-16 h-56 w-56 rounded-full bg-[#d81b60]/20 blur-3xl" />
        <div className="absolute -right-16 bottom-8 h-64 w-64 rounded-full bg-[#3b0aa3]/20 blur-3xl" />
      </div>

      <section className="relative mx-auto w-full max-w-5xl rounded-3xl border border-white/60 bg-white/80 p-4 shadow-[0_20px_60px_rgba(59,10,163,0.14)] backdrop-blur-sm sm:p-8 md:p-10">
        <div className={`grid gap-8 transition-all duration-700 ${showForm ? "lg:grid-cols-[1.1fr_1fr]" : "max-w-xl mx-auto"}`}>
          <div className="rounded-2xl bg-gradient-to-br from-[#d81b60] via-[#7b1fa2] to-[#3b0aa3] p-6 text-white md:p-8">
            <p className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs tracking-[0.14em] text-white/90">CREATE YOUR HEALTH IDENTITY</p>
            <h1 className="font-aptos-black text-3xl leading-tight md:text-4xl">Quick User Registration</h1>
            <p className="mt-4 max-w-md text-sm text-white/85 md:text-base">
              Register in a few steps and keep your medical records secure, portable, and always in your control.
            </p>

            <div className="mt-8 rounded-2xl border border-white/20 bg-white/10 p-4">
              {/* <button
                type="button"
                className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl bg-white px-4 py-3 font-aptos-extrabold text-[#5310a2] shadow-lg transition hover:brightness-105"
              >
                <span>Register with</span>
                <Image src="/images/aadhar.png" alt="aadhar image" width={40} height={30} />
              </button>
              <div className="my-4 flex items-center gap-3 text-sm text-white/75">
                <span className="h-px flex-1 bg-white/30" />or<span className="h-px flex-1 bg-white/30" />
              </div> */}
              <p className="text-sm text-white/90">{showForm ? "Fill your details here." : "Preparing secure form..."}</p>
            </div>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className={`grid overflow-hidden rounded-2xl bg-white p-2 transition-all duration-700 ease-out sm:grid-cols-2 ${
              showForm ? "max-h-[1200px] translate-y-0 opacity-100" : "pointer-events-none max-h-0 translate-y-6 opacity-0"
            }`}
          >
            <div className="sm:col-span-2">
              <label className="mb-1 block text-sm text-[#2b2b43]">Full Name</label>
              <input
                className={`${inputClass} ${errors.fullName ? "border-red-400 focus:border-red-500 focus:ring-red-200" : ""}`}
                type="text"
                placeholder="Enter your full name"
                {...register("fullName", {
                  required: "Full name is required.",
                  minLength: { value: 3, message: "Name should be at least 3 characters." },
                  pattern: { value: /^[a-zA-Z\s.]+$/, message: "Only letters and spaces are allowed." },
                })}
              />
              {errors.fullName && <p className="mt-1 text-xs text-red-500">{errors.fullName.message}</p>}
            </div>

            <div>
              <label className="mb-1 block text-sm text-[#2b2b43]">DOB</label>
              <div className="relative">
                <CalendarDays className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-[#7b1fa2]" />
                <input
                  className={`${inputClass} pr-9 ${errors.dob ? "border-red-400 focus:border-red-500 focus:ring-red-200" : ""}`}
                  type="date"
                  max={new Date().toISOString().split("T")[0]}
                  {...register("dob", {
                    required: "Date of birth is required.",
                    validate: (value) => {
                      if (!value) return "Date of birth is required.";
                      const age = new Date().getFullYear() - new Date(value).getFullYear();
                      return age >= 1 || "Please enter a valid date of birth.";
                    },
                  })}
                />
              </div>
              {errors.dob && <p className="mt-1 text-xs text-red-500">{errors.dob.message}</p>}
            </div>

            <div>
              <label className="mb-1 block text-sm text-[#2b2b43]">Sex / Gender</label>
              <div className="group relative">
                <select
                  className={`${inputClass} appearance-none pr-10 ${errors.gender ? "border-red-400 focus:border-red-500 focus:ring-red-200" : ""}`}
                  {...register("gender", { required: "Please select your gender." })}
                >
                  <option value="">Select</option>
                  <option value="female">Female</option>
                  <option value="male">Male</option>
                  <option value="transgender">Transgender</option>
                </select>
                <ChevronDown className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-[#7b1fa2] transition group-focus-within:rotate-180" />
              </div>
              {errors.gender && <p className="mt-1 text-xs text-red-500">{errors.gender.message}</p>}
            </div>

            <div>
              <label className="mb-1 block text-sm text-[#2b2b43]">Mobile Number</label>
              <input
                className={`${inputClass} ${errors.mobile ? "border-red-400 focus:border-red-500 focus:ring-red-200" : ""}`}
                type="tel"
                placeholder="10-digit mobile number"
                {...register("mobile", {
                  required: "Mobile number is required.",
                  pattern: { value: /^[6-9]\d{9}$/, message: "Enter a valid 10-digit Indian mobile number." },
                })}
              />
              {errors.mobile && <p className="mt-1 text-xs text-red-500">{errors.mobile.message}</p>}
            </div>

            <div>
              <label className="mb-1 block text-sm text-[#2b2b43]">Email</label>
              <input
                className={`${inputClass} ${errors.email ? "border-red-400 focus:border-red-500 focus:ring-red-200" : ""}`}
                type="email"
                placeholder="you@example.com"
                {...register("email", {
                  required: "Email is required.",
                  pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Enter a valid email address." },
                })}
              />
              {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>}
            </div>

            <div>
              <label className="mb-1 block text-sm text-[#2b2b43]">State</label>
              <div className="group relative">
                <select
                  className={`${inputClass} appearance-none pr-10 ${errors.state ? "border-red-400 focus:border-red-500 focus:ring-red-200" : ""}`}
                  {...register("state", {
                    required: "Please select your state.",
                    onChange: () => setValue("city", ""),
                  })}
                >
                  <option value="">Select state</option>
                  {INDIAN_STATES.map((state) => (
                    <option key={state} value={state}>
                      {state}
                    </option>
                  ))}
                </select>
                <ChevronDown className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-[#7b1fa2] transition group-focus-within:rotate-180" />
              </div>
              {errors.state && <p className="mt-1 text-xs text-red-500">{errors.state.message}</p>}
            </div>

            <div>
              <label className="mb-1 block text-sm text-[#2b2b43]">Referral Code (Optional)</label>
              <input
                className={`${inputClass} ${errors.referralCode ? "border-red-400 focus:border-red-500 focus:ring-red-200" : ""}`}
                type="text"
                placeholder="Enter referral code"
                {...register("referralCode", {
                  pattern: { value: /^[a-zA-Z0-9]{4,20}$/, message: "Use 4-20 letters or numbers only." },
                })}
              />
              {errors.referralCode && <p className="mt-1 text-xs text-red-500">{errors.referralCode.message}</p>}
            </div>

            <div>
              <label className="mb-1 block text-sm text-[#2b2b43]">City / Town</label>
              <div className="group relative">
                <select
                  disabled={!selectedState}
                  className={`${inputClass} appearance-none pr-10 disabled:cursor-not-allowed disabled:opacity-70 ${
                    errors.city ? "border-red-400 focus:border-red-500 focus:ring-red-200" : ""
                  }`}
                  {...register("city", { required: "Please select your city." })}
                >
                  <option value="">{selectedState ? "Select city" : "Select state first"}</option>
                  {cityOptions.map((city) => (
                    <option key={city} value={city}>
                      {city}
                    </option>
                  ))}
                </select>
                <ChevronDown className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-[#7b1fa2] transition group-focus-within:rotate-180" />
              </div>
              {errors.city && <p className="mt-1 text-xs text-red-500">{errors.city.message}</p>}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="sm:col-span-2 mt-3 rounded-xl bg-gradient-to-r from-[#d81b60] via-[#7b1fa2] to-[#3b0aa3] px-6 py-3 text-base font-aptos-extrabold text-white shadow-[0_12px_30px_rgba(123,31,162,0.35)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_44px_rgba(216,27,96,0.4)] disabled:opacity-70"
            >
              {isSubmitting ? "Validating..." : "Register"}
            </button>

            {submitMessage && <p className="sm:col-span-2 text-sm font-medium text-red-600">{submitMessage}</p>}
          </form>
        </div>
      </section>
    </main>
  );
}
