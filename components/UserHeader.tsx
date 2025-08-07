import Link from "next/link";
import { Bell, LogOut } from "lucide-react";
import MiniCart from "@/components/MiniCart";

export default function UserHeader({
  user,
  onLogout,
}: {
  user: { name: string; email: string };
  onLogout: () => void;
}) {
  return (
    <header className="bg-[#466cf4] text-white sticky top-0 z-50 shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            href="/dashboard/user"
            className="text-2xl font-bold text-white"
          >
            Shopella
          </Link>
          {/* Menu */}
          <nav className="flex items-center space-x-6">
            <Link href="/" className="hover:underline">
              Home
            </Link>
            <Link href="/store" className="hover:underline">
              Store
            </Link>
            {/* Dashboard link removed */}
          </nav>
          {/* Right Section */}
          <div className="flex items-center space-x-4">
            <MiniCart />
            <Bell className="h-6 w-6 text-white cursor-pointer" />
            <span className="font-medium">{user.name}</span>
            <button
              onClick={() => {
                onLogout();
                window.location.href = "/";
              }}
              className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded flex items-center"
            >
              <LogOut className="h-4 w-4 mr-1" /> Logout
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
