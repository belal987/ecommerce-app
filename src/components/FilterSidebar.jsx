import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories, setFilter, resetFilters } from "../store/productsSlice";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Search, Filter, RefreshCcw } from "lucide-react";

export default function FilterSidebar() {
  const dispatch = useDispatch();
  const { categories, filters } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleFilterChange = (key, value) => {
    dispatch(setFilter({ [key]: value }));
  };

  return (
    <div className="bg-white/80 backdrop-blur-md sticky top-6 border border-gray-100 rounded-3xl p-6 shadow-sm space-y-8 animate-in fade-in slide-in-from-left-4 duration-500">
      {/* Search Bar */}
      <div className="relative group">
        <Label htmlFor="search" className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 block ml-1">
          Dynamic Search
        </Label>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-indigo-500 transition-colors" />
          <Input
            id="search"
            placeholder="Search products..."
            className="pl-10 h-11 border-gray-100 bg-gray-50/50 focus-visible:ring-indigo-500 rounded-2xl transition-all"
            value={filters.title}
            onChange={(e) => handleFilterChange("title", e.target.value)}
          />
        </div>
      </div>

      {/* Categories */}
      <div>
        <Label className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 block ml-1">
          Categories
        </Label>
        <div className="space-y-1.5 max-h-60 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-200">
          <button
            onClick={() => handleFilterChange("categoryId", "")}
            className={`w-full text-left px-4 py-2.5 rounded-xl text-sm transition-all duration-200 ${
              filters.categoryId === ""
                ? "bg-indigo-50 text-indigo-700 font-medium shadow-sm ring-1 ring-indigo-100"
                : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
            }`}
          >
            All Collections
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => handleFilterChange("categoryId", cat.id)}
              className={`w-full text-left px-4 py-2.5 rounded-xl text-sm transition-all duration-200 ${
                filters.categoryId === cat.id
                  ? "bg-indigo-50 text-indigo-700 font-medium shadow-sm ring-1 ring-indigo-100"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div className="space-y-4">
        <Label className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 block ml-1">
          Price Range ($)
        </Label>
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-2">
            <Input
              type="number"
              placeholder="Min"
              className="h-10 border-gray-100 bg-gray-50/50 rounded-xl"
              value={filters.priceMin}
              onChange={(e) => handleFilterChange("priceMin", e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Input
              type="number"
              placeholder="Max"
              className="h-10 border-gray-100 bg-gray-50/50 rounded-xl"
              value={filters.priceMax}
              onChange={(e) => handleFilterChange("priceMax", e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Reset Button */}
      <Button
        variant="ghost"
        className="w-full h-11 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-2xl transition-all flex items-center justify-center gap-2"
        onClick={() => dispatch(resetFilters())}
      >
        <RefreshCcw className="w-4 h-4" />
        Reset Filters
      </Button>
    </div>
  );
}
