"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";

export default function UpdateProject() {
    const router = useRouter();
    const { id } = useParams();

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [tools, setTools] = useState("");

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) return router.push("/login");

        fetch(`http://localhost:8080/api/project/userProject/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
        })
            .then((res) => res.json())
            .then((data) => {
                setTitle(data.project.title);
                setDescription(data.project.description);
                setTools(data.project.tools);
            })
            .catch(() => router.push("/user"))
            .finally(() => setLoading(false));
    }, [id]);

    const handleUpdate = async () => {
        const token = localStorage.getItem("token");

        const res = await fetch(
            `http://localhost:8080/api/project/userProject/${id}`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ title, description, tools }),
            }
        );

        const data = await res.json();

        if (!res.ok) {
            alert(data.error || "Update failed");
            return;
        }

        alert("Project updated!");
        router.push("/user");
    };

    if (loading) return <p className="text-center mt-20">Loading...</p>;

    return (
        <main className="p-8 max-w-xl mx-auto">
            <h2 className="text-2xl font-bold mb-6">Edit Project</h2>

            <div className="flex flex-col gap-4">
                <input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="border p-2 rounded"
                    placeholder="Title"
                />

                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="border p-2 rounded h-32"
                    placeholder="Description"
                />

                <input
                    value={tools}
                    onChange={(e) => setTools(e.target.value)}
                    className="border p-2 rounded"
                    placeholder="Tools"
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
