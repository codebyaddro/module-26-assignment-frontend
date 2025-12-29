import { useState } from "react";
import api from "../services/api";
import useAuthStore from "../store/authStore";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const login = useAuthStore((s) => s.login);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        if (!email || !password) {
            toast.error("Email and password required");
            return;
        }

        try {
            const res = await api.post("/auth/login", { email, password });

            // save auth data
            login(res.data.user, res.data.token);

            toast.success("Login successful 🎉");

            navigate("/dashboard");
        } catch (error) {
            toast.error(
                error.response?.data?.message || "Invalid login credentials ❌"
            );
        }
    };

    return (
        <div className="p-10 max-w-md mx-auto">
            <h2 className="text-2xl font-bold mb-4">Login</h2>

            <form onSubmit={handleLogin} className="space-y-4">
                <input
                    className="w-full border p-2"
                    placeholder="Email"
                    autoComplete="username"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    type="password"
                    className="w-full border p-2"
                    placeholder="Password"
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button className="w-full bg-black text-white p-2">
                    Login
                </button>
            </form>

            <p className="text-sm mt-4 text-center">
                Don\'t have an account?{" "}
                <span
                    onClick={() => navigate("/register")}
                    className="text-blue-600 cursor-pointer hover:underline"
                >
                    Register
                </span>
            </p>
        </div>
    );
}
