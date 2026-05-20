// import { RouterProvider } from "react-router-dom";
// import { router } from "../../src/routes";
import CategoryList from "../features/home/components/CategoryList";
import Home from "../features/home/pages/Home/Home";
// import Header from "../shared/components/Header/Header"
import ProductCard from "../shared/components/ProductCard";
import MainLayout from "../shared/layout/MainLayout/MainLayout";
export default function App() {
  // return <RouterProvider router={router} />;

  return (
    <div>
      <MainLayout>
        <Home />
        <CategoryList />
      

      </MainLayout>
    </div>
  );
}
