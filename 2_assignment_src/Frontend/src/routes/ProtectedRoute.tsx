/* I doubt that the amount of react boilerplate will ever be worth it even for the project work... */
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { getStoredJWTToken } from "../services/authService.ts";

/* This should prevent (with additional routing changes) from just navigating to /databases view and
 * being able to see that page (even though it does not actually show data due to JWT token backend validation) 
 * */
export default function ProtectedRoute() {
  const location = useLocation();
  const token = getStoredJWTToken();

  if (!token) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: location }}
      />
    );
  }

  return <Outlet />;
}
