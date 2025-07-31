"use client";
import { useState, useEffect } from "react";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  // Load cached email on mount
  useEffect(() => {
    const cachedEmail = localStorage.getItem("admin-login-email");
    if (cachedEmail) setEmail(cachedEmail);
  }, []);

  // Cache email on change
  useEffect(() => {
    if (email) localStorage.setItem("admin-login-email", email);
  }, [email]);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showForgot, setShowForgot] = useState(false);
  const [forgotSent, setForgotSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Replace with real authentication logic
    if (email === "admin@shopella.com" && password === "admin123") {
      window.location.href = "/admindesk/dashboard";
    } else {
      setError("Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative" style={{ backgroundImage: 'url(/bgwht.jpg)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <div className="absolute inset-0 bg-[#466cf4] opacity-20 pointer-events-none" />
      <div className="relative w-full flex items-center justify-center">
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-lg shadow-lg p-8 w-full max-w-sm mx-2 sm:mx-auto"
        >
          <img
            src="/Shopella Logo Design.png"
            alt="Shopella Logo"
            className="mx-auto mb--5 w-32 h-32 object-contain"
          />
        <h2 className="text-2xl font-bold mb-6 text-[#466cf4] text-center">
          Admin Login
        </h2>
        <div className="mb-4">
          <label className="block mb-1 text-sm font-medium text-gray-700">Email</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              <Mail size={18} />
            </span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-10 px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#466cf4]"
              required
            />
          </div>
        </div>
        <div className="mb-4">
          <label className="block mb-1 text-sm font-medium text-gray-700">Password</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              <Lock size={18} />
            </span>
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-10 pr-10 px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#466cf4]"
              required
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 focus:outline-none"
              onClick={() => setShowPassword((prev) => !prev)}
              tabIndex={-1}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
            <div className="mt-2 text-right">
              <button
                type="button"
                className="text-xs text-[#466cf4] hover:underline focus:outline-none"
                onClick={() => setShowForgot(true)}
              >
                Forgot password?
              </button>
            </div>
        </div>
        {error && (
          <div className="mb-4 text-red-500 text-sm text-center">{error}</div>
        )}
        <Button type="submit" className="w-full bg-[#466cf4] text-white">
          Login
        </Button>
          {/* Forgot Password Modal */}
          {showForgot && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
              <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-xs relative">
                <button
                  className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
                  onClick={() => setShowForgot(false)}
                  aria-label="Close"
                >
                  &times;
                </button>
                <h3 className="text-lg font-bold mb-4 text-[#466cf4] text-center">Reset Password</h3>
                <form
                  onSubmit={e => {
                    e.preventDefault();
                    setForgotSent(true);
                    setTimeout(() => {
                      setShowForgot(false);
                      setForgotSent(false);
                    }, 2000);
                  }}
                >
                  <label className="block text-sm font-medium mb-2 text-gray-700">Email</label>
                  <input
                    type="email"
                    required
                    className="border px-3 py-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-[#466cf4] mb-4"
                    placeholder="Enter your email"
                  />
                  <Button type="submit" className="w-full bg-[#466cf4] text-white">Send Reset Link</Button>
                  {forgotSent && (
                    <div className="text-green-600 text-xs mt-3 text-center">Reset link sent!</div>
                  )}
                </form>
              </div>
            </div>
          )}
      </form>
      </div>
    </div>
  );
}
