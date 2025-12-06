// app/page.tsx

async function getArticles() {
  const res = await fetch("http://localhost:8080/api/landing/getArticles/", {
    cache: "no-store",
  });
  const data = await res.json();
  return data.articles;
}

async function getProjects() {
  const res = await fetch("http://localhost:8080/api/landing/getProjects/", {
    cache: "no-store",
  });
  const data = await res.json();
  return data.projects;
}

export default async function Home() {
  const articles = await getArticles();
  const projects = await getProjects();

  return (
    <main className="pt-1 px-6 max-w-5xl mx-auto">
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Articles</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {articles?.map((item: any, index: number) => (
            <div
              key={index}
              className="border p-4 rounded-lg"
              style={{ borderColor: "#a61e4d" }}
            >
              <p className="text-xl font-semibold mb-2">{item.title}</p>
              <p className="opacity-80">{item.content}</p>
              <p className="opacity-80">{item.author.username}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Projects</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
          {projects?.map((item: any, index: number) => (
            <div
              key={index}
              className="border p-4 rounded-lg"
              style={{ borderColor: "#364fc7" }}
            >
              <p className="text-xl font-semibold mb-2">{item.title}</p>
              <p className="opacity-80">{item.description}</p>
              <p className="opacity-80">{item.tools}</p>
              <p className="opacity-80">{item.author.username}</p>
            </div>
          ))}
        </div>
      </section>

    </main>
  );
}
