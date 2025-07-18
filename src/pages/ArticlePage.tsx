import { useParams } from "react-router";
import type { Article } from "../App";

export default function ArticlePage({ articles }: { articles: Article[] }) {
  const { id } = useParams();
  const article = articles.find(a => a.id === Number(id));
  if (!article) return <p className="p-4">Not found</p>;
  return (
    <div className="p-4 space-y-4" style={{ background: "var(--bg-color)" }}>
      {/* image missing alt */}
      <img src={article.image} className="w-full h-64 object-cover" />
      {/* title not a heading */}
      <div className="text-2xl" style={{ color: "var(--text-color)" }}>
        {article.title}
      </div>
      <p style={{ color: "var(--text-color)" }}>{article.content}</p>
    </div>
  );
}
