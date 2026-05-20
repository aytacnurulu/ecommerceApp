// import { createBrowserRouter, Navigate, Outlet } from "react-router-dom";
// import MainLayout from "../shared/layout/MainLayout";
// import Home from "../features/home/pages/Home";
// import ProtectedRoute from "./ProtectedRoute";
// import { AuthRoutes } from "./AuthRoutes";

// // Digər səhifələr üçün müvəqqəti vizuallar
// const ProductListMock = () => (
//   <div className="p-5 bg-white rounded">Ürün Listesi Sayfası (Filtreler)</div>
// );
// const ProductDetailMock = () => (
//   <div className="p-5 bg-white rounded">Ürün Detay Sayfası</div>
// );
// const FavoritesMock = () => (
//   <div className="p-5 bg-white rounded">Favorilerim Sayfası</div>
// );
// const CartMock = () => (
//   <div className="p-5 bg-white rounded">Sepetim Sayfası</div>
// );
// const AuthLayoutMock = () => (
//   <div className="min-h-screen bg-gray-100 flex items-center justify-center">
//     <div className="w-full max-w-md">
//       <Outlet />
//     </div>
//   </div>
// );

// export const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <MainLayout />,
//     children: [
//       { index: true, element: <Home /> },
//       { path: "products", element: <ProductListMock /> },
//       { path: "product/:id", element: <ProductDetailMock /> },

//       // Giriş tələb edən qorunan marşrutlar
//       {
//         element: <ProtectedRoute />,
//         children: [
//           { path: "favorites", element: <FavoritesMock /> },
//           { path: "cart", element: <CartMock /> },
//         ],
//       },
//     ],
//   },
//   {
//     path: "/auth",
//     element: <AuthLayoutMock />,
//     children: AuthRoutes,
//   },
//   // Səhv link yazılarsa birbaşa Ana səhifəyə atsın
//   {
//     path: "*",
//     element: <Navigate to="/" replace />,
//   },
// ]);
