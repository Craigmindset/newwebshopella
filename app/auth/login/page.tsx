"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Eye, EyeOff, Mail, Lock, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/useAuth";
import Image from "next/image";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      login({ name: formData.email.split("@")[0], email: formData.email });
      router.push("/dashboard/user");
    } catch (error) {
      console.error("Login error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row items-center justify-center bg-[#f5f9ff] px-4 lg:px-16 py-12 relative">
      <Image
        src="/background-img.jpg"
        alt="Shopella Hero Background"
        fill
        className="absolute inset-0 object-cover opacity-30 z-[-10]"
        priority
      />

      {/* Left Section */}
      <div className="w-full lg:w-1/2 flex flex-col items-center justify-center relative">
        <div className="max-w-md relative">
          <Image
            src="https://hlfwfvupabrc8fwr.public.blob.vercel-storage.com/Hand%20Holding%20Shopella%20Wallet%20Card%20%281%29.png"
            alt="Hand holding Shopella Wallet Card"
            width={400}
            height={400}
            className="mx-auto mb-2"
          />
          <div className="bg-white shadow rounded-lg px-6 py-4 mt-0 text-center">
            <p className="text-gray-800 text-sm font-medium leading-relaxed">
              your credit-powered e-commerce platform. <br />
              access instant wallet loans and shop top products with the best
              deal.
            </p>
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div className="w-full lg:w-1/2 max-w-md bg-white rounded-xl shadow-md p-6 md:p-10 mt-10 lg:mt-0 relative">
        {/* Close icon - match signup page position */}
        <button
          type="button"
          onClick={() => router.push("/")}
          className="absolute top-4 right-4 p-2 rounded-full bg-white shadow hover:bg-gray-100 transition-all z-10"
          aria-label="Close and return to Home"
        >
          <X className="w-5 h-5 text-gray-500" />
        </button>
        <div className="text-center mb-6">
          <Link href="/" className="text-[24px] font-bold text-[#466cf4]">
            Shopella
          </Link>
          <h1 className="mt-1 text-xl font-semibold text-gray-800">
            Welcome Back
          </h1>
          <p className="text-sm text-gray-500">Sign in to your account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              id="email"
              name="email"
              type="email"
              required
              value={formData.email}
              onChange={handleInputChange}
              className="pl-10 h-12"
              placeholder="Enter your email"
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              required
              value={formData.password}
              onChange={handleInputChange}
              className="pl-10 pr-10 h-12"
              placeholder="Enter your password"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5" />
              ) : (
                <Eye className="h-5 w-5" />
              )}
            </button>
          </div>

          <div className="flex justify-between text-sm text-gray-600">
            <label className="flex items-center gap-2">
              <input type="checkbox" className="accent-[#466cf4]" />
              Remember me
            </label>
            <Link
              href="/auth/forgot-password"
              className="text-[#466cf4] hover:underline"
            >
              Forgot password?
            </Link>
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full h-12 bg-[#466cf4] hover:bg-[#3a5ce0] text-white font-semibold text-lg transition-all active:opacity-80 focus:opacity-80"
          >
            {isLoading ? "Signing In..." : "Sign In"}
          </Button>

          <div className="text-center text-gray-500 text-sm">
            Or continue with
          </div>

          <Button
            type="button"
            variant="outline"
            className="w-full flex items-center justify-center gap-2 border-gray-300 h-12 transition-all active:opacity-80 focus:opacity-80"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M21.35 11.1h-9.4v2.9h5.4c-.25 1.4-1.1 2.6-2.3 3.4v2.8h3.6c2.1-2 3.3-4.8 3.3-8.1z" />
              <path d="M12 22.5c2.9 0 5.4-1 7.2-2.7l-3.5-2.8c-1 0.7-2.2 1.1-3.7 1.1-2.9 0-5.3-1.9-6.2-4.5H2.2v2.8C4 20.5 7.7 22.5 12 22.5z" />
              <path d="M5.8 13.6c-.2-.7-.3-1.4-.3-2.1s.1-1.4.3-2.1V7.1H2.2C1.4 8.6 1 10.2 1 12s.4 3.5 1.2 4.9l2.8-2.3z" />
              <path d="M12 5.4c1.6 0 3.1.6 4.2 1.6l3.2-3.2C17.5 2.1 15 1 12 1 7.7 1 4 3.5 2.2 7.1l3.7 2.8C6.8 6.8 9.2 5.4 12 5.4z" />
            </svg>
            Google
          </Button>
        </form>

        <p className="text-center mt-6 text-gray-600">
          Don’t have an account?{" "}
          <Link
            href="/auth/signup"
            className="text-[#466cf4] hover:text-[#3a5ce0] font-medium"
          >
            Sign up
          </Link>
        </p>

        <div className="mt-4 text-center text-sm">
          <Link href="/" className="text-gray-500 hover:text-gray-700">
            Continue as Guest
          </Link>
        </div>
      </div>
    </div>
  );
}
