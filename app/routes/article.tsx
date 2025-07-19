import ArticlePage from '../../src/components/ArticlePage';
import newsData from '../../src/data/news.json';

export function meta({ params }: { params: { id?: string } }) {
  const article = newsData.find(a => a.id === Number(params.id));
  return [
    { title: article ? `${article.title} - News Hub` : 'Article - News Hub' },
    { name: 'description', content: article ? article.content.slice(0, 150) : 'News article page' }
  ];
}

export default function Article() {
  return <ArticlePage />;
}
