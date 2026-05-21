import ProtectedRoute from "../routes/protected/index";
import AuthRouter from "../routes/auth/index";
import MainLayout from "../../shared/layout/MainLayout";
function AppRoutes() {
  const authenticated = true;

  return authenticated ? (
    <MainLayout>
      <ProtectedRoute />{" "}
    </MainLayout>
  ) : (
    <AuthRouter />
  );
}

export default AppRoutes;
