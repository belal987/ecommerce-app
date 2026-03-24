import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../store/cartSlice";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const StarRating = ({ rating = 4 }) => (
  <div className="flex gap-0.5">
    {[1, 2, 3, 4, 5].map((s) => (
      <span key={s} className={`text-sm ${s <= rating ? "text-yellow-400" : "text-gray-300"}`}>★</span>
    ))}
  </div>
);

export default function ProductCard({ id, title, price, image, inStock = true }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();   // ← Redux

  return (
    <Card
      className="overflow-hidden hover:shadow-md transition-shadow duration-200 p-0 cursor-pointer"
      onClick={() => navigate(`/product/${id}`)}
    >
      <CardContent className="p-0">
        <div className="relative bg-gray-50 h-48 flex items-center justify-center p-4">
          <Badge className={`absolute top-3 left-3 text-xs ${
            inStock ? "bg-green-500 hover:bg-green-500" : "bg-red-500 hover:bg-red-500"
          } text-white`}>
            {inStock ? "In stock" : "Out of stock"}
          </Badge>
          <img
            src={image || "https://placehold.co/200x160?text=No+Image"}
            alt={title}
            className="h-36 object-contain"
            onError={(e) => (e.target.src = "https://placehold.co/200x160?text=No+Image")}
          />
        </div>

        <div className="p-4">
          <h2 className="font-semibold text-sm text-gray-900 truncate mb-1">{title}</h2>
          <p className="text-xs text-gray-500 truncate mb-2">Premium quality product</p>
          <StarRating rating={4} />
          <div className="flex items-center justify-between mt-3">
            <span className="font-bold text-gray-900">
              <sup className="text-xs font-normal">$</sup>{price}
              <sup className="text-xs font-normal">00</sup>
            </span>
            <Button
              size="sm"
              variant={inStock ? "default" : "outline"}
              className="rounded-full text-xs px-4"
              onClick={(e) => {
                e.stopPropagation();
                dispatch(addToCart({ id, title, price, image })); // ← dispatch
              }}
            >
              Add to Cart
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}