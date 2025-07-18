import type { Article } from "../App";
import IconButton from "./IconButton";
import { isLoggedIn } from "../auth";
import { useNavigate } from "react-router";

export default function NewsCard({ article, onDelete }: { article: Article; onDelete?: () => void }) {
  const navigate = useNavigate();
  return (
    <div className="border p-4 flex gap-4" style={{ background: "var(--bg-color)" }}>
      {/* missing alt text */}
      <img src={article.image} className="w-32 h-20 object-cover" />
      <div className="flex-1 flex flex-col gap-2">
        {/* title should be heading but it's a div */}
        <div className="text-lg" style={{ color: "var(--text-color)" }}>
          {article.title}
        </div>
        <div className="text-sm" style={{ color: "var(--text-color)" }}>
          {article.content.slice(0, 60)}...
        </div>
        <div
          className="text-blue-600 cursor-pointer"
          onClick={() => navigate(`/article/${article.id}`)}
        >
          Read More
        </div>
      </div>
      {isLoggedIn() && onDelete && (
        <IconButton onClick={onDelete} />
      )}
    </div>
  );
}
