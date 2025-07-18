import { useState } from "react";
import NewsCard from "../components/NewsCard";
import AddNewsModal from "../components/AddNewsModal";
import { isLoggedIn } from "../auth";
import type { Article } from "../App";

export default function Home({ articles, setArticles }: { articles: Article[]; setArticles: React.Dispatch<React.SetStateAction<Article[]>> }) {
  const [showAdd, setShowAdd] = useState(false);

  const deleteArticle = (id: number) => {
    setArticles(arts => arts.filter(a => a.id !== id));
  };

  const addArticle = (a: Article) => {
    setArticles(arts => [a, ...arts]);
  };

  return (
    <div className="p-4 space-y-4">
      {isLoggedIn() && (
        <button className="bg-green-600 text-white px-4 py-2" onClick={() => setShowAdd(true)}>
          Add News
        </button>
      )}
      {articles.map(article => (
        <NewsCard
          key={article.id}
          article={article}
          onDelete={isLoggedIn() ? () => deleteArticle(article.id) : undefined}
        />
      ))}
      {showAdd && <AddNewsModal onAdd={addArticle} onClose={() => setShowAdd(false)} />}
    </div>
  );
}
