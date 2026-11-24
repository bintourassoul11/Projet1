export default function ArticleCard({ article, estFavori, onBasculerFavori }) {
  return (
    <article className="carte">
      <h2>{article.title}</h2>
      <p>{article.body}</p>
      <button className="bouton" onClick={() => onBasculerFavori(article.id)}>
        {estFavori ? "Retirer des favoris" : "Ajouter aux favoris"}
      </button>
    </article>
  );
}