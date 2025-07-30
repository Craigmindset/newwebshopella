"use client";
import { useEffect, useState } from "react";
import DashboardOverview from "@/components/admin/DashboardOverview";

export default function AdminDashboardHome() {
  const [dark, setDark] = useState(true);
  useEffect(() => {
    setDark(document.documentElement.classList.contains("dark"));
  }, []);
  return <DashboardOverview dark={dark} />;
}
