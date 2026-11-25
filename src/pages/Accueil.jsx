import { useEffect, useState } from "react";
import { useOutletContext } from "react-router";
import { API_URL } from "../constants";
import EtatRequete from "../components/EtatRequete";
import ListeArticles from "../components/ListeArticles";

export default function Accueil() {
  const { favoris, basculerFavori } = useOutletContext();
  const [articles, setArticles] = useState([]);
  const [chargement, setChargement] = useState(true);
  const [erreur, setErreur] = useState(null);

  useEffect(() => {
    const controleur = new AbortController();

    fetch(`${API_URL}/posts?_limit=6`, { signal: controleur.signal })
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
        setErreur("Impossible de charger les derniers articles.");
        setChargement(false);
      });

    return () => controleur.abort();
  }, []);

  return (
    <div>
      <h1>Bienvenue sur Teranga Blog</h1>
      <p>Découvrez les derniers articles de la communauté Teranga Academy.</p>

      <EtatRequete chargement={chargement} erreur={erreur}>
        <ListeArticles
          articles={articles}
          favoris={favoris}
          onBasculerFavori={basculerFavori}
        />
      </EtatRequete>
    </div>
  );
}