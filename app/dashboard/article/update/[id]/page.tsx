"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";

export default function UpdateArticle() {
    const router = useRouter();
    const { id } = useParams();

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const [loading, setLoading] = useState(true);

    // Fetch article data first
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) return router.push("/login");

        if (!id) return;

    console.log("FETCH ARTICLE ID:", id);
    console.log("API URL:", `http://localhost:8080/api/article/userArticle/${id}`);
    console.log("TOKEN:", token);

    const fetchData = async () => {
        try {
            const res = await fetch(`http://localhost:8080/api/article/userArticle/${id}`, {
                headers: {
                    "Authorization": `Bearer ${token}`,
                },
            });

            // const data = await res.json();
            // console.log("API RESPONSE:", data);
            const text = await res.text();
console.log("RAW RESPONSE:", text);
        } catch (err) {
            console.error("Fetch Error:", err);   // ← (bagian #2)
        }
    };

    fetchData();
    }, [id]);

    const handleUpdate = async () => {
        const token = localStorage.getItem("token");
        if (!token) return;

        const res = await fetch(
            `http://localhost:8080/api/article/userArticle/${id}`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ title, content }),
            }
        );

        const data = await res.json();

        if (!res.ok) {
            alert(data.error || "Update failed");
            return;
        }

        alert("Article updated!");
        router.push("/user");
    };

    if (loading) return <p className="text-center mt-20">Loading...</p>;

    return (
        <main className="p-8 max-w-xl mx-auto">
            <h2 className="text-2xl font-bold mb-6">Edit Article</h2>

            <div className="flex flex-col gap-4">
                <input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="border p-2 rounded"
                    placeholder="Title"
                />

                <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="border p-2 rounded h-32"
                    placeholder="Content"
                />

                <button
                    onClick={handleUpdate}
                    className="bg-blue-600 text-white py-2 rounded"
                >
                    Save Changes
                </button>
            </div>
        </main>
    );
}
