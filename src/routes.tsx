import { createBrowserRouter } from "react-router";
import Home from "./pages/Home";
import Login from "./pages/Login";
import ArticlePage from "./pages/ArticlePage";
import type { Article } from "./App";

export default function routes(articles: Article[], setArticles: React.Dispatch<React.SetStateAction<Article[]>>) {
  return createBrowserRouter([
    { path: "/", element: <Home articles={articles} setArticles={setArticles} /> },
    { path: "/login", element: <Login /> },
    { path: "/article/:id", element: <ArticlePage articles={articles} /> },
  ]);
}
