import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, updateQuantity } from "../store/cartSlice";

export default function Cart() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);
  const cartTotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Your Cart</h1>

      {cartItems.length === 0 ? (
        <div className="text-center py-20 text-gray-400">
          <p className="text-lg mb-4">Your cart is empty.</p>
          <Link to="/" className="text-gray-800 underline text-sm">← Back to Products</Link>
        </div>
      ) : (
        <>
          <div className="flex flex-col gap-4">
            {cartItems.map((item) => (
              <div key={item.id} className="flex items-center gap-4 bg-white border border-gray-100 rounded-xl p-4">
                <img
                  src={item.image || "https://placehold.co/80x80?text=?"}
                  alt={item.title}
                  className="w-16 h-16 object-contain bg-gray-50 rounded-lg"
                  onError={(e) => (e.target.src = "https://placehold.co/80x80?text=?")}
                />
                <div className="flex-1">
                  <p className="font-semibold text-sm text-gray-900 truncate">{item.title}</p>
                  <p className="text-sm text-gray-500">${item.price}</p>
                </div>
                <div className="flex items-center border border-gray-200 rounded-full overflow-hidden">
                  <button
                    onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }))}
                    className="px-3 py-1 hover:bg-gray-100 text-lg bg-transparent border-0 cursor-pointer"
                  >−</button>
                  <span className="px-3 text-sm">{item.quantity}</span>
                  <button
                    onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }))}
                    className="px-3 py-1 hover:bg-gray-100 text-lg bg-transparent border-0 cursor-pointer"
                  >+</button>
                </div>
                <button
                  onClick={() => dispatch(removeFromCart(item.id))}
                  className="text-red-400 hover:text-red-600 text-sm bg-transparent border-0 cursor-pointer"
                >✕</button>
              </div>
            ))}
          </div>

          <div className="mt-6 border-t pt-4 flex justify-between items-center">
            <span className="font-bold text-lg">Total: ${cartTotal.toFixed(2)}</span>
            <button className="px-6 py-2 bg-gray-900 text-white rounded-full text-sm hover:bg-gray-700 transition border-0 cursor-pointer">
              Checkout
            </button>
          </div>

          <Link to="/" className="block mt-4 text-sm text-gray-400 hover:text-gray-600 underline">
            ← Continue Shopping
          </Link>
        </>
      )}
    </div>
  );
}


