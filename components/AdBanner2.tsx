"use client";

import Image from "next/image";
import Link from "next/link";

export default function AdBanner() {
  return (
    <section className="w-full max-w-6xl mx-auto bg-gradient-to-tr from-[#bcc7d1] to-[#123d61] rounded-2xl border-4 border-[#e2e8f0] overflow-hidden shadow-md p-2 md:p-6 flex flex-col md:flex-row items-center justify-between min-h-[80px] md:min-h-[150px]">
      {/* Text Content */}
      <div className="flex flex-col ml-12 gap-4 text-center md:text-left md:max-w-xl">
        <span className="text-white/80 text-sm md:text-base">Apple</span>
        <h2 className="text-4xl md:text-5xl font-extrabold text-white leading-tight">
          <span className="text-white/70 block">Silver</span>
          <span className="block">MACBOOK PRO</span>
        </h2>
        <p className="text-white/90 text-sm md:text-base">
          {" "}
          13.3-inch (diagonal) LED-backlit display with IPS technology;
          2560-by-1600 native resolution at 227 pixels per inch with support for
          millions of colors
        </p>
        <Link
          href="/category/audio"
          className="inline-block mt-4 bg-red-500 text-white font-semibold px-6 py-3 rounded-full hover:bg-red-600 transition-all duration-200 w-fit mx-auto md:mx-0"
        >
          Shop by Apple Brand
        </Link>
      </div>

      {/* Image */}
      <div className="relative w-full max-w-md mt-8 md:mt-0">
        <Image
          src="https://hlfwfvupabrc8fwr.public.blob.vercel-storage.com/apple-m1.png"
          alt="Apple M1 Product"
          width={500}
          height={500}
          className="object-contain w-full h-auto"
        />
      </div>
    </section>
  );
}
