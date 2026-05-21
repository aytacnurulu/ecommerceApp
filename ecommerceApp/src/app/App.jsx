// import AppRoutes from "./routes/index";
// import { BrowserRouter } from "react-router-dom";
// import { ProductsContext } from "../context/ProductContext";

// export default function App() {
//   return (
//     <BrowserRouter>
//       <ProductsContext>
//         <AppRoutes />
//       </ProductsContext>
//     </BrowserRouter>
//   );
// }



// import AppRoutes from "./routes/index";
import { BrowserRouter } from "react-router-dom";
import  ProductProvider  from "../context/ProductContext";
import CategoryList from "../features/home/components/CategoryList";
import AppRoutes from "./routes/index";
export default function App() {
  return (
    <BrowserRouter>
      <ProductProvider>
        <AppRoutes />
        <CategoryList />
      </ProductProvider>
    </BrowserRouter>
  );
}
