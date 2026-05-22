import { Route, Routes, Navigate, Outlet } from "react-router-dom";
import Home from "../../../features/home/pages/Home";
import ProductList from "../../../features/products/pages/ProductList";
import Favorites from "../../../features/favorites/pages/Favorites";
import ProductDetail from "../../../features/products/pages/ProductDetail";
import Cart from "../../../features/cart/pages/Cart";

// Yeni əlavə olunan səhifələr üçün müvəqqəti komponentlər
const Checkout = () => (
  <div className="p-6 bg-white rounded shadow">
    💳 Ödeme ve Teslimat Bilgileri Sürümü
  </div>
);
const OrderSuccess = () => (
  <div className="p-10 bg-white text-center rounded shadow text-green-600 font-bold">
    🎉 Siparişiniz Başarıyla Alındı! Teşekkür Ederiz.
  </div>
);
const Orders = () => (
  <div className="p-4 bg-gray-50 rounded">
    📦 Geçmiş Siparişleriniz ve Kargo Takibi
  </div>
);
const Addresses = () => (
  <div className="p-4 bg-gray-50 rounded">📍 Kayıtlı Teslimat Adresleriniz</div>
);

// Profil ana səhifəsi (Alt səhifələri Outlet ilə daxilində göstərir)
const ProfileLayout = () => (
  <div className="flex flex-col md:flex-row gap-6 p-6 bg-white rounded shadow">
    <div className="w-full md:w-1/4 border-r pr-4 flex flex-col gap-3 font-semibold text-gray-700">
      <div className="text-sm text-gray-400 uppercase tracking-wider mb-2">
        Account
      </div>
      <a
        href="/profile/orders"
        className="hover:text-trendyol-orange transition-colors"
      >
        Orders
      </a>
      <a
        href="/profile/addresses"
        className="hover:text-trendyol-orange transition-colors"
      >
        Addresses
      </a>
    </div>
    <div className="flex-1">
      <Outlet />{" "}
      {/* Alt marşrutlar (Orders və ya Addresses) bura render olunacaq */}
    </div>
  </div>
);

function ProtectedRouter() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/product" element={<ProductList />} />
      <Route path="/product/:id" element={<ProductDetail />} />
      <Route path="/favorites" element={<Favorites />} />
      <Route path="/cart" element={<Cart />} />

      {/* 1. Sifarişin Tamamlanması Marşrutları */}
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/order-success" element={<OrderSuccess />} />

      {/* 2. İstifadəçi Kabineti (Nested Routes) */}
      <Route path="/profile" element={<ProfileLayout />}>
        {/* /profile yazılarsa birbaşa sifarişlərə yönləndirsin */}
        <Route index element={<Navigate to="orders" replace />} />
        <Route path="orders" element={<Orders />} />
        <Route path="addresses" element={<Addresses />} />
      </Route>

      {/* Səhv link yazılarsa avtomatik Ana Səhifəyə yönləndirmə */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default ProtectedRouter;
