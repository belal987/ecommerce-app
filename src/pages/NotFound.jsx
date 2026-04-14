import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Ghost } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#FDFDFB] flex flex-col items-center justify-center p-6 text-center">
      <div className="space-y-12 max-w-2xl animate-in fade-in zoom-in-95 duration-700">
        {/* Visual Element */}
        <div className="relative inline-block">
          <h1 className="serif text-[15rem] leading-none text-black/5 select-none">404</h1>
          <div className="absolute inset-0 flex items-center justify-center">
            <Ghost className="w-24 h-24 text-[var(--accent-color)] animate-bounce" />
          </div>
        </div>

        <div className="space-y-6">
          <p className="text-[10px] uppercase tracking-[0.5em] font-bold text-[#999] ml-2">Lost in space</p>
          <h2 className="serif text-5xl md:text-6xl text-black">This piece is missing.</h2>
          <p className="text-gray-500 text-sm max-w-md mx-auto leading-relaxed">
            The page you are looking for might have been removed, had its name changed, or is temporarily unavailable in our collection.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-8">
          <Link to="/">
            <Button className="rounded-full bg-black text-white px-10 h-14 text-[11px] uppercase tracking-widest font-bold hover:bg-[#C2714F] transition-all">
              <ArrowLeft className="w-4 h-4 mr-2" /> Back to Store
            </Button>
          </Link>
          <Link to="/shop">
            <Button variant="outline" className="rounded-full border-black px-10 h-14 text-[11px] uppercase tracking-widest font-bold hover:bg-black hover:text-white transition-all">
              Shop Catalogue
            </Button>
          </Link>
        </div>

        {/* Decorative corner */}
        <div className="mt-20 flex flex-col items-center gap-4 opacity-30">
           <div className="w-[1px] h-20 bg-black" />
           <p className="text-[8px] uppercase tracking-[0.3em] font-bold">Maison Essentials</p>
        </div>
      </div>
    </div>
  );
}