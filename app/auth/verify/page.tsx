"use client";
import React from "react";

import { useState } from "react";
import { useRouter } from "next/navigation";
import LottieSuccess from "@/components/LottieSuccess";
import ModernModal from "@/components/ModernModal";
import OtpInput from "@/components/OtpInput";
import { CheckCircle2 } from "lucide-react";

export default function VerifyPage() {
  const [emailCode, setEmailCode] = useState("");
  const [phoneCode, setPhoneCode] = useState("");
  const [emailVerified, setEmailVerified] = useState(false);
  const [phoneVerified, setPhoneVerified] = useState(false);
  const [error, setError] = useState("");
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [showPhoneModal, setShowPhoneModal] = useState(false);
  const [loadingEmail, setLoadingEmail] = useState(false);
  const [loadingPhone, setLoadingPhone] = useState(false);
  // Resend logic
  const [resendEmailLoading, setResendEmailLoading] = useState(false);
  const [resendPhoneLoading, setResendPhoneLoading] = useState(false);
  const [emailResent, setEmailResent] = useState(false);
  const [phoneResent, setPhoneResent] = useState(false);
  const [emailCooldown, setEmailCooldown] = useState(0);
  const [phoneCooldown, setPhoneCooldown] = useState(0);
  // Cooldown timers
  React.useEffect(() => {
    let timer: NodeJS.Timeout;
    if (emailCooldown > 0) {
      timer = setTimeout(() => setEmailCooldown(emailCooldown - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [emailCooldown]);
  React.useEffect(() => {
    let timer: NodeJS.Timeout;
    if (phoneCooldown > 0) {
      timer = setTimeout(() => setPhoneCooldown(phoneCooldown - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [phoneCooldown]);

  // Resend handlers
  const handleResendEmail = async () => {
    setResendEmailLoading(true);
    setEmailResent(false);
    setError("");
    try {
      // Replace with your actual API endpoint
      await fetch("/api/auth/send-email-verification", { method: "POST" });
      setEmailResent(true);
      setEmailCooldown(30); // 30s cooldown
    } catch {
      setError("Failed to resend email code.");
    } finally {
      setResendEmailLoading(false);
    }
  };
  const handleResendPhone = async () => {
    setResendPhoneLoading(true);
    setPhoneResent(false);
    setError("");
    try {
      // Replace with your actual API endpoint
      await fetch("/api/auth/send-phone-otp", { method: "POST" });
      setPhoneResent(true);
      setPhoneCooldown(30); // 30s cooldown
    } catch {
      setError("Failed to resend phone code.");
    } finally {
      setResendPhoneLoading(false);
    }
  };
  const router = useRouter();

  // Redirect to /login when both are verified
  if (typeof window !== "undefined" && emailVerified && phoneVerified) {
    setTimeout(() => {
      window.location.href = "/auth/login";
    }, 1200);
  }

  const handleVerifyEmail = async () => {
    setError("");
    setLoadingEmail(true);
    const res = await fetch("/api/auth/verify-email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token: emailCode }),
    });
    const data = await res.json();
    setLoadingEmail(false);
    if (data.success) {
      setEmailVerified(true);
      setShowEmailModal(true);
    } else setError(data.message || "Invalid code");
  };

  const handleVerifyPhone = async () => {
    setError("");
    setLoadingPhone(true);
    const res = await fetch("/api/auth/verify-phone", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code: phoneCode }),
    });
    const data = await res.json();
    setLoadingPhone(false);
    if (data.success) {
      setPhoneVerified(true);
      setShowPhoneModal(true);
    } else setError(data.message || "Invalid code");
  };

  // Stepper logic
  const currentStep = emailVerified ? (phoneVerified ? 2 : 1) : 0;
  const steps = [
    { label: "Email", done: emailVerified },
    { label: "Phone", done: phoneVerified },
  ];

  return (
    <div className="min-h-screen w-full bg-blue-600 flex items-center justify-center">
      <div className="max-w-sm w-full mx-auto mt-8 p-4 bg-white/90 rounded-xl shadow-lg relative backdrop-blur-md border border-gray-100 min-h-[480px]">
        {/* Email Verified Modal */}
        <ModernModal
          open={showEmailModal}
          onClose={() => setShowEmailModal(false)}
          autoClose
          duration={2000}
        >
          <LottieSuccess className="w-32 h-32" />
          <CheckCircle2 className="w-10 h-10 text-green-500 -mt-6 mb-1 bg-white rounded-full border-4 border-white shadow-lg" />
          <div className="text-green-600 font-semibold text-base mb-2">
            Email verified successfully!
          </div>
        </ModernModal>
        {/* Phone Verified Modal */}
        <ModernModal
          open={showPhoneModal}
          onClose={() => setShowPhoneModal(false)}
          autoClose
          duration={2000}
        >
          <LottieSuccess className="w-32 h-32" />
          <CheckCircle2 className="w-10 h-10 text-green-500 -mt-6 mb-1 bg-white rounded-full border-4 border-white shadow-lg" />
          <div className="text-green-600 font-semibold text-base mb-2">
            Phone verified successfully!
          </div>
        </ModernModal>

        {/* Stepper */}
        <div className="flex items-center justify-center gap-3 mb-4">
          {steps.map((step, idx) => (
            <div key={step.label} className="flex items-center">
              <div
                className={`w-8 h-8 flex items-center justify-center rounded-full border-2 transition-all duration-200 ${
                  idx < currentStep
                    ? "bg-green-500 border-green-500 text-white"
                    : idx === currentStep
                    ? "bg-blue-100 border-blue-500 text-blue-700"
                    : "bg-gray-100 border-gray-300 text-gray-400"
                }`}
              >
                {step.done ? <CheckCircle2 className="w-5 h-5" /> : idx + 1}
              </div>
              {idx < steps.length - 1 && (
                <div className="w-8 h-1 bg-gray-200 mx-1 rounded" />
              )}
            </div>
          ))}
        </div>

        <h2 className="text-lg font-bold mb-1 text-center font-sans tracking-tight">
          Verify Your Account
        </h2>
        <p className="mb-3 text-xs text-gray-600 text-center">
          Enter the code sent to your email and phone.{" "}
          <span className="font-semibold text-blue-600">
            (Use <b>111111</b> for both in test mode.)
          </span>
        </p>

        {/* Email OTP */}
        <div className="mb-4 mt-6">
          <label className="block text-xs font-semibold mb-1 text-gray-700">
            Email Verification Code
          </label>
          <div className="flex items-center gap-1 justify-center">
            <OtpInput
              value={emailCode}
              onChange={setEmailCode}
              disabled={emailVerified}
            />
            {emailVerified && (
              <CheckCircle2 className="w-5 h-5 text-green-500 ml-2" />
            )}
          </div>
          {/* Resend link */}
          {!emailVerified && (
            <div className="flex items-center justify-center mt-1 mb-1">
              {emailCooldown > 0 ? (
                <button
                  type="button"
                  className="text-xs text-gray-400 disabled:cursor-not-allowed flex items-center gap-1"
                  disabled
                >
                  {resendEmailLoading ? (
                    <span className="loader mr-1"></span>
                  ) : null}
                  Resend in {emailCooldown}s
                </button>
              ) : (
                <span className="text-xs text-gray-700">
                  Didn't get the verification code?{" "}
                  <button
                    type="button"
                    className="text-blue-600 hover:underline disabled:text-gray-400 disabled:cursor-not-allowed"
                    onClick={handleResendEmail}
                    disabled={resendEmailLoading}
                  >
                    {resendEmailLoading ? (
                      <span className="loader mr-1"></span>
                    ) : null}
                    Resend
                  </button>
                </span>
              )}
              {emailResent && (
                <span className="ml-2 text-green-600 text-xs">
                  Code resent!
                </span>
              )}
            </div>
          )}
          <button
            className="mt-2 w-full bg-blue-600 text-white px-3 py-1.5 rounded-md disabled:opacity-50 flex items-center justify-center gap-2 transition-all hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
            onClick={handleVerifyEmail}
            disabled={emailVerified || emailCode.length !== 6 || loadingEmail}
          >
            {loadingEmail && <span className="loader mr-2"></span>}
            {emailVerified ? "Verified" : "Verify Email"}
          </button>
        </div>

        {/* Phone OTP */}
        <div className="mb-2">
          <label className="block text-xs font-semibold mb-1 text-gray-700">
            Phone Verification Code
          </label>
          <div className="flex items-center gap-1 justify-center">
            <OtpInput
              value={phoneCode}
              onChange={setPhoneCode}
              disabled={!emailVerified || phoneVerified}
            />
            {phoneVerified && (
              <CheckCircle2 className="w-5 h-5 text-green-500 ml-2" />
            )}
          </div>
          {/* Resend link */}
          {!phoneVerified && emailVerified && (
            <div className="flex items-center justify-center mt-1 mb-1">
              {phoneCooldown > 0 ? (
                <button
                  type="button"
                  className="text-xs text-gray-400 disabled:cursor-not-allowed flex items-center gap-1"
                  disabled
                >
                  {resendPhoneLoading ? (
                    <span className="loader mr-1"></span>
                  ) : null}
                  Resend in {phoneCooldown}s
                </button>
              ) : (
                <span className="text-xs text-gray-700">
                  Didn't get the verification code?{" "}
                  <button
                    type="button"
                    className="text-blue-600 hover:underline disabled:text-gray-400 disabled:cursor-not-allowed"
                    onClick={handleResendPhone}
                    disabled={resendPhoneLoading}
                  >
                    {resendPhoneLoading ? (
                      <span className="loader mr-1"></span>
                    ) : null}
                    Resend
                  </button>
                </span>
              )}
              {phoneResent && (
                <span className="ml-2 text-green-600 text-xs">
                  Code resent!
                </span>
              )}
            </div>
          )}
          <button
            className="mt-2 w-full bg-blue-600 text-white px-3 py-1.5 rounded-md disabled:opacity-50 flex items-center justify-center gap-2 transition-all hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
            onClick={handleVerifyPhone}
            disabled={
              !emailVerified ||
              phoneVerified ||
              phoneCode.length !== 6 ||
              loadingPhone
            }
          >
            {loadingPhone && <span className="loader mr-2"></span>}
            {phoneVerified ? "Verified" : "Verify Phone"}
          </button>
          {!emailVerified && (
            <div className="text-xs text-gray-500 mt-1">
              Please verify your email first.
            </div>
          )}
        </div>

        {emailVerified && phoneVerified && (
          <div className="text-green-600 font-semibold mt-3 text-center text-base animate-fadeIn">
            Account fully verified! You can now log in.
          </div>
        )}
        {error && (
          <div className="text-red-500 text-sm mb-2 animate-fadeIn">
            {error}
          </div>
        )}

        {/* Loader spinner style */}
        <style jsx>{`
          .loader {
            border: 2px solid #e5e7eb;
            border-top: 2px solid #2563eb;
            border-radius: 50%;
            width: 1.2em;
            height: 1.2em;
            animation: spin 0.7s linear infinite;
          }
          @keyframes spin {
            0% {
              transform: rotate(0deg);
            }
            100% {
              transform: rotate(360deg);
            }
          }
        `}</style>
      </div>
    </div>
  );
}
