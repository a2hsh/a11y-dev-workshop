import { useState } from "react";

export function NewsCard() {
  const [liked, setLiked] = useState(false);

  return (
    <div className="news-card border p-4 flex gap-4" style={{ background: "var(--bg-color)" }}>
      {/* image missing alt text on purpose */}
      <img src="https://placekitten.com/300/200" />
      <div className="content flex flex-col gap-2">
        {/* non-semantic heading */}
        <div className="title text-lg" style={{ color: "var(--text-color)" }}>
          Cute Cats Invade the Internet
        </div>
        <p className="text-sm" style={{ color: "var(--text-color)" }}>
          Kittens have taken over the world wide web with adorable pictures.
        </p>
        {/* clickable div */}
        <div
          className="like p-2 mt-2 text-sm text-center bg-blue-600 text-white"
          onClick={() => setLiked(!liked)}
        >
          {liked ? "Liked" : "Like"}
        </div>
      </div>
    </div>
  );
}
