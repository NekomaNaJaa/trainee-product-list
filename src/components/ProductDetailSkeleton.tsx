export default function ProductDetailSkeleton() {
  return (
    <div className="grid animate-pulse gap-8 md:grid-cols-2">
      <div className="aspect-square w-full rounded-xl bg-gray-200" />
      <div className="flex flex-col gap-4">
        <div className="h-6 w-24 rounded-full bg-gray-200" />
        <div className="h-8 w-full rounded bg-gray-200" />
        <div className="h-8 w-1/3 rounded bg-gray-200" />
        <div className="space-y-2">
          <div className="h-4 w-full rounded bg-gray-200" />
          <div className="h-4 w-full rounded bg-gray-200" />
          <div className="h-4 w-3/4 rounded bg-gray-200" />
        </div>
      </div>
    </div>
  );
}