// app/page.tsx
import LandingCompanyProfile from "./components/LandingCompanyProfile";
import LandingArticles from "./components/LandingArticles";
import LandingProjects from "./components/LandingProjects";

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

      <LandingCompanyProfile />
      <LandingArticles articles={articles} />
      <LandingProjects projects={projects} />

    </main>
  );
}
