import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/types/product";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <div className="flex flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition hover:shadow-md">
      <div className="relative aspect-square w-full bg-white p-4">
        <Image
          src={product.image}
          alt={product.title}
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
          className="object-contain p-4"
        />
      </div>
      <div className="flex flex-1 flex-col gap-2 border-t border-gray-100 p-4">
        <h2 className="line-clamp-2 min-h-[2.5rem] text-sm font-semibold text-gray-900">
          {product.title}
        </h2>
        <p className="text-lg font-bold text-gray-900">
          ${product.price.toFixed(2)}
        </p>
        <Link
          href={`/products/${product.id}`}
          className="mt-auto rounded-lg bg-gray-900 px-4 py-2 text-center text-sm font-medium text-white hover:bg-gray-700"
        >
          ดูรายละเอียด
        </Link>
      </div>
    </div>
  );
}