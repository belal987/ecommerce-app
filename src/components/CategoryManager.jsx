import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { fetchCategories } from "../store/productsSlice";
import { Plus, X, FolderPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function CategoryManager() {
  const [isOpen, setIsOpen] = useState(false);
  const [categoryName, setCategoryName] = useState("");
  const [categoryImage, setCategoryImage] = useState("https://placehold.co/640x480");
  const [status, setStatus] = useState("idle"); // idle, loading, success, error
  const dispatch = useDispatch();

  const handleCreateCategory = async (e) => {
    e.preventDefault();
    if (!categoryName) return;

    setStatus("loading");
    try {
      const response = await fetch("https://api.escuelajs.co/api/v1/categories/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: categoryName,
          image: categoryImage
        }),
      });

      if (response.ok) {
        setStatus("success");
        setCategoryName("");
        dispatch(fetchCategories());
        setTimeout(() => {
          setStatus("idle");
          setIsOpen(false);
        }, 2000);
      } else {
        setStatus("error");
      }
    } catch (err) {
      setStatus("error");
    }
  };

  return (
    <div>
      <Button 
        onClick={() => setIsOpen(true)}
        variant="outline"
        className="w-full flex items-center justify-center gap-2 border-black text-[10px] uppercase font-bold tracking-widest hover:bg-black hover:text-white rounded-xl py-6"
      >
        <FolderPlus className="w-4 h-4" /> Insert New Category
      </Button>

      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsOpen(false)} />
          
          <div className="relative bg-[#FDFDFB] w-full max-w-md p-10 rounded-3xl shadow-2xl animate-in zoom-in-95 duration-300">
            <button 
              onClick={() => setIsOpen(false)}
              className="absolute right-6 top-6 p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="space-y-8">
              <div className="space-y-2">
                 <h3 className="serif text-3xl">Add Category</h3>
                 <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">Commerce Management</p>
              </div>

              <form onSubmit={handleCreateCategory} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] uppercase font-bold tracking-widest ml-1">Category Name</label>
                  <Input 
                    placeholder="e.g. Summer Knits"
                    className="h-12 border-gray-100 bg-gray-50 focus:bg-white rounded-xl"
                    value={categoryName}
                    onChange={(e) => setCategoryName(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] uppercase font-bold tracking-widest ml-1">Reference Image URL</label>
                  <Input 
                    placeholder="https://images.unsplash.com/..."
                    className="h-12 border-gray-100 bg-gray-50 focus:bg-white rounded-xl text-xs"
                    value={categoryImage}
                    onChange={(e) => setCategoryImage(e.target.value)}
                  />
                </div>

                <Button 
                  type="submit"
                  disabled={status === "loading"}
                  className="w-full h-14 bg-black text-white hover:bg-[#C2714F] text-[11px] uppercase tracking-widest font-bold rounded-full"
                >
                  {status === "loading" ? "Creating..." : 
                   status === "success" ? "Created Successfully!" : 
                   status === "error" ? "Error, try again" : "Create Category"}
                </Button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
