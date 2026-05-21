export const ENDPOINTS = {
  PRODUCTS: {
    INDEX: "/products",
    DETAIL: (productId) => {
      `/products/${productId}`;
    },
  },
};
