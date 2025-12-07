"use client";

import { useState } from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

export default function LandingProjects({ projects = [] }: { projects?: any[] }) {
  const [visible, setVisible] = useState(2);

  return (
    <section className="mb-10">
      <h2 className="text-2xl font-semibold mb-4 mt-10">Projects</h2>

      {/* Jika kosong, tampilkan pesan */}
      {projects.length === 0 ? (
        <p className="text-gray-500 mb-4">No projects available.</p>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {projects.slice(0, visible).map((item, index) => (
              <div
                key={index}
                className="border p-4 rounded-lg"
                style={{ borderColor: "#364fc7" }}
              >
                <p className="text-xl font-semibold mb-2">{item.title}</p>
                <p className="opacity-80">{item.description}</p>
                <p className="opacity-80">tools: {item.tools}</p>
                <p className="opacity-80">author: {item.author.username}</p>
                <p className="opacity-80">
                  posted: {dayjs(item.createdAt).fromNow()}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-4 text-center">
            {visible >= projects.length ? (
              <button
                disabled
                className="px-4 py-2 bg-gray-400 text-white rounded-lg cursor-not-allowed"
              >
                Max
              </button>
            ) : (
              <button
                onClick={() => setVisible((prev) => prev + 4)}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                Load More
              </button>
            )}
          </div>
        </>
      )}
    </section>
  );
}
