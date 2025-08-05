"use client";

import Image from "next/image";
import Link from "next/link";

export default function ThreeColumnAd() {
  const products = [
    {
      id: 1,
      title: "Cool New",
      name: "AIRPODS PRO",
      img: "https://hlfwfvupabrc8fwr.public.blob.vercel-storage.com/double-door-freeze.png", // double door freezer image
      gradient: "from-gray-600 to-gray-800",
      link: "/category/airpods",
      btnColor: "bg-white text-gray-800 hover:bg-gray-200",
    },
    {
      id: 2,
      title: "Sleek Trendy",
      name: "APPLE WATCH",
      img: "/Apple Watch.jpg", // use local Apple Watch image
      gradient: "from-red-400 to-red-600",
      link: "/category/apple-watch",
      btnColor: "bg-white text-red-600 hover:bg-gray-100",
    },
    {
      id: 3,
      title: "Ultra Powerful",
      name: "MACBOOK",
      img: "/Generator.jpg", // use local Generator image
      gradient: "from-blue-400 to-blue-600",
      link: "/category/macbook",
      btnColor: "bg-white text-blue-700 hover:bg-blue-100",
    },
    {
      id: 4,
      title: "Smart Entertainment",
      name: "SMART TV",
      img: "https://hlfwfvupabrc8fwr.public.blob.vercel-storage.com/SmartTV.png", // Smart TV image
      gradient: "from-green-400 to-green-600",
      link: "/category/smart-tv",
      btnColor: "bg-white text-green-700 hover:bg-green-100",
    },
  ];

  return (
    <section className="w-full max-w-6xl mx-auto grid grid-cols-4 gap-3 p-4">
      {products.map((product) => (
        <div
          key={product.id}
          className={`rounded-2xl shadow-lg p-0 flex flex-col items-center justify-center text-center min-h-[210px] w-full h-full overflow-hidden relative`}
          style={{ position: "relative" }}
        >
          <Image
            src={product.img}
            alt={product.name}
            fill
            className="object-cover w-full h-full"
            style={{ borderRadius: "1rem" }}
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
            <h2 className="text-white text-lg md:text-xl font-extrabold mb-2 drop-shadow-lg">
              {product.name}
            </h2>
            <Link
              href={product.link}
              className="inline-block px-3 py-1.5 rounded-full text-sm font-semibold bg-white text-red-600 hover:bg-gray-100 hover:scale-105 hover:shadow-xl transition-all duration-200 drop-shadow-lg"
            >
              Browse Store
            </Link>
          </div>
          <div className="absolute inset-0 bg-black/30 rounded-2xl z-5" />
        </div>
      ))}
    </section>
  );
}
