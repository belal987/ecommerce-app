import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";          // ← Redux
import { addToCart } from "../store/cartSlice";     // ← Redux action

// ... rest of imports

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();                   // ← replace useCart()

  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then((res) => { if (!res.ok) throw new Error("Not found"); return res.json(); })
      .then((data) => { 
        // Map Fakestore structure to app structure
        const mappedData = {
          ...data,
          images: [data.image],
          category: { name: data.category }
        };
        setProduct(mappedData); 
        setIsLoading(false); 
      })
      .catch((err) => { setError(err.message); setIsLoading(false); });
  }, [id]);

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      dispatch(addToCart({                          // ← dispatch instead of addToCart()
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.images?.[0],
      }));
    }
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  if (isLoading) return (
    <div className="flex justify-center items-center h-64">
      <div className="w-10 h-10 border-4 border-gray-800 border-t-transparent rounded-full animate-spin" />
    </div>
  );

  if (error) return (
    <div className="bg-red-50 border border-red-300 text-red-700 px-4 py-3 rounded-lg text-sm">
      {error}.{" "}
      <button onClick={() => navigate("/")} className="underline font-medium bg-transparent border-0 p-0 cursor-pointer">
        Go back
      </button>
    </div>
  );

  const images = product.images || [];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-4">
      {/* Left — Images */}
      <div>
        <div className="bg-gray-50 rounded-2xl h-80 flex items-center justify-center p-6 mb-4">
          <img
            src={images[selectedImage] || "https://placehold.co/400x300?text=No+Image"}
            alt={product.title}
            className="h-64 object-contain"
            onError={(e) => (e.target.src = "https://placehold.co/400x300?text=No+Image")}
          />
        </div>
        <div className="flex gap-3">
          {images.slice(0, 4).map((img, i) => (
            <button
              key={i}
              onClick={() => setSelectedImage(i)}
              className={`w-20 h-20 rounded-xl bg-gray-50 border-2 flex items-center justify-center overflow-hidden transition p-1 ${
                selectedImage === i ? "border-gray-800" : "border-transparent hover:border-gray-300"
              }`}
            >
              <img src={img} alt="" className="h-full object-contain"
                onError={(e) => (e.target.src = "https://placehold.co/80x80?text=?")} />
            </button>
          ))}
        </div>
      </div>

      {/* Right — Info */}
      <div className="flex flex-col gap-4">
        <h1 className="text-2xl font-bold text-gray-900">{product.title}</h1>
        <p className="text-sm text-gray-500 leading-relaxed">{product.description}</p>

        <div className="border-t border-gray-100 pt-4">
          <p className="text-2xl font-bold text-gray-900">
            ${product.price}.00
            <span className="text-base font-normal text-gray-500 ml-2">
              or ${Math.round(product.price / 6)}.99/month
            </span>
          </p>
        </div>

        <div>
          <span className="bg-green-500 text-white text-xs font-semibold px-3 py-1 rounded-full">In stock</span>
        </div>

        <div>
          <p className="text-xs text-gray-500 mb-2">More information</p>
          <div className="flex gap-2">
            <span className="text-xs border border-gray-300 rounded-full px-3 py-1 text-gray-600">
              {product.category?.name || "Category"}
            </span>
            <span className="text-xs border border-gray-300 rounded-full px-3 py-1 text-gray-600">Brand</span>
          </div>
        </div>

        <div className="border-t border-gray-100 pt-4" />

        {/* Quantity */}
        <div className="flex items-center gap-6">
          <div className="flex items-center border border-gray-200 rounded-full overflow-hidden">
            <button onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              className="px-4 py-2 text-gray-600 hover:bg-gray-100 text-lg bg-transparent border-0 cursor-pointer">−</button>
            <span className="px-4 text-sm font-medium">{quantity}</span>
            <button onClick={() => setQuantity((q) => q + 1)}
              className="px-4 py-2 text-gray-600 hover:bg-gray-100 text-lg bg-transparent border-0 cursor-pointer">+</button>
          </div>
          <div>
            <p className="text-xs text-red-500 font-medium">Only 12 items Left!</p>
            <p className="text-xs text-gray-400">Don't miss it</p>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-3 mt-2">
          <button className="flex-1 py-3 bg-gray-900 text-white rounded-full font-medium text-sm hover:bg-gray-700 transition border-0 cursor-pointer">
            Buy Now
          </button>
          <button
            onClick={handleAddToCart}
            className={`flex-1 py-3 rounded-full font-medium text-sm transition border cursor-pointer ${
              added
                ? "bg-green-500 text-white border-green-500"
                : "bg-white text-gray-800 border-gray-300 hover:bg-gray-50"
            }`}
          >
            {added ? "✓ Added to Cart!" : "Add to Cart"}
          </button>
        </div>

        <button onClick={() => navigate("/")}
          className="text-sm text-gray-400 hover:text-gray-600 underline text-left mt-1 bg-transparent border-0 p-0 cursor-pointer">
          ← Back to Products
        </button>
      </div>
    </div>
  );
}