import { useAuth } from "../context/authcontext";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, loading } = useAuth();

  // 🟡 WAIT until auth check is finished
  if (loading) {
    return (
      <div
        style={{
          color: "#fff",
          padding: 20,
          textAlign: "center",
        }}
      >
        Loading...
      </div>
    );
  }

  // 🔴 NOT LOGGED IN
  if (!user) {
    return <Navigate to="/signin" replace />;
  }

  // 🔴 ROLE CHECK
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    if (user.role === "admin") return <Navigate to="/admin" replace />;
    if (user.role === "ceo") return <Navigate to="/ceo" replace />;
    return <Navigate to="/dashboard" replace />;
  }

  // 🟢 OK
  return children;
};

export default ProtectedRoute;
