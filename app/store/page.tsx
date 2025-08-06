"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { ShoppingCart, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/components/ProductGrid";
import { useAuth } from "@/hooks/useAuth";
import StoreHeader from "@/components/ui/StoreHeader";
import CategorySection from "@/components/CategorySection";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StoreDisplayBelow from "@/components/StoreDisplayBelow";
import StoreBanner from "@/components/StoreBanner";
import { products } from "@/lib/products";

const categories = ["Phones", "Laptops", "Accessories", "TVs", "Appliances"];
const brands = ["Apple", "Samsung", "LG", "Sony", "Dell"];

export default function StorePage() {
  const { user, loading, logout } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const router = useRouter();

  const filteredProducts = products.filter((product) => {
    const matchCategory = selectedCategory
      ? product.category === selectedCategory
      : true;
    const matchBrand = selectedBrand ? product.brand === selectedBrand : true;
    return matchCategory && matchBrand;
  });

  if (loading) return <div className="p-8">Loading...</div>;

  return (
    <>
      <Header />
      <StoreHeader />
      <StoreBanner />
      <StoreDisplayBelow />
      <CategorySection />

      {user && (
        <div className="flex justify-end items-center mb-4 max-w-7xl mx-auto px-4">
          <span className="mr-4">
            Logged in as <b>{user.name}</b>
          </span>
          <button
            onClick={logout}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Logout
          </button>
        </div>
      )}

      <Footer />
    </>
  );
}

function ProductSection({
  title,
  products,
}: {
  title: string;
  products: typeof products;
}) {
  const { addToCart } = useCart();

  return (
    <section className="mb-12">
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {products.map((product) => (
          <div key={product.id} className="bg-white rounded-lg shadow group">
            <div className="relative overflow-hidden rounded-t-lg">
              <Image
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                width={300}
                height={300}
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition flex items-center justify-center gap-4">
                <button className="bg-white p-2 rounded-full">
                  <Eye className="h-5 w-5" />
                </button>
                <button
                  onClick={() => addToCart(product)}
                  className="bg-[#466cf4] text-white p-2 rounded-full"
                >
                  <ShoppingCart className="h-5 w-5" />
                </button>
              </div>
            </div>
            <div className="p-3">
              <h3 className="font-semibold truncate">{product.name}</h3>
              <p className="text-[#466cf4] font-bold">₦{product.price}</p>
              <p className="text-sm text-gray-500">
                {product.brand} · {product.category}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function PromoBanner({ text, image }: { text: string; image: string }) {
  return (
    <div className="my-12 bg-[#F0F6FF] rounded-lg p-6 text-center">
      <h3 className="text-lg font-bold">{text}</h3>
      <Image
        src={image}
        alt="Banner"
        width={900}
        height={200}
        className="mx-auto mt-4 rounded"
      />
    </div>
  );
}

function InterestSection() {
  const interests = [
    {
      id: 1,
      title: "Electronics Deals",
      description: "Latest gadgets and more",
      image: "/icons/tech.png",
    },
    {
      id: 2,
      title: "Home Essentials",
      description: "Shop your daily needs",
      image: "/icons/home.png",
    },
    {
      id: 3,
      title: "Fashion",
      description: "Trendy styles",
      image: "/icons/fashion.png",
    },
    {
      id: 4,
      title: "Real Estate",
      description: "Buy & rent properties",
      image: "/icons/home2.png",
    },
  ];

  return (
    <div className="py-10">
      <h2 className="text-xl font-bold mb-6 text-center">
        Follow your interest
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {interests.map((interest) => (
          <div
            key={interest.id}
            className="border p-4 rounded text-center bg-white shadow"
          >
            <Image
              src={interest.image}
              alt={interest.title}
              width={80}
              height={80}
              className="mx-auto mb-2"
            />
            <h4 className="font-semibold">{interest.title}</h4>
            <p className="text-sm text-gray-500">{interest.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
