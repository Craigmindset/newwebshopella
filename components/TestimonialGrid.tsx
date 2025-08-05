"use client";

import Image from "next/image";

const testimonials = [
  {
    name: "Jane Doe",
    role: "Verified Buyer",
    avatar: "/placeholder-user.jpg",
    text: "Absolutely love the quality and speed of delivery. Highly recommended!",
  },
  {
    name: "John Smith",
    role: "Store Merchant",
    avatar: "/placeholder-logo.png",
    text: "The platform makes selling easy and efficient. Great support team!",
  },
  {
    name: "Aisha Bello",
    role: "Repeat Customer",
    avatar: "/placeholder-user.jpg",
    text: "Modern UI, fast checkout, and amazing deals. My go-to shop!",
  },
];

export default function TestimonialGrid() {
  return (
    <section className="w-full max-w-5xl mx-auto py-8 px-4">
      <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
        What Our Customers Say
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {testimonials.map((t, idx) => (
          <div
            key={idx}
            className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center text-center border border-gray-100 hover:shadow-lg transition-all duration-200"
          >
            <Image
              src={t.avatar}
              alt={t.name}
              width={56}
              height={56}
              className="rounded-full mb-3 object-cover"
            />
            <p className="text-gray-700 text-base mb-4 italic">
              <span className="text-xl text-red-500 mr-2">“</span>
              {t.text}
              <span className="text-xl text-red-500 ml-2">”</span>
            </p>
            <div className="mt-auto">
              <span className="font-semibold text-gray-900">{t.name}</span>
              <span className="block text-xs text-gray-500">{t.role}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
