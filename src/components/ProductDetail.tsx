"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import ErrorMessage from "@/components/ErrorMessage";
import ProductDetailSkeleton from "@/components/ProductDetailSkeleton";
import { getProduct } from "@/services/products";
import type { Product } from "@/types/product";

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [notFound, setNotFound] = useState(false);
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    const controller = new AbortController();

    getProduct(id, controller.signal)
      .then((data) => {
        // fakestoreapi ตอบ 200 แต่ body ว่าง เมื่อไม่มี id นี้
        if (!data) {
          setNotFound(true);
        } else {
          setProduct(data);
        }
        setLoading(false);
      })
      .catch((err) => {
        if (axios.isCancel(err)) return;
        if (axios.isAxiosError(err) && err.response?.status === 404) {
          setNotFound(true);
        } else {
          setError("โหลดข้อมูลสินค้าไม่สำเร็จ");
        }
        setLoading(false);
      });

    return () => controller.abort();
  }, [id, reloadKey]);

  const handleRetry = () => {
    setLoading(true);
    setError(null);
    setReloadKey((k) => k + 1);
  };

  if (loading) return <ProductDetailSkeleton />;
  if (error) return <ErrorMessage message={error} onRetry={handleRetry} />;

  if (notFound || !product) {
    return (
      <div className="py-16 text-center">
        <p className="mb-4 text-gray-700">ไม่พบสินค้านี้</p>
        <Link href="/products" className="text-blue-600 underline">
          ← กลับหน้ารายการ
        </Link>
      </div>
    );
  }

  return (
    <div className="grid gap-8 md:grid-cols-2">
      <div className="relative aspect-square w-full rounded-xl border border-gray-200 bg-white">
        <Image
          src={product.image}
          alt={product.title}
          fill
          priority
          sizes="(min-width: 768px) 50vw, 100vw"
          className="object-contain p-8"
        />
      </div>

      <div className="flex flex-col gap-4">
        <span className="w-fit rounded-full bg-gray-100 px-3 py-1 text-xs font-medium capitalize text-gray-700">
          {product.category}
        </span>
        <h1 className="text-2xl font-bold text-gray-900">{product.title}</h1>
        <p className="text-3xl font-bold text-gray-900">
          ${product.price.toFixed(2)}
        </p>
        <p className="leading-relaxed text-gray-600">{product.description}</p>

        <Link
          href="/products"
          className="mt-4 w-fit rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100"
        >
          ← กลับหน้ารายการ
        </Link>
      </div>
    </div>
  );
}