interface ProductFiltersProps {
  search: string;
  onSearchChange: (value: string) => void;
  category: string;
  onCategoryChange: (value: string) => void;
  categories: string[];
}

export default function ProductFilters({
  search,
  onSearchChange,
  category,
  onCategoryChange,
  categories,
}: ProductFiltersProps) {
  return (
    <div className="mb-6 flex flex-col gap-3 sm:flex-row">
      <input
        type="text"
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder="ค้นหาชื่อสินค้า..."
        className="w-full flex-1 rounded-lg border border-gray-300 px-4 py-2 text-sm text-gray-900 outline-none focus:border-gray-900"
      />
      <select
        value={category}
        onChange={(e) => onCategoryChange(e.target.value)}
        className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm capitalize text-gray-900 outline-none focus:border-gray-900"
      >
        <option value="all">ทุกหมวดหมู่</option>
        {categories.map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>
    </div>
  );
}