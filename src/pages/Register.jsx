import { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();

        if (!name || !email || !password) {
            toast.error("All fields are required");
            return;
        }

        try {
            await api.post("/auth/register", {
                name,
                email,
                password,
            });

            toast.success("Account created successfully 🎉");

            navigate("/login");
        } catch (error) {
            toast.error(
                error.response?.data?.message || "Registration failed ❌"
            );
        }
    };

    return (
        <div className="p-10 max-w-md mx-auto">
            <h2 className="text-2xl font-bold mb-4">Register</h2>

            <form onSubmit={handleRegister} className="space-y-4">
                <input
                    className="w-full border p-2"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />

                <input
                    className="w-full border p-2"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    type="password"
                    className="w-full border p-2"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button className="w-full bg-black text-white p-2">
                    Register
                </button>
            </form>
        </div>
    );
}
