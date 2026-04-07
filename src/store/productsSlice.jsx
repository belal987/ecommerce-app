import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async ({ offset = 0, limit = 20, title = "", categoryId = "", priceMin = "", priceMax = "" }) => {
    let url = `https://api.escuelajs.co/api/v1/products?offset=${offset}&limit=${limit}`;
    if (title) url += `&title=${title}`;
    if (categoryId) url += `&categoryId=${categoryId}`;
    if (priceMin) url += `&price_min=${priceMin}`;
    if (priceMax) url += `&price_max=${priceMax}`;

    const res = await fetch(url);
    if (!res.ok) throw new Error("Failed to fetch products");
    return res.json();
  }
);

export const fetchCategories = createAsyncThunk(
  "products/fetchCategories",
  async () => {
    const res = await fetch("https://api.escuelajs.co/api/v1/categories");
    if (!res.ok) throw new Error("Failed to fetch categories");
    return res.json();
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
      state.offset = 0; // Reset pagination when filter changes
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
        state.items = action.payload;
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
