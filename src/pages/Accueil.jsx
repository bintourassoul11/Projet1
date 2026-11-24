import { useState } from "react";
import ArticleCard from "../components/ArticleCard";
import { articlesDeTest } from "../donnees-test";

export default function Accueil() {
  // Liste des id des articles mis en favori (vide au départ)
  const [favoris, setFavoris] = useState([]);

  // Ajoute l'id s'il n'y est pas, le retire s'il y est déjà
  function basculerFavori(id) {
    if (favoris.includes(id)) {
      setFavoris(favoris.filter((idFavori) => idFavori !== id));
    } else {
      setFavoris([...favoris, id]);
    }
  }

  return (
    <div>
      <h1>Bienvenue sur Teranga Blog</h1>
      <p>Articles en favori : {favoris.length}</p>

      <ArticleCard
        article={articlesDeTest[0]}
        estFavori={favoris.includes(articlesDeTest[0].id)}
        onBasculerFavori={basculerFavori}
      />
      <ArticleCard
        article={articlesDeTest[1]}
        estFavori={favoris.includes(articlesDeTest[1].id)}
        onBasculerFavori={basculerFavori}
      />
      <ArticleCard
        article={articlesDeTest[2]}
        estFavori={favoris.includes(articlesDeTest[2].id)}
        onBasculerFavori={basculerFavori}
      />
    </div>
  );
}