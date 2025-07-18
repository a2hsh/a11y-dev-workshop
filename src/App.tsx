import { useState } from "react";
import { RouterProvider } from "react-router";
import routes from "./routes";
import news from "./data/news.json";

export type Article = {
  id: number;
  title: string;
  image: string;
  content: string;
};

export default function App() {
  const [articles, setArticles] = useState<Article[]>(news as Article[]);
  const router = routes(articles, setArticles);
  return <RouterProvider router={router} />;
}
