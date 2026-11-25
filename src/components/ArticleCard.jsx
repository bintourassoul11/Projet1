import { Link } from "react-router";

export default function ArticleCard({ article, estFavori, onBasculerFavori }) {
  return (
    <article className="carte">
      <h2>
        <Link to={`/articles/${article.id}`}>{article.title}</Link>
      </h2>
      <p>{article.body}</p>
      <button className="bouton" onClick={() => onBasculerFavori(article)}>
        {estFavori ? "Retirer des favoris" : "Ajouter aux favoris"}
      </button>
    </article>
  );
}