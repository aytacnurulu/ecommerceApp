import { createContext, useState } from "react";

export const ProductsContext = createContext(null);

export default function ProductsProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const value = {
    products,
    setProducts,
    loading,
    setLoading,
  };

  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  );
}
