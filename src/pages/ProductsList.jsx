import { useState, useEffect } from "react";
import ProductCard from "../components/ProductCard";

const LIMIT = 8;

export default function ProductsList() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    setIsLoading(true);
    fetch(`https://api.escuelajs.co/api/v1/products?offset=${offset}&limit=${LIMIT}`)
      .then((res) => { if (!res.ok) throw new Error("Failed to fetch"); return res.json(); })
      .then((data) => { setProducts(data); setIsLoading(false); })
      .catch((err) => { setError(err.message); setIsLoading(false); });
  }, [offset]);

  return (
    <div>
      <p className="text-gray-600 mb-6 text-sm">Welcome to our shopping website, start browsing...</p>

      {isLoading && (
        <div className="flex justify-center items-center h-64">
          <div className="w-10 h-10 border-4 border-gray-800 border-t-transparent rounded-full animate-spin" />
        </div>
      )}

      {error && (
        <div className="bg-red-50 border border-red-300 text-red-700 px-4 py-3 rounded-lg text-sm">
          Failed to load products. Please try again later.
        </div>
      )}

      {!isLoading && !error && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                title={product.title}
                price={product.price}
                image={product.images?.[0]}
                inStock={Math.random() > 0.3}
              />
            ))}
          </div>

          <div className="flex justify-center gap-3 mt-10">
            <button
              onClick={() => setOffset((p) => Math.max(0, p - LIMIT))}
              disabled={offset === 0}
              className="px-5 py-2 text-sm rounded-full border border-gray-300 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition"
            >
              Previous
            </button>
            <span className="px-4 py-2 text-sm text-gray-500">Page {offset / LIMIT + 1}</span>
            <button
              onClick={() => setOffset((p) => p + LIMIT)}
              disabled={products.length < LIMIT}
              className="px-5 py-2 text-sm rounded-full bg-gray-900 text-white hover:bg-gray-700 disabled:opacity-40 disabled:cursor-not-allowed transition"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
}