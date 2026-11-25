import { Link, useOutletContext } from "react-router";
import ListeArticles from "../components/ListeArticles";

export default function Favoris() {
  const { favoris, basculerFavori } = useOutletContext();

  return (
    <div>
      <h1>Mes favoris</h1>

      {favoris.length === 0 ? (
        <p>
          Aucun favori pour le moment. Parcourez les{" "}
          <Link to="/articles">articles</Link> pour en ajouter.
        </p>
      ) : (
        <ListeArticles
          articles={favoris}
          favoris={favoris}
          onBasculerFavori={basculerFavori}
        />
      )}
    </div>
  );
}