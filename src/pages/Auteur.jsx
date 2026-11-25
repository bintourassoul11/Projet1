import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import { API_URL } from "../constants";
import EtatRequete from "../components/EtatRequete";

export default function Auteur() {
  const { id } = useParams();
  const [auteur, setAuteur] = useState(null);
  const [articles, setArticles] = useState([]);
  const [chargement, setChargement] = useState(true);
  const [erreur, setErreur] = useState(null);

  useEffect(() => {
    const controleur = new AbortController();
    setChargement(true);
    setErreur(null);

    Promise.all([
      fetch(`${API_URL}/users/${id}`, { signal: controleur.signal }),
      fetch(`${API_URL}/posts?userId=${id}`, { signal: controleur.signal }),
    ])
      .then(([repAuteur, repArticles]) => {
        if (!repAuteur.ok || !repArticles.ok) {
          throw new Error("Erreur de chargement");
        }
        return Promise.all([repAuteur.json(), repArticles.json()]);
      })
      .then(([donneesAuteur, donneesArticles]) => {
        setAuteur(donneesAuteur);
        setArticles(donneesArticles);
        setChargement(false);
      })
      .catch((e) => {
        if (e.name === "AbortError") return;
        setErreur("Impossible de charger cet auteur.");
        setChargement(false);
      });

    return () => controleur.abort();
  }, [id]);

  return (
    <div>
      <Link to="/auteurs">← Retour aux auteurs</Link>

      <EtatRequete chargement={chargement} erreur={erreur}>
        {auteur && (
          <div>
            <h1>{auteur.name}</h1>
            <p className="discret">@{auteur.username}</p>
            <p>Email : {auteur.email}</p>
            <p>Téléphone : {auteur.phone}</p>
            <p>Entreprise : {auteur.company.name}</p>

            <h2>Articles de {auteur.name}</h2>
            <div className="grille">
              {articles.map((article) => (
                <div className="carte" key={article.id}>
                  <h3>
                    <Link to={`/articles/${article.id}`}>{article.title}</Link>
                  </h3>
                  <p>{article.body}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </EtatRequete>
    </div>
  );
}