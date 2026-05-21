import { errorHandler, successHandler } from "../handler";
import productApi from "../../helper/product";
import { ENDPOINTS } from "../endpoint";

export async function getProducts() {
  try {
    const response = await productApi.get(ENDPOINTS.PRODUCTS.INDEX);

    return successHandler(response);
  } catch (error) {
    return errorHandler(error);
  }
}

export async function getProductsById(productId) {
  try {
    const response = await productApi.get(ENDPOINTS.PRODUCTS.DETAIL(productId));

    return successHandler(response);
  } catch (error) {
    return errorHandler(error);
  }
}
