// services/api/product.api.js

import axios from "axios";

const productApi = axios.create({
  baseURL: "https://dummyjson.com",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 5000,
});

export default productApi;