"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginForm() {
    const router = useRouter();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const res = await fetch("http://localhost:8080/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password }),
            });

            const data = await res.json();

            if (!res.ok) {
                setError(data.error || "Login failed");
                setLoading(false);
                return;
            }

            // simpan token
            localStorage.setItem("token", data.token);

            // redirect ke dashboard user
            router.push("/user");

        } catch (err) {
            console.error(err);
            setError("Network error");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleLogin} className="flex flex-col space-y-4">

            <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="border px-3 py-2 rounded"
                required
            />

            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border px-3 py-2 rounded"
                required
            />

            {error && (
                <p className="text-red-600 text-sm text-center">{error}</p>
            )}

            <button
                type="submit"
                disabled={loading}
                className="bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
            >
                {loading ? "Logging in..." : "Login"}
            </button>
        </form>
    );
}