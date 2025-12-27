import { Navigate } from "react-router-dom";
import useAuthStore from "../store/authStore";
import toast from "react-hot-toast";

export default function PrivateRoute({ children }) {
    const user = useAuthStore((state) => state.user);

    if (!user) {
        toast.error("Login first to access dashboard");
        return <Navigate to="/login" replace />;
    }

    return children;
}