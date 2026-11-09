import { Suspense } from "react";
import ProductDetail from "@/components/ProductDetail";
import ProductDetailSkeleton from "@/components/ProductDetailSkeleton";

export default function ProductDetailPage() {
  return (
    <main className="mx-auto w-full max-w-5xl px-4 py-8">
      <Suspense fallback={<ProductDetailSkeleton />}>
        <ProductDetail />
      </Suspense>
    </main>
  );
}