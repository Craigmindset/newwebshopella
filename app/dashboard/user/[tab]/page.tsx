"use client";
import { useRouter } from "next/navigation";
import Overview from "@/components/Overview";
import UserHeader from "@/components/UserHeader";
import SideMenuBar from "@/components/ui/SideMenuBar";
import { Menu } from "lucide-react";
import React from "react";
import { useAuth } from "@/hooks/useAuth";
import LoanRequest from "@/components/LoanRequest";

export default function UserDashboardTabPage({
  params,
}: {
  params: { tab: string };
}) {
  const router = useRouter();
  const { user, loading } = useAuth();
  React.useEffect(() => {
    if (!loading && !user) {
      router.push("/auth/login");
    }
  }, [user, loading, router]);
  const demoUser = { name: "Demo User", email: "demo@user.com" };
  const tab = params.tab || "overview";
  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  const handleLogout = () => {
    window.location.href = "/";
  };
  const handleMenuSelect = (id: string) => {
    router.push(`/dashboard/user/${id}`);
    setSidebarOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#f5f9ff] flex flex-col">
      {/* Sticky Header */}
      <div className="sticky top-0 z-40 shadow-lg">
        <UserHeader user={demoUser} onLogout={handleLogout} />
      </div>
      {/* Mobile Hamburger */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 bg-white rounded-full p-2 shadow-lg border border-gray-200"
        onClick={() => setSidebarOpen(true)}
        aria-label="Open menu"
      >
        <Menu className="h-6 w-6 text-[#466cf4]" />
      </button>
      {/* Sidebar Drawer for Mobile */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 flex">
          <div className="bg-white w-64 h-full shadow-lg animate-slide-in-left">
            <SideMenuBar active={tab} onSelect={handleMenuSelect} />
          </div>
          <div className="flex-1" onClick={() => setSidebarOpen(false)} />
        </div>
      )}
      <div className="flex flex-col md:flex-row flex-1 min-h-0">
        {/* Desktop Sidebar */}
        <div className="hidden md:block">
          <SideMenuBar active={tab} onSelect={handleMenuSelect} />
        </div>
        <main className="flex-1 flex flex-col p-4 md:p-8 overflow-auto">
          {tab === "overview" ? (
            <Overview />
          ) : tab === "loan-request" ? (
            <LoanRequest />
          ) : (
            <>
              <h1 className="text-2xl md:text-4xl font-bold mb-6">
                Demo User Dashboard
              </h1>
              <p className="text-base md:text-lg mb-4">
                This is a demo dashboard page. You can customize this component
                to show user stats, orders, wallet info, and more.
              </p>
              <div className="flex flex-col md:flex-row gap-4 md:gap-6">
                <div className="bg-white p-4 md:p-6 rounded-2xl shadow-lg w-full md:w-1/2 transition-all duration-300">
                  <h2 className="text-lg md:text-xl font-bold mb-2">Profile</h2>
                  <p>Name: Demo User</p>
                  <p>Email: demo@user.com</p>
                </div>
                <div className="bg-white p-4 md:p-6 rounded-2xl shadow-lg w-full md:w-1/2 transition-all duration-300">
                  <h2 className="text-lg md:text-xl font-bold mb-2">Wallet</h2>
                  <p>Balance: ₦10,000.00</p>
                </div>
              </div>
            </>
          )}
        </main>
      </div>
      <style jsx global>{`
        @keyframes slide-in-left {
          from {
            transform: translateX(-100%);
          }
          to {
            transform: translateX(0);
          }
        }
        .animate-slide-in-left {
          animation: slide-in-left 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
      `}</style>
    </div>
  );
}
