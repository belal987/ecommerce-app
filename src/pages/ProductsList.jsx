import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts, nextPage, prevPage } from "../store/productsSlice";
import ProductCard from "../components/ProductCard";
import FilterSidebar from "../components/FilterSidebar";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, PackageSearch, Loader2 } from "lucide-react";

export default function ProductsList() {
  const dispatch = useDispatch();
  const { items, isLoading, error, offset, limit, filters } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts({ offset, limit, ...filters }));
  }, [dispatch, offset, limit, filters]);

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      {/* Sidebar - Desktop Sticky */}
      <aside className="w-full lg:w-80 flex-shrink-0">
        <FilterSidebar />
      </aside>

      {/* Main Content Area */}
      <main className="flex-1">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div className="space-y-1">
            <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Explore Treasures</h1>
            <p className="text-gray-500 text-sm font-medium">Curating the best products just for you</p>
          </div>
          
          <div className="text-xs font-semibold px-4 py-2 bg-gray-50 rounded-full text-gray-400 border border-gray-100 flex items-center gap-2">
            <PackageSearch className="w-4 h-4 text-indigo-500" />
            Displaying {items.length} items
          </div>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 animate-pulse">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-gray-50 h-80 rounded-3xl border border-gray-100 flex items-center justify-center">
                <Loader2 className="w-8 h-8 text-indigo-100 animate-spin" />
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="bg-red-50 border border-red-200 text-red-600 px-6 py-8 rounded-3xl text-center shadow-sm">
            <p className="font-semibold text-lg mb-2">Oops! Something went wrong.</p>
            <p className="text-sm text-red-500/80">{error}</p>
          </div>
        ) : items.length === 0 ? (
          <div className="bg-gray-50 border border-dashed border-gray-200 py-16 rounded-3xl text-center space-y-4">
            <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center mx-auto">
              <PackageSearch className="w-8 h-8 text-gray-300" />
            </div>
            <p className="text-gray-500 font-medium">No products match your search criteria.</p>
            <Button size="sm" variant="outline" className="rounded-xl px-6" onClick={() => window.location.reload()}>
              Clear Search
            </Button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 animate-in fade-in zoom-in-95 duration-500">
              {items.map((product) => (
                <ProductCard
                  key={product.id}
                  id={product.id}
                  title={product.title}
                  price={product.price}
                  image={product.images?.[0]}
                  categoryName={product.category?.name}
                  inStock={Math.random() > 0.2}
                />
              ))}
            </div>

            {/* Premium Pagination */}
            <div className="flex items-center justify-between mt-12 bg-white p-4 rounded-3xl border border-gray-100 shadow-sm">
              <span className="text-sm font-medium text-gray-400 ml-2">
                Page <span className="text-gray-900 font-bold">{offset / limit + 1}</span>
              </span>
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={() => dispatch(prevPage())}
                  disabled={offset === 0}
                  className="rounded-2xl px-5 h-11 border-gray-100 hover:border-indigo-100 hover:bg-indigo-50/50 hover:text-indigo-600 transition-all font-semibold text-sm flex items-center gap-2 group"
                >
                  <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                  Previous
                </Button>
                <Button
                  onClick={() => dispatch(nextPage())}
                  disabled={items.length < limit}
                  className="rounded-2xl px-6 h-11 bg-indigo-600 hover:bg-indigo-700 shadow-md shadow-indigo-200 transition-all font-semibold text-sm flex items-center gap-2 group"
                >
                  Next
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
}