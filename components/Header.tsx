"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ShoppingCart, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { useCart } from "./ProductGrid"; // Import cart context

export default function Header() {
  const [activeMenu, setActiveMenu] = useState<string>("Home");

  // Highlight menu based on current route
  useEffect(() => {
    if (typeof window !== "undefined") {
      const path = window.location.pathname;
      const found = menuItems.find(item => item.href === path);
      if (found) setActiveMenu(found.name);
    }
  }, []);

  // Get cart count from context
  const { cartCount } = useCart();

  // Menu items with their respective routes
  const menuItems = [
    { name: "Home", href: "/" },
    { name: "Access Loans", href: "/loans" },
    { name: "Stores", href: "/store" },
    { name: "Shopella Deals", href: "/deals" },
    { name: "About", href: "/about" },
  ];

  return (
    <header className="bg-[#466cf4] text-white sticky top-0 z-50 shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo Section - Left Aligned */}
          <div className="flex-shrink-0">
            <Link href="/">
              <img
                src="/Shopella Logo Design.png"
                alt="Shopella Logo"
                className="h-20 w-auto object-contain"
              />
            </Link>
          </div>

          {/* Desktop Menu - Center/Left Aligned */}
          <nav className="hidden md:flex space-x-4 ml-4">
            {menuItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 hover:bg-white/10 ${
                  activeMenu === item.name
                    ? "bg-white/20 text-white"
                    : "text-white/80 hover:text-white"
                }`}
                onClick={() => setActiveMenu(item.name)}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Right Section - Cart and Auth */}
          <div className="flex items-center space-x-4">
            {/* Cart Icon - Updated to show actual cart count */}
            <Link
              href="/cart"
              className="relative p-2 hover:bg-white/10 rounded-full transition-colors"
            >
              <ShoppingCart className="h-6 w-6" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {cartCount}
              </span>
            </Link>

            {/* Auth Buttons - Desktop */}
            <div className="hidden md:flex space-x-2">
              <Link href="/auth/login">
                <Button
                  variant="ghost"
                  className="text-white hover:bg-white/10"
                >
                  Login
                </Button>
              </Link>
              <Link href="/auth/signup">
                <Button className="bg-white text-[#466cf4] hover:bg-gray-100">
                  Sign Up
                </Button>
              </Link>
            </div>

            {/* Mobile Menu Button with Drawer */}
            <Drawer>
              <DrawerTrigger asChild>
                <button className="md:hidden p-2 hover:bg-white/10 rounded-full transition-colors">
                  <Menu className="h-6 w-6" />
                </button>
              </DrawerTrigger>
              <DrawerContent className="fixed left-0 top-0 h-screen w-[60vw] max-w-[400px] z-50 bg-[#466cf4] text-white flex flex-col p-0 rounded-none">
                <div className="flex items-center h-16 px-6 border-b border-white/20">
                  <Link href="/" className="text-2xl font-bold">
                    Shopella
                  </Link>
                </div>
                <nav className="flex flex-col items-start space-y-1 flex-1 px-6 py-4">
                  {menuItems.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                        activeMenu === item.name
                          ? "bg-white/20 text-white"
                          : "text-white/80 hover:text-white hover:bg-white/10"
                      }`}
                      onClick={() => setActiveMenu(item.name)}
                    >
                      {item.name}
                    </Link>
                  ))}
                  <div className="flex flex-col space-y-2 pt-4 border-t border-white/20">
                    <Link href="/auth/login">
                      <Button
                        variant="ghost"
                        className="w-full text-white hover:bg-white/10"
                      >
                        Login
                      </Button>
                    </Link>
                    <Link href="/auth/signup">
                      <Button className="w-full bg-white text-[#466cf4] hover:bg-gray-100">
                        Sign Up
                      </Button>
                    </Link>
                  </div>
                </nav>
              </DrawerContent>
            </Drawer>
          </div>
        </div>
      </div>
    </header>
  );
}
