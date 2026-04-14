import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async ({ categoryId = "", limit = 20 }) => {
    // FakeStoreAPI uses /products/category/:category for specific category
    let url = "https://fakestoreapi.com/products";
    if (categoryId) {
      url = `https://fakestoreapi.com/products/category/${categoryId}`;
    }
    
    const res = await fetch(url);
    if (!res.ok) throw new Error("Failed to fetch products");
    const data = await res.json();
    
    // Map FakeStore data format to the app's expected format (EscuelaJS style)
    return data.map(item => ({
      ...item,
      images: [item.image],
      category: { id: item.category, name: item.category }
    }));
  }
);

export const fetchCategories = createAsyncThunk(
  "products/fetchCategories",
  async () => {
    const res = await fetch("https://fakestoreapi.com/products/categories");
    if (!res.ok) throw new Error("Failed to fetch categories");
    const categories = await res.json();
    
    // Map string categories to object format
    return categories.map(cat => ({
      id: cat,
      name: cat,
      image: "https://placehold.co/100x100"
    }));
  }
);

const initialState = {
  items: [],
  categories: [],
  isLoading: false,
  error: null,
  filters: {
    title: "",
    categoryId: "",
    priceMin: "",
    priceMax: "",
  },
  offset: 0,
  limit: 12,
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setFilter: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
      state.offset = 0;
    },
    resetFilters: (state) => {
      state.filters = initialState.filters;
      state.offset = 0;
    },
    setOffset: (state, action) => {
      state.offset = action.payload;
    },
    nextPage: (state) => {
      state.offset += state.limit;
    },
    prevPage: (state) => {
      state.offset = Math.max(0, state.offset - state.limit);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        // Apply client-side filtering since FakeStoreAPI doesn't support Title/Price filters
        let filteredItems = action.payload;
        
        if (state.filters.title) {
          filteredItems = filteredItems.filter(item => 
            item.title.toLowerCase().includes(state.filters.title.toLowerCase())
          );
        }
        
        if (state.filters.priceMin) {
          filteredItems = filteredItems.filter(item => item.price >= parseFloat(state.filters.priceMin));
        }
        
        if (state.filters.priceMax) {
          filteredItems = filteredItems.filter(item => item.price <= parseFloat(state.filters.priceMax));
        }

        state.items = filteredItems;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.categories = action.payload;
      });
  },
});

export const { setFilter, resetFilters, setOffset, nextPage, prevPage } = productsSlice.actions;
export default productsSlice.reducer;
