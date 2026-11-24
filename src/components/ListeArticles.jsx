import ArticleCard from "./ArticleCard";

export default function ListeArticles({ articles, favoris, onBasculerFavori }) {
  return (
    <div className="grille">
      {articles.map((article) => (
        <ArticleCard
          key={article.id}
          article={article}
          estFavori={favoris.includes(article.id)}
          onBasculerFavori={onBasculerFavori}
        />
      ))}
    </div>
  );
}