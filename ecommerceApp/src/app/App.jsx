import AppRoutes from "./routes/index";
import { BrowserRouter } from "react-router-dom";
import { ProductsContext } from "../context/ProductContext";

export default function App() {
  return (
    <BrowserRouter>
      <ProductsContext>
        <AppRoutes />
      </ProductsContext>
    </BrowserRouter>
  );
}
