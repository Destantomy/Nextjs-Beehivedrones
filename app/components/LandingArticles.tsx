"use client";

import { useState } from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

export default function LandingArticles({ articles }: { articles: any[] | undefined }) {
  const [visible, setVisible] = useState(2);

  // jika undefined atau kosong
  if (!articles || articles.length === 0) {
    return (
      <section className="pt-10 mb-12">
        <h2 className="text-2xl font-semibold mb-4">Articles</h2>
        <p className="opacity-70">No articles available.</p>
      </section>
    );
  }

  return (
    <section className="pt-10 mb-12">
      <h2 className="text-2xl font-semibold mb-4">Articles</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {articles.slice(0, visible).map((item, index) => (
          <div
            key={index}
            className="border p-4 rounded-lg"
            style={{ borderColor: "#a61e4d" }}
          >
            <p className="text-xl font-semibold mb-2">{item.title}</p>
            <p className="opacity-80">{item.content}</p>
            <p className="opacity-80">author: {item.author.username}</p>
            <p className="opacity-80">
              posted: {dayjs(item.createdAt).fromNow()}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-4 text-center">
        {visible >= articles.length ? (
          <button
            disabled
            className="px-4 py-2 bg-gray-400 text-white rounded-lg cursor-not-allowed"
          >
            Max
          </button>
        ) : (
          <button
            onClick={() => setVisible(prev => prev + 4)}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            Load More
          </button>
        )}
      </div>
    </section>
  );
}
