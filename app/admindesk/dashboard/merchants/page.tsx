import { useContext } from "react";
import MerchantTable from "@/components/admin/MerchantTable";

// Use a context or prop drilling for dark mode. For now, get from window/document
export default function MerchantsPage() {
  const dark = typeof document !== "undefined" ? document.documentElement.classList.contains("dark") : true;
  return <MerchantTable dark={dark} />;
}
