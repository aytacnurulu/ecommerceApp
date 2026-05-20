// import styles from "./ProtectedRoute.module.css";

// import { Navigate, Outlet } from 'react-router-dom';

// export default function ProtectedRoute() {
//   // Hələlik qlobal AuthContext qurulana qədər daxil olmuş kimi qəbul edirik (true)
//   // Yoxlamaq üçün bunu false edib test edə bilərsən
//   const isAuthenticated = true; 

//   if (!isAuthenticated) {
//     return <Navigate to="/auth/login" replace />;
//   }

//   // Əgər istifadəçi giriş edibsə, daxildəki səhifəni göstər
//   return <Outlet />;
// }