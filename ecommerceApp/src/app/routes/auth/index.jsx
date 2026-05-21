import { Route, Routes } from "react-router-dom";

import ForgetPassword from "../../../features/auth/components/ForgetPassword";
import SignIn from "../../../features/auth/components/SignIn";
import SignUp from "../../../features/auth/components/SignUp";
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
