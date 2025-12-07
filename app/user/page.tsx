"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);


export default function UserDashboard() {
    const router = useRouter();

    const [articles, setArticles] = useState([]);
    const [projects, setProjects] = useState([]);

    const [visibleArticles, setVisibleArticles] = useState(2);
    const [visibleProjects, setVisibleProjects] = useState(2);

    const [loading, setLoading] = useState(true);

    const fetchUserData = async () => {
        const token = localStorage.getItem("token");

        if (!token) {
            router.push("/login");
            return;
        }

        try {
            const [articleRes, projectRes] = await Promise.all([
                fetch("http://localhost:8080/api/article/userArticle", {
                    headers: { Authorization: `Bearer ${token}` },
                }),
                fetch("http://localhost:8080/api/project/userProject", {
                    headers: { Authorization: `Bearer ${token}` },
                }),
            ]);

            if (!articleRes.ok || !projectRes.ok) {
                router.push("/login");
                return;
            }

            const articleData = await articleRes.json();
            const projectData = await projectRes.json();

            setArticles(articleData.articles || []);
            setProjects(projectData.projects || []);

        } catch (err) {
            console.error(err);
            router.push("/login");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUserData();
    }, []);

    if (loading) return <p className="mt-20 text-center">Loading...</p>;

    const editArticle = async (id: string) => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
        const res = await fetch(`http://localhost:8080/api/article/userArticle/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        const data = await res.json();

        if (!res.ok) {
            alert(data.error || "Failed to get article");
            return;
        }

        // simpan data ke localStorage agar bisa dipakai halaman update
        localStorage.setItem("edit_article", JSON.stringify(data.article));

        router.push(`/dashboard/article/update/${id}`);

    } catch (err) {
        console.error(err);
    }
};

const editProject = async (id: string) => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
        const res = await fetch(`http://localhost:8080/api/project/userProject/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        const data = await res.json();

        if (!res.ok) {
            alert(data.error || "Failed to get project");
            return;
        }

        localStorage.setItem("edit_project", JSON.stringify(data.project));

        router.push(`/dashboard/project/update/${id}`);

    } catch (err) {
        console.error(err);
    }
};


    const deleteArticle = async (id: string) => {
    const token = localStorage.getItem("token");
    if (!token) return;

    if (!confirm("Are you sure you want to delete this article?")) return;

    try {
        const res = await fetch(`http://localhost:8080/api/article/userArticle/${id}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        const data = await res.json();

        if (!res.ok) {
            alert(data.error || "Failed to delete article");
            return;
        }

        // remove from UI
        setArticles(prev => prev.filter((a: any) => a.id !== id));

    } catch (error) {
        console.error(error);
    }
};

const deleteProject = async (id: string) => {
    const token = localStorage.getItem("token");
    if (!token) return;

    if (!confirm("Are you sure you want to delete this project?")) return;

    try {
        const res = await fetch(`http://localhost:8080/api/project/userProject/${id}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        const data = await res.json();

        if (!res.ok) {
            alert(data.error || "Failed to delete project");
            return;
        }

        // remove from UI
        setProjects(prev => prev.filter((p: any) => p.id !== id));

    } catch (error) {
        console.error(error);
    }
};


    return (
        <main className="pt-2 px-6 max-w-5xl mx-auto">

            <section className="mb-12">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-2xl font-semibold">Your Articles</h2>
                    <button
                        onClick={() => router.push("/dashboard/article/new")}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                    >
                        Add Article
                    </button>
                </div>

                {articles.length === 0 ? (
                    <p className="opacity-70">You have no articles.</p>
                ) : (
                    <>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {articles.slice(0, visibleArticles).map((item: any, index: number) => {
    return (
        <div key={index} className="border p-4 pt-5 rounded-lg relative">
            <div className="absolute top-2 inset-x-2 flex justify-between">
                {/* DELETE BUTTON */}
                <button
                    onClick={() => deleteArticle(item.id)}
                    className="text-blue-600 hover:text-blue-800"
                >
                    ❌
                </button>

                {/* UPDATE BUTTON */}
                <button
                    onClick={() => editArticle(item.id)}
                    className="text-blue-600 hover:text-blue-800"
                >
                    ✏️
                </button>
            </div>

            <div className="grid grid-cols-[100px_1fr] gap-y-1">
                <span className="opacity-80">title:</span>
                <span className="font-medium">{item.title}</span>

                <span className="opacity-80">description:</span>
                <span className="font-medium">{item.content}</span>

                <span className="opacity-80">author:</span>
                <span className="font-medium">{item.author.username}</span>

                <span className="opacity-80">posted:</span>
                <span className="font-medium">
                    {dayjs(item.createdAt).fromNow()}
                </span>
            </div>
        </div>
    );
})}
</div>
                        <div className="mt-4 text-center">
                            {visibleArticles >= articles.length ? (
                                <button
                                    disabled
                                    className="px-4 py-2 bg-gray-400 text-white rounded-lg cursor-not-allowed"
                                >
                                    Max
                                </button>
                            ) : (
                                <button
                                    onClick={() => setVisibleArticles(prev => prev + 5)}
                                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                                >
                                    Load More
                                </button>
                            )}
                        </div>
                    </>
                )}
            </section>

            <section>
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-2xl font-semibold">Your Projects</h2>
                    <button
                        onClick={() => router.push("/dashboard/project/new")}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                    >
                        Add Project
                    </button>
                </div>

                {projects.length === 0 ? (
                    <p className="opacity-70">You have no projects.</p>
                ) : (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    {projects.slice(0, visibleProjects).map((item: any, index: number) => (
        <div key={index} className="border p-4 pt-8 rounded-lg relative">
            <div className="absolute top-2 inset-x-2 flex justify-between">
            {/* DELETE BUTTON */}
            <button
                onClick={() => deleteProject(item.id)}
                className="text-red-600 hover:text-red-800"
            >
                ❌
            </button>
            <button
            onClick={() => editProject(item.id)}
            className="text-blue-600 hover:text-blue-800">
                ✏️
            </button>

            </div>

            <div className="grid grid-cols-[100px_1fr] gap-y-1">
                <span className="opacity-80">title:</span>
                <span className="font-medium">{item.title}</span>

                <span className="opacity-80">description:</span>
                <span className="font-medium">{item.description}</span>

                <span className="opacity-80">tools:</span>
                <span className="font-medium">{item.tools}</span>

                <span className="opacity-80">author:</span>
                <span className="font-medium">{item.author.username}</span>

                <span className="opacity-80">posted:</span>
                <span className="font-medium">{dayjs(item.createdAt).fromNow()}</span>
            </div>
        </div>
    ))}
</div>
                        <div className="mt-4 mb-10 text-center">
                            {visibleProjects >= projects.length ? (
                                <button
                                    disabled
                                    className="px-4 py-2 bg-gray-400 text-white rounded-lg cursor-not-allowed"
                                >
                                    Max
                                </button>
                            ) : (
                                <button
                                    onClick={() => setVisibleProjects(prev => prev + 5)}
                                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                                >
                                    Load More
                                </button>
                            )}
                        </div>
                    </>
                )}
            </section>

        </main>
    );
}