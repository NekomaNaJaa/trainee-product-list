export default function ProductSkeleton() {
  return (
    <div className="animate-pulse overflow-hidden rounded-xl border border-gray-200 bg-white">
      <div className="aspect-square w-full bg-gray-200" />
      <div className="space-y-3 border-t border-gray-100 p-4">
        <div className="h-4 w-full rounded bg-gray-200" />
        <div className="h-4 w-2/3 rounded bg-gray-200" />
        <div className="h-6 w-1/3 rounded bg-gray-200" />
        <div className="h-9 w-full rounded-lg bg-gray-200" />
      </div>
    </div>
  );
}

export function ProductFiltersSkeleton() {
  return (
    <div className="mb-6 flex animate-pulse flex-col gap-3 sm:flex-row">
      <div className="h-10 w-full flex-1 rounded-lg bg-gray-200" />
      <div className="h-10 w-full rounded-lg bg-gray-200 sm:w-44" />
    </div>
  );
}