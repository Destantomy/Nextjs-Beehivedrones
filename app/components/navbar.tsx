"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { jwtDecode } from "jwt-decode";
import { useRouter, usePathname } from "next/navigation";

interface JwtPayload {
    username: string;
}

export default function Navbar() {
    const [isLogin, setIsLogin] = useState(false);
    const [username, setUsername] = useState<string | null>(null);

    const router = useRouter();
    const pathname = usePathname();

    const loadUser = () => {
        const token = localStorage.getItem("token");
        if (!token) {
            setIsLogin(false);
            setUsername(null);
            return;
        }

        try {
            const decoded = jwtDecode<JwtPayload>(token);
            setUsername(decoded.username);
            setIsLogin(true);
        } catch {
            setIsLogin(false);
            setUsername(null);
        }
    };

    // panggil ulang loadUser tiap route berubah
    useEffect(() => {
        loadUser();
    }, [pathname]);

    const handleLogout = () => {
        localStorage.removeItem("token");
        loadUser();
        router.push("/");
    };

    return (
        <nav className="w-full bg-[#2b8a3e] text-white py-4 px-6 flex justify-between items-center fixed top-0 left-0 z-50 shadow">
            <Link href="/" className="text-xl font-semibold">
                Beehiver-Drones
            </Link>

            <div className="flex space-x-6 items-center">
                {!isLogin ? (
                    <>
                        <Link href="/login">Login</Link>
                        <Link href="/signup">Signup</Link>
                    </>
                ) : (
                    <>
                        <span className="opacity-90">Hello, {username}</span>
                        <Link href="/user">Admin Panel</Link>
                        <button onClick={handleLogout} className="hover:underline">
                            Logout
                        </button>
                    </>
                )}
            </div>
        </nav>
    );
}
