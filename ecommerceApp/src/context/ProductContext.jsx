import { createContext, useState, useEffect, useMemo } from "react";
import axios from "axios";

export const ProductsContext = createContext({
  products: [],
  loading: false,
  categories: [],
});

export default function ProductsProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await axios.get("https://dummyjson.com/products");
        setProducts(response.data.products);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const categories = useMemo(() => {
    const categorySet = new Set(products.map((product) => product.category));
    return Array.from(categorySet);
  }, [products]);

  const value = {
    products,
    loading,
    categories,
  };

  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  );
}
