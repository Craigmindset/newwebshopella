import ProductTable from "@/components/admin/ProductTable";
import PriceMarkupForm from "@/components/admin/PriceMarkupForm";

export default function ProductsPage() {
  return (
    <div className="flex flex-col gap-8">
      <PriceMarkupForm />
      <ProductTable />
    </div>
  );
}
