import React from "react";
import Link from "next/link";
import { Bell, LogOut, ChevronDown, Home, Store } from "lucide-react";
import MiniCart from "@/components/MiniCart";

interface UserHeaderProps {
  user: { name: string; email: string; avatar?: string };
  onLogout: () => void;
}

export default function UserHeader({ user, onLogout }: UserHeaderProps) {
  const [showProfile, setShowProfile] = React.useState(false);
  const [showCountry, setShowCountry] = React.useState(false);

  const countryOptions = [
    { code: "NGN", label: "Nigeria", img: "/brands/NGN-flag.png" },
    { code: "GB", label: "United Kingdom", img: "/brands/UK-FLAG.png" },
    { code: "GH", label: "Ghana", img: "/brands/Ghana-flag.png" },
  ];
  const [selectedCountry, setSelectedCountry] = React.useState(
    countryOptions[0]
  );

  return (
    <header className="bg-[#466cf4] text-white sticky top-0 z-50 shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center h-16">
          {/* Logo */}
          <Link
            href="/dashboard/user"
            className="text-2xl font-bold text-white hidden md:inline"
          >
            KredMart
          </Link>

          {/* Center nav (desktop only) */}
          <div className="hidden md:flex flex-1 justify-center">
            <nav className="flex items-center space-x-6">
              <Link
                href="/"
                className="hover:underline flex items-center gap-1"
              >
                <Home className="h-5 w-5" />
                <span>Home</span>
              </Link>
              <Link
                href="/store"
                className="hover:underline flex items-center gap-1"
              >
                <Store className="h-5 w-5" />
                <span>Store</span>
              </Link>
            </nav>
          </div>

          {/* Right section */}
          <div className="flex items-center space-x-4 relative ml-auto">
            {/* Mobile: Home + Store + Cart */}
            <div className="flex items-center space-x-2 md:hidden">
              <Link href="/">
                <Home className="h-6 w-6 text-white" />
              </Link>
              <Link href="/store">
                <Store className="h-6 w-6 text-white" />
              </Link>
              <MiniCart />
            </div>

            {/* Desktop: Cart */}
            <div className="hidden md:block">
              <MiniCart />
            </div>

            {/* Country selector */}
            <div className="relative">
              <button
                className="flex items-center gap-1 bg-white text-[#466cf4] px-2 py-1 rounded-lg shadow hover:bg-gray-100 focus:outline-none"
                onClick={() => setShowCountry((prev) => !prev)}
              >
                <img
                  src={selectedCountry.img}
                  alt={selectedCountry.label}
                  className="h-5 w-5 rounded-full border"
                />
                <span className="font-semibold text-sm hidden md:inline">
                  {selectedCountry.code}
                </span>
                <ChevronDown className="h-4 w-4 ml-1 hidden md:inline" />
              </button>

              {showCountry && (
                <div className="absolute right-0 mt-2 bg-white text-gray-800 rounded-lg shadow-lg py-2 w-40 z-50">
                  {countryOptions.map((country) => (
                    <button
                      key={country.code}
                      className={`w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center gap-2 ${
                        selectedCountry.code === country.code
                          ? "bg-gray-100"
                          : ""
                      }`}
                      onClick={() => {
                        setSelectedCountry(country);
                        setShowCountry(false);
                      }}
                    >
                      <img
                        src={country.img}
                        alt={country.label}
                        className="h-5 w-5 rounded-full border"
                      />
                      <span className="font-semibold text-sm hidden md:inline">
                        {country.code}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Notifications (desktop only) */}
            <Bell className="h-6 w-6 text-white cursor-pointer hidden md:inline" />

            {/* Profile (desktop only) */}
            <button
              className="flex items-center gap-2 focus:outline-none hidden md:flex"
              onClick={() => setShowProfile((prev) => !prev)}
            >
              <img
                src={user.avatar || "/placeholder-user.jpg"}
                alt="avatar"
                className="h-10 w-10 rounded-full border-2 border-white"
              />
              <span className="font-medium hidden sm:inline">{user.name}</span>
            </button>

            {/* Profile dropdown */}
            {showProfile && (
              <div className="absolute right-0 top-12 bg-white text-gray-800 rounded-lg shadow-lg py-2 w-48 z-50">
                <div className="px-4 py-2 border-b">
                  <div className="font-semibold">{user.name}</div>
                  <div className="text-xs text-gray-500">{user.email}</div>
                </div>
                <Link
                  href="/accountsetting"
                  className="block px-4 py-2 hover:bg-gray-100"
                >
                  Account Settings
                </Link>
                <button
                  onClick={() => {
                    setShowProfile(false);
                    onLogout();
                  }}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center gap-2 text-red-600"
                >
                  <LogOut className="h-4 w-4" /> Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
