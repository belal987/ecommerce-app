import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts, fetchCategories, setFilter, resetFilters, nextPage, prevPage, setOffset } from "../store/productsSlice";
import ProductCard from "../components/ProductCard";
import FilterSidebar from "../components/FilterSidebar";
import CategoryManager from "../components/CategoryManager";
import { ChevronLeft, ChevronRight, LayoutGrid, List, SlidersHorizontal, Plus, Search } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Shop() {
  const dispatch = useDispatch();
  const { items, isLoading, error, filters, offset, limit } = useSelector((state) => state.products);
  const [viewMode, setViewMode] = useState("grid"); // grid or list
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  useEffect(() => {
    dispatch(fetchProducts({ offset, limit, ...filters }));
  }, [dispatch, filters, offset, limit]);

  const currentPage = Math.floor(offset / limit) + 1;
  const isLastPage = items.length < limit;

  return (
    <div className="min-h-screen bg-[#FDFDFB]">
      {/* Shop Header */}
      <div className="bg-[#1A1A1A] text-white py-24 px-6 relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10 text-center space-y-4">
          <p className="text-[10px] uppercase tracking-[0.4em] font-bold text-[#C2714F]">Catalogue</p>
          <h1 className="serif text-6xl md:text-7xl">The Shop</h1>
          <p className="text-gray-400 text-sm max-w-xl mx-auto leading-relaxed">
            Discover our complete collection of sustainable essentials, designed for the modern individual who values quality over quantity.
          </p>
        </div>
        <div className="absolute inset-0 opacity-10 bg-[url('https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&q=80')] bg-cover bg-center grayscale" />
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Sidebar - Hidden on mobile, toggleable */}
          <aside className="hidden lg:block w-72 flex-shrink-0">
            <FilterSidebar />
            
            {/* Quick Add Category Section - "Insert in categories" */}
            <div className="mt-8">
              <CategoryManager />
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1 space-y-12">
            {/* Toolbar */}
            <div className="flex flex-col sm:flex-row justify-between items-center bg-white p-4 rounded-2xl border border-gray-100 shadow-sm gap-4">
               <div className="flex items-center gap-6 flex-1">
                 <button 
                   onClick={() => setShowMobileFilters(true)}
                   className="lg:hidden flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest"
                 >
                   <SlidersHorizontal className="w-4 h-4" /> Filters
                 </button>
                 
                 {/* Prominent Shop Search */}
                 <div className="relative hidden sm:flex flex-1 max-w-md items-center group">
                    <Search className="absolute left-4 w-4 h-4 text-gray-400 group-focus-within:text-black transition-colors" />
                    <input 
                      type="text"
                      placeholder="Search for pieces..."
                      className="w-full bg-gray-50 border-none rounded-full py-2.5 pl-12 pr-4 text-[11px] uppercase tracking-widest font-bold outline-none focus:bg-white focus:ring-1 focus:ring-black transition-all"
                      value={filters.title}
                      onChange={(e) => dispatch(setFilter({ title: e.target.value }))}
                    />
                 </div>

                 <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 whitespace-nowrap ml-auto">
                   Showing <span className="text-black">{items.length}</span> Results
                 </p>
               </div>

               <div className="flex items-center gap-4">
                  <div className="h-4 w-[1px] bg-gray-200 hidden sm:block" />
                  <div className="flex items-center gap-2 bg-gray-50 p-1 rounded-lg">
                    <button 
                      onClick={() => setViewMode("grid")}
                      className={`p-1.5 rounded-md transition-all ${viewMode === "grid" ? "bg-white shadow-sm text-black" : "text-gray-400"}`}
                    >
                      <LayoutGrid className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => setViewMode("list")}
                      className={`p-1.5 rounded-md transition-all ${viewMode === "list" ? "bg-white shadow-sm text-black" : "text-gray-400"}`}
                    >
                      <List className="w-4 h-4" />
                    </button>
                  </div>
               </div>
            </div>

            {/* Product Grid */}
            {isLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {[1, 2, 3, 4, 5, 6].map(i => <div key={i} className="aspect-[3/4] bg-gray-100 animate-pulse rounded-2xl" />)}
              </div>
            ) : error ? (
              <div className="py-20 text-center space-y-4">
                <p className="text-red-500 font-serif italic text-xl">Something went wrong.</p>
                <Button onClick={() => dispatch(resetFilters())} variant="outline">Reset Explorer</Button>
              </div>
            ) : items.length === 0 ? (
              <div className="py-20 text-center space-y-4 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-100">
                <p className="text-gray-400 font-serif text-2xl px-6">We couldn't find any pieces matching your current filters.</p>
                <Button onClick={() => dispatch(resetFilters())} className="rounded-full px-8">Clear filters</Button>
              </div>
            ) : (
              <div className={viewMode === "grid" ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16" : "space-y-8"}>
                {items.map((product) => (
                  <ProductCard
                    key={product.id}
                    id={product.id}
                    title={product.title}
                    price={product.price}
                    image={product.images?.[0]}
                    categoryName={product.category?.name}
                    variant={viewMode}
                  />
                ))}
              </div>
            )}

            {/* Pagination (Patinagers) */}
            <div className="flex flex-col sm:flex-row justify-between items-center pt-12 border-t border-gray-100 gap-8">
               <div className="flex items-center gap-2">
                 {[1, 2, 3].map(page => (
                   <button 
                     key={page}
                     onClick={() => dispatch(setOffset((page - 1) * limit))}
                     className={`w-10 h-10 rounded-full text-xs font-bold transition-all ${currentPage === page ? "bg-black text-white" : "hover:bg-gray-100"}`}
                   >
                     {page}
                   </button>
                 ))}
                 <span className="text-gray-400 mx-2">...</span>
                 <button className="w-10 h-10 rounded-full text-xs font-bold hover:bg-gray-100">12</button>
               </div>

               <div className="flex items-center gap-4">
                  <Button 
                    variant="ghost" 
                    onClick={() => dispatch(prevPage())}
                    disabled={offset === 0}
                    className="rounded-full px-6 h-12 text-[10px] uppercase tracking-widest font-bold border border-transparent hover:border-black transition-all"
                  >
                    <ChevronLeft className="w-4 h-4 mr-2" /> Previous
                  </Button>
                  <Button 
                    variant="ghost" 
                    onClick={() => dispatch(nextPage())}
                    disabled={isLastPage}
                    className="rounded-full px-6 h-12 text-[10px] uppercase tracking-widest font-bold border border-transparent hover:border-black transition-all"
                  >
                    Next <ChevronRight className="w-4 h-4 ml-2" />
                  </Button>
               </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
