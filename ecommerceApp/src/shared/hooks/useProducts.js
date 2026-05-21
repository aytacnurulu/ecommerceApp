import { useContext, useMemo, useState } from "react";
import { ProductsContext } from "../../context/ProductContext";

import { getProducts, getProductsById } from "../services/api/product.api"; // sənin API layer

export default function useProducts() {
  const { products, setProducts, loading, setLoading } =
    useContext(ProductsContext);

  const [selectedCategory, setSelectedCategory] = useState("all");

  // 🚀 FETCH PRODUCTS (CACHE + API LAYER istifadə olunur)
  const fetchProducts = async () => {
    if (products.length > 0) return; // cache

    setLoading(true);

    const res = await getProducts();

    if (res.result) {
      setProducts(res.data.products); // dummyjson structure
    }

    setLoading(false);
  };

  // 🔎 GET SINGLE PRODUCT (API version + fallback)
  const fetchProductById = async (id) => {
    const res = await getProductsById(id);

    if (res.result) {
      return res.data;
    }

    return null;
  };

  // 🧠 CATEGORIES (Set logic)
  const categories = useMemo(() => {
    if (!products.length) return [];

    return ["all", ...new Set(products.map((p) => p.category))];
  }, [products]);

  // 🔍 FILTER PRODUCTS
  const filteredProducts = useMemo(() => {
    if (selectedCategory === "all") return products;

    return products.filter((p) => p.category === selectedCategory);
  }, [products, selectedCategory]);

  return {
    products,
    loading,
    fetchProducts,

    categories,
    selectedCategory,
    setSelectedCategory,

    filteredProducts,

    fetchProductById,
  };
}
