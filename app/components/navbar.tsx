"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { jwtDecode } from "jwt-decode";

interface JwtPayload {
    username: string;
}

export default function Navbar() {
    const [isLogin, setIsLogin] = useState(false);
    const [username, setUsername] = useState<string | null>(null);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            try {
                const decoded = jwtDecode<JwtPayload>(token);
                setUsername(decoded.username);
                setIsLogin(true);
            } catch {
                setIsLogin(false);
                setUsername(null);
            }
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        setIsLogin(false);
        setUsername(null);
    };

    return (
        <nav className="w-full bg-[#2b8a3e] text-white py-4 px-6 flex justify-between items-center fixed top-0 left-0 z-50 shadow">
            
            {/* Logo */}
            <Link href="/" className="text-xl font-semibold">
                Beehiver-Drones
            </Link>

            {/* Menu kanan */}
            <div className="flex space-x-6 items-center">

                {!isLogin ? (
                    <>
                        <Link href="/login" className="hover:underline">
                            Login
                        </Link>
                        <Link href="/signup" className="hover:underline">
                            Signup
                        </Link>
                    </>
                ) : (
                    <>
                        <span className="opacity-90">{username}</span>
                        <Link href="/article" className="hover:underline">
                            Article
                        </Link>
                        <Link href="/project" className="hover:underline">
                            Project
                        </Link>
                        <button
                            onClick={handleLogout}
                            className="hover:underline"
                        >
                            Logout
                        </button>
                    </>
                )}

            </div>
        </nav>
    );
}
