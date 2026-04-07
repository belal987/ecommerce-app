import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts, setFilter, resetFilters, fetchCategories } from "../store/productsSlice";
import ProductCard from "../components/ProductCard";
import { ArrowRight, Star, Search, Filter, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function ProductsList() {
  const dispatch = useDispatch();
  const { items, categories, isLoading, error, filters } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchProducts({ offset: 0, limit: 12, ...filters }));
  }, [dispatch, filters]);

  const handleFilterChange = (key, value) => {
    dispatch(setFilter({ [key]: value }));
  };

  return (
    <div className="space-y-32 pb-20">
      {/* Hero Section */}
      <section className="grid grid-cols-1 lg:grid-cols-2 min-h-[80vh] bg-[#F2F0EA] overflow-hidden">
        <div className="flex flex-col justify-center px-8 lg:px-24 py-20 space-y-8 animate-in fade-in slide-in-from-left duration-1000">
          <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-[#C2714F]">SS 2026 Collection</p>
          <h1 className="text-6xl md:text-8xl serif leading-[0.9] tracking-tighter">
            Wear what <br /> you <span className="italic-serif text-[#C2714F]">truly</span> <br /> love.
          </h1>
          <p className="text-sm text-[#6B6B6B] max-w-sm leading-relaxed">
            Timeless pieces crafted from sustainable materials. Designed with intention, made to last a lifetime.
          </p>
          <div className="flex gap-4 pt-4">
            <Button variant="outline" className="rounded-none px-12 h-14 border-black text-[11px] uppercase tracking-widest font-bold hover:bg-black hover:text-white transition-all">Shop Women</Button>
            <Button variant="outline" className="rounded-none px-12 h-14 border-black text-[11px] uppercase tracking-widest font-bold hover:bg-black hover:text-white transition-all">Shop Men</Button>
          </div>
        </div>
        <div className="relative bg-[#D9D7D0] flex items-center justify-center p-12 overflow-hidden group">
          <div className="absolute inset-0 opacity-20 grayscale scale-150 blur-xl transition-transform duration-1000 group-hover:scale-125">
             {items[0] && <img src={items[0].images?.[0]} alt="" className="w-full h-full object-cover" />}
          </div>
          <div className="relative z-10 bg-white/40 backdrop-blur-xl p-8 shadow-2xl skew-y-1 transform transition-transform duration-700 hover:skew-y-0">
             <div className="w-64 h-80 bg-[#E5E5E5] mb-4 overflow-hidden">
                {items[0] && <img src={items[0].images?.[0]} alt="" className="w-full h-full object-cover" />}
             </div>
             <div className="flex justify-between items-end">
                <div>
                  <p className="text-[10px] uppercase font-bold tracking-widest mb-1">{items[0]?.category?.name || "Featured"}</p>
                  <h3 className="serif text-lg">{items[0]?.title || "Classic Silk Dress"}</h3>
                </div>
                <span className="text-sm font-bold">${items[0]?.price}</span>
             </div>
          </div>
          <div className="absolute -right-20 bottom-10 text-[20vw] font-black text-black/5 select-none pointer-events-none serif">SS26</div>
        </div>
      </section>

      {/* Main Collections Grid */}
      <section className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div className="space-y-2">
             <h2 className="serif text-4xl">Curated collection</h2>
             <p className="text-xs text-[#999] uppercase tracking-widest">Handpicked for your effortless style</p>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center gap-6 w-full md:w-auto">
             {/* Search Bar */}
             <div className="relative w-full sm:w-64 group">
                <Search className="absolute left-0 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#999] group-focus-within:text-[var(--accent-color)] transition-colors" />
                <Input 
                  placeholder="SEARCH CATALOGUE" 
                  className="border-none rounded-none border-b border-black/5 focus-visible:ring-0 focus-visible:border-black pl-6 text-[10px] uppercase tracking-widest h-10 bg-transparent transition-all"
                  value={filters.title}
                  onChange={(e) => handleFilterChange("title", e.target.value)}
                />
             </div>
             
             {/* Simple Category Filter */}
             <div className="flex items-center gap-4 overflow-x-auto pb-2 sm:pb-0 scrollbar-hide">
                <button 
                  onClick={() => handleFilterChange("categoryId", "")}
                  className={`text-[10px] uppercase tracking-[0.2em] font-bold whitespace-nowrap pb-1 transition-all ${!filters.categoryId ? "border-b-2 border-[#C2714F] text-[#C2714F]" : "text-[#999] hover:text-black"}`}
                >
                  All
                </button>
                {categories.slice(0, 5).map(cat => (
                  <button 
                    key={cat.id}
                    onClick={() => handleFilterChange("categoryId", cat.id)}
                    className={`text-[10px] uppercase tracking-[0.2em] font-bold whitespace-nowrap pb-1 transition-all ${filters.categoryId === cat.id ? "border-b-2 border-[#C2714F] text-[#C2714F]" : "text-[#999] hover:text-black"}`}
                  >
                    {cat.name}
                  </button>
                ))}
             </div>

             {(filters.title || filters.categoryId) && (
               <button onClick={() => dispatch(resetFilters())} className="text-[#C2714F] hover:rotate-90 transition-transform p-1">
                 <X className="w-4 h-4" />
               </button>
             )}
          </div>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map(i => <div key={i} className="aspect-[3/4] bg-[#F7F6F2] animate-pulse" />)}
          </div>
        ) : error ? (
           <p className="text-center py-20 text-red-400">Error loading products.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
            {items.slice(0, 4).map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                title={product.title}
                price={product.price}
                image={product.images?.[0]}
                categoryName={product.category?.name}
              />
            ))}
          </div>
        )}
      </section>

      {/* Bento Banners */}
      <section className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-8">
         <div className="relative h-[600px] bg-[#1A1A1A] text-white p-12 flex flex-col justify-end overflow-hidden group">
            <div className="absolute inset-0 opacity-40 group-hover:scale-105 transition-transform duration-1000 grayscale">
              {items[4] && <img src={items[4].images?.[0]} alt="" className="w-full h-full object-cover" />}
            </div>
            <div className="relative z-10 space-y-6">
              <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-gray-400">Limited Edition</p>
              <h2 className="serif text-5xl leading-tight">The summer <br /> linen collection</h2>
              <button className="flex items-center gap-2 group text-[11px] uppercase tracking-[0.2em] font-bold border-b border-white pb-1 w-fit mt-8">
                Shop Linen <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
         </div>
         <div className="relative h-[600px] bg-[#F2F0EA] p-12 flex flex-col justify-end overflow-hidden group">
            <div className="absolute inset-0 opacity-30 group-hover:scale-105 transition-transform duration-1000">
               {items[5] && <img src={items[5].images?.[0]} alt="" className="w-full h-full object-cover" />}
            </div>
            <div className="relative z-10 space-y-6">
              <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-[#999]">For the home</p>
              <h2 className="serif text-5xl leading-tight">Curated home <br /> essentials</h2>
              <button className="flex items-center gap-2 group text-[11px] uppercase tracking-[0.2em] font-bold border-b border-black pb-1 w-fit mt-8">
                Explore <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
         </div>
      </section>

      {/* Second Showcase Section */}
      <section className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-end mb-12">
          <h2 className="serif text-4xl">New arrivals</h2>
          <button className="flex items-center gap-2 group text-[11px] uppercase tracking-[0.2em] font-bold">
            View all <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
          {items.slice(4, 8).map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              title={product.title}
              price={product.price}
              image={product.images?.[0]}
              categoryName={product.category?.name}
            />
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-[#1A1A1A] py-32 overflow-hidden">
         <div className="max-w-3xl mx-auto px-6 text-center space-y-12">
            <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-gray-500">What our customers say</p>
            <blockquote className="serif text-3xl md:text-5xl text-white italic leading-snug">
              "Maison changed the way I think about getting dressed. Every piece I've bought feels considered, beautiful, and built to actually last."
            </blockquote>
            <div className="flex flex-col items-center gap-2">
               <div className="flex gap-1">
                 {[1,2,3,4,5].map(s => <Star key={s} className="w-3 h-3 text-[var(--accent-color)] fill-[var(--accent-color)]" />)}
               </div>
               <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-white">— Laila M., Longtime Customer</p>
            </div>
            <div className="flex justify-center gap-2">
               <div className="w-12 h-[2px] bg-[var(--accent-color)]" />
               <div className="w-12 h-[2px] bg-white/10" />
            </div>
         </div>
      </section>
    </div>
  );
}