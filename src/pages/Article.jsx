import { useEffect, useState } from "react";
import { API_URL } from "../constants";
import EtatRequete from "../components/EtatRequete";
import ListeCommentaires from "../components/ListeCommentaires";
import CommentaireForm from "../components/CommentaireForm";

export default function Article({ id }) {
  const [article, setArticle] = useState(null);
  const [commentaires, setCommentaires] = useState([]);
  const [chargement, setChargement] = useState(true);
  const [erreur, setErreur] = useState(null);

  useEffect(() => {
    const controleur = new AbortController();
    setChargement(true);
    setErreur(null);

    Promise.all([
      fetch(`${API_URL}/posts/${id}`, { signal: controleur.signal }),
      fetch(`${API_URL}/posts/${id}/comments`, { signal: controleur.signal }),
    ])
      .then(([repArticle, repCommentaires]) => {
        if (!repArticle.ok || !repCommentaires.ok) {
          throw new Error("Erreur de chargement");
        }
        return Promise.all([repArticle.json(), repCommentaires.json()]);
      })
      .then(([donneesArticle, donneesCommentaires]) => {
        setArticle(donneesArticle);
        setCommentaires(donneesCommentaires);
        setChargement(false);
      })
      .catch((e) => {
        if (e.name === "AbortError") return;
        setErreur("Impossible de charger cet article.");
        setChargement(false);
      });

    return () => controleur.abort();
  }, [id]);

  function ajouterCommentaire(nom, message) {
    const nouveauCommentaire = {
      id: Date.now(),
      postId: article.id,
      name: nom,
      body: message,
    };
    setCommentaires([...commentaires, nouveauCommentaire]);
  }

  return (
    <div>
      <EtatRequete chargement={chargement} erreur={erreur}>
        {article && (
          <div>
            <h1>{article.title}</h1>
            <p>{article.body}</p>
            <ListeCommentaires commentaires={commentaires} />
            <CommentaireForm onAjouter={ajouterCommentaire} />
          </div>
        )}
      </EtatRequete>
    </div>
  );
}