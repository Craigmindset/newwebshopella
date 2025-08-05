"use client";

import { useState } from "react";
import Image from "next/image";

export default function NewsLetter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      setStatus("Please enter a valid email address.");
      return;
    }
    setStatus("Thank you for subscribing!");
    setEmail("");
  };

  return (
    <section
      className="w-full bg-cover bg-black mx-auto bg-center py-16 px-4  flex flex-col items-center justify-center text-center text-white"
      style={{ backgroundImage: "url('/newsletter-bg.jpg')" }}
    >
      <div className="bg-black/50 p-8 rounded-lg max-w-2xl w-full">
        <h2 className="text-base sm:text-lg md:text-xl font-semibold mb-4">
          Subscribe to our newsletter to get updates and tips about the latest
          discounts, coupon, reviews and more.
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="w-full px-4 py-3 rounded-md text-gray-800 bg-white placeholder-gray-500 focus:outline-none"
          />
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 transition-all text-white font-semibold py-3 rounded-md"
          >
            Subscribe Now
          </button>
        </form>
        {status && <p className="mt-4 text-sm text-green-300">{status}</p>}
      </div>
    </section>
  );
}
