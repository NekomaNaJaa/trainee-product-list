import { api } from "@/lib/api";
import type { Product } from "@/types/product";

export async function getProducts(signal?: AbortSignal): Promise<Product[]> {
  const { data } = await api.get<Product[]>("/products", { signal });
  return data;
}

export async function getProduct(
  id: string | number,
  signal?: AbortSignal
): Promise<Product> {
  const { data } = await api.get<Product>(`/products/${id}`, { signal });
  return data;
}