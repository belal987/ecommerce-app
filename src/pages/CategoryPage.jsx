import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setFilter, resetFilters } from "../store/productsSlice";
import ProductsList from "./ProductsList";

const CategoryPage = ({ title, categoryId, initialFilters = {} }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    // Set the specific category filter on mount
    dispatch(setFilter({ categoryId, ...initialFilters }));

    // Reset filters on unmount to keep root home clean
    return () => {
      dispatch(resetFilters());
    };
  }, [dispatch, categoryId, initialFilters]);

  // We reuse ProductsList but it will now be biased by the filters we set
  // To make it look more like a category page, we might want to hide the Hero
  // but for "Maison" feel, typically all main pages have a hero.
  // However, I'll update ProductsList to allow hiding the hero via prop if needed.
  return <ProductsList />;
};

export default CategoryPage;
