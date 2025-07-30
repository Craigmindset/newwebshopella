"use client";
import { useEffect, useState } from "react";
import UserTable from "@/components/admin/UserTable";

export default function UsersPage() {
  const [dark, setDark] = useState(true);
  useEffect(() => {
    setDark(document.documentElement.classList.contains("dark"));
  }, []);
  return <UserTable dark={dark} />;
}
