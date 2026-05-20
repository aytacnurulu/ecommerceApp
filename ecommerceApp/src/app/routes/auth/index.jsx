import { Route, Routes } from "react-router-dom";

import ForgetPassword from "../../../feature/auth/ForgetPassword";
import SignIn from "../../../feature/auth/SignIn";
import SignUp from "../../../feature/auth/SignUp";
import NotFound from "../../../shared/components/NotFound";

function AuthRouter() {
  return (
    <Routes>
      <Route path="/sign-in" element={<SignIn />} />
      <Route path="/sign-up" element={<SignUp />} />
      <Route path="/forget-password" element={<ForgetPassword />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default AuthRouter;
