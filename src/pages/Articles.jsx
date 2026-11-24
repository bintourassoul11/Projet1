import { useEffect, useState } from "react";
import { API_URL } from "../constants";
import EtatRequete from "../components/EtatRequete";
import BarreRecherche from "../components/BarreRecherche";
import ListeArticles from "../components/ListeArticles";

export default function Articles() {
  const [articles, setArticles] = useState([]);
  const [chargement, setChargement] = useState(true);
  const [erreur, setErreur] = useState(null);
  const [recherche, setRecherche] = useState("");
  const [favoris, setFavoris] = useState([]);

  useEffect(() => {
    const controleur = new AbortController();

    fetch(`${API_URL}/posts?_limit=12`, { signal: controleur.signal })
      .then((reponse) => {
        if (!reponse.ok) {
          throw new Error("Erreur " + reponse.status);
        }
        return reponse.json();
      })
      .then((donnees) => {
        setArticles(donnees);
        setChargement(false);
      })
      .catch((e) => {
        if (e.name === "AbortError") return;
        setErreur("Impossible de charger les articles.");
        setChargement(false);
      });

    return () => controleur.abort();
  }, []);

  function basculerFavori(id) {
    if (favoris.includes(id)) {
      setFavoris(favoris.filter((idFavori) => idFavori !== id));
    } else {
      setFavoris([...favoris, id]);
    }
  }

  const articlesAffiches = articles.filter((article) =>
    article.title.toLowerCase().includes(recherche.toLowerCase())
  );

  return (
    <div>
      <h1>Articles</h1>
      <p>Articles en favori : {favoris.length}</p>

      <BarreRecherche recherche={recherche} onChangerRecherche={setRecherche} />

      <EtatRequete chargement={chargement} erreur={erreur}>
        <ListeArticles
          articles={articlesAffiches}
          favoris={favoris}
          onBasculerFavori={basculerFavori}
        />
      </EtatRequete>
    </div>
  );
}