import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../store/cartSlice";
import { Card, CardContent } from "@/components/ui/card";
import { Star, ShoppingCart } from "lucide-react";

export default function ProductCard({ id, title, price, image, categoryName = "Collection", inStock = true }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <Card
      className="border-none shadow-none bg-transparent group cursor-pointer"
      onClick={() => navigate(`/product/${id}`)}
    >
      <CardContent className="p-0 space-y-5">
        <div className="relative aspect-[3/4] bg-[#F2F0EA] overflow-hidden">
          {/* Badge */}
          <div className="absolute top-4 left-4 z-10 px-3 py-1 bg-[#C2714F] text-white text-[9px] font-bold uppercase tracking-widest">
             {price < 100 ? "Sale" : "New"}
          </div>

          {/* Product Image */}
          <img
            src={image || "https://placehold.co/400x533?text=Product"}
            alt={title}
            className="w-full h-full object-cover mix-blend-multiply transition-transform duration-700 group-hover:scale-105"
            onError={(e) => (e.target.src = "https://placehold.co/400x533?text=Product")}
          />

          {/* Cart Icon Hover */}
          <button 
            className="absolute bottom-6 right-6 w-12 h-12 bg-white rounded-full shadow-xl flex items-center justify-center translate-y-20 group-hover:translate-y-0 transition-transform duration-500 hover:bg-[#1A1A1A] hover:text-white"
            onClick={(e) => {
              e.stopPropagation();
              dispatch(addToCart({ id, title, price, image }));
            }}
          >
            <ShoppingCart className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-1">
          <div className="flex justify-between items-start">
             <div>
                <h3 className="font-semibold text-sm text-[#1A1A1A] line-clamp-1">{title}</h3>
                <p className="text-[10px] uppercase tracking-widest text-[#999] font-medium leading-loose">
                  {categoryName}
                </p>
             </div>
             <span className="text-sm font-bold text-[#1A1A1A]">${price}</span>
          </div>
          
          <div className="flex items-center gap-1 pt-1 opacity-60">
             {[1,2,3,4,5].map(s => <Star key={s} className="w-2.5 h-2.5 fill-[#C2714F] text-[#C2714F]" />)}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}