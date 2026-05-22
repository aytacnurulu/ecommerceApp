// src/app/routes/protected/index.jsx
import { Route, Routes, Navigate } from "react-router-dom";
import Home from "../../../features/home/pages/Home";
import ProductList from "../../../features/products/pages/ProductList";
import ProductDetail from "../../../features/products/pages/ProductDetail";
import Favorites from "../../../features/favorites/pages/Favorites";
import Cart from "../../../features/cart/pages/Cart";

// Profile
import ProfileLayout from "../../../shared/layout/ProfileLayout/ProfileLayout";
import Orders from "../../../features/profile/Orders";
import Addresses from "../../../features/profile/Address";
import Settings from "../../../features/profile/pages/Settings";

// Checkout stubs
const Checkout = () => (
  <div style={{ padding: 32 }}>💳 Checkout coming soon</div>
);
const OrderSuccess = () => (
  <div style={{ padding: 32, color: "green" }}>🎉 Order placed!</div>
);

export default function ProtectedRouter() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/product" element={<ProductList />} />
      <Route path="/product/:id" element={<ProductDetail />} />
      <Route path="/favorites" element={<Favorites />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/order-success" element={<OrderSuccess />} />

      {/* Profile — nested */}
      <Route path="/profile" element={<ProfileLayout />}>
        <Route index element={<Navigate to="orders" replace />} />
        <Route path="orders" element={<Orders />} />
        <Route path="addresses" element={<Addresses />} />
        <Route path="settings" element={<Settings />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
