import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { user } = useSelector((store) => store.auth);
  const navigate = useNavigate();

  useEffect(() => {
    // If no user or user is not recruiter, redirect
    if (!user || user.role !== "recruiter") {
      navigate("/", { replace: true });
    }
  }, [user, navigate]);

  // Prevent UI from flashing before redirect
  if (!user || user.role !== "recruiter") {
    return null;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
