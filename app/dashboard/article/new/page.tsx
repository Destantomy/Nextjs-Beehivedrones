"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NewArticlePage() {
    const router = useRouter();

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [message, setMessage] = useState<string | null>(null);
    const [isError, setIsError] = useState<boolean>(false);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    const token = localStorage.getItem("token");

    try {
        const res = await fetch("http://localhost:8080/api/article/userArticle", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ title, content }),
        });

        const data = await res.json();

        if (data.error) {
            setIsError(true);
            setMessage(data.error);
        } else {
            setIsError(false);
            setMessage(data.message);

            // redirect 1.2s setelah sukses
            setTimeout(() => {
                router.push("/user");
            }, 1200);
        }
    } catch (err) {
        setIsError(true);
        setMessage("Request failed");
    } finally {
        setLoading(false);
    }
};


    return (
        <main className="max-w-xl mx-auto pt-10 px-4">
            <h1 className="text-3xl font-semibold mb-6">Create New Article</h1>
            {message && (
                <p className={`mb-4 p-3 rounded border
                    ${isError ? "bg-red-100 border-red-400 text-red-700 text-center": "bg-green-100 border-green-400 text-green-700 text-center"
                    }`}> {message} </p>)}
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">

                <input
                    type="text"
                    placeholder="Article title"
                    className="border p-2 rounded"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />

                <textarea
                    placeholder="Article content"
                    className="border p-2 rounded h-40"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                />

                <button
                    type="submit"
                    disabled={loading}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
                >
                    {loading ? "Saving..." : "Save Article"}
                </button>

            </form>
        </main>
    );
}
