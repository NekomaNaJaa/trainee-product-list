"use client";

import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import ErrorMessage from "@/components/ErrorMessage";
import ProductCard from "@/components/ProductCard";
import ProductFilters from "@/components/ProductFilters";
import ProductSkeleton from "@/components/ProductSkeleton";
import { getProducts } from "@/services/products";
import type { Product } from "@/types/product";

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [reloadKey, setReloadKey] = useState(0);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");

  useEffect(() => {
    const controller = new AbortController();

    getProducts(controller.signal)
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        if (axios.isCancel(err)) return;
        setError("โหลดข้อมูลสินค้าไม่สำเร็จ");
        setLoading(false);
      });

    return () => controller.abort();
  }, [reloadKey]);

  const handleRetry = () => {
    setLoading(true);
    setError(null);
    setReloadKey((k) => k + 1);
  };

  const categories = useMemo(
    () => Array.from(new Set(products.map((p) => p.category))),
    [products]
  );

  const filtered = useMemo(() => {
    const keyword = search.trim().toLowerCase();
    return products.filter(
      (p) =>
        (category === "all" || p.category === category) &&
        p.title.toLowerCase().includes(keyword)
    );
  }, [products, search, category]);

  const clearFilters = () => {
    setSearch("");
    setCategory("all");
  };

  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-8">
      <h1 className="mb-6 text-2xl font-bold text-gray-900">Products</h1>

      {!loading && !error && (
        <ProductFilters
          search={search}
          onSearchChange={setSearch}
          category={category}
          onCategoryChange={setCategory}
          categories={categories}
        />
      )}

      {loading && (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <ProductSkeleton key={i} />
          ))}
        </div>
      )}

      {error && <ErrorMessage message={error} onRetry={handleRetry} />}

      {!loading && !error && filtered.length === 0 && (
        <div className="py-16 text-center">
          <p className="mb-4 text-gray-700">ไม่พบสินค้าที่ตรงกับเงื่อนไข</p>
          <button onClick={clearFilters} className="text-blue-600 underline">
            ล้างตัวกรอง
          </button>
        </div>
      )}

      {!loading && !error && filtered.length > 0 && (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </main>
  );
}