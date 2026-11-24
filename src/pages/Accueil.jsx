import { useState } from "react";
import BarreRecherche from "../components/BarreRecherche";
import ListeArticles from "../components/ListeArticles";
import ListeCommentaires from "../components/ListeCommentaires";
import CommentaireForm from "../components/CommentaireForm";
import { articlesDeTest, commentairesDeTest } from "../donnees-test";

export default function Accueil() {
  const [favoris, setFavoris] = useState([]);
  const [recherche, setRecherche] = useState("");
  const [commentaires, setCommentaires] = useState(commentairesDeTest);

  function basculerFavori(id) {
    if (favoris.includes(id)) {
      setFavoris(favoris.filter((idFavori) => idFavori !== id));
    } else {
      setFavoris([...favoris, id]);
    }
  }

  function ajouterCommentaire(nom, message) {
    const nouveauCommentaire = {
      id: Date.now(),
      postId: 1,
      name: nom,
      body: message,
    };
    setCommentaires([...commentaires, nouveauCommentaire]);
  }

  const articlesAffiches = articlesDeTest.filter((article) =>
    article.title.toLowerCase().includes(recherche.toLowerCase())
  );

  return (
    <div>
      <h1>Bienvenue sur Teranga Blog</h1>
      <p>Articles en favori : {favoris.length}</p>

      <BarreRecherche recherche={recherche} onChangerRecherche={setRecherche} />

      <ListeArticles
        articles={articlesAffiches}
        favoris={favoris}
        onBasculerFavori={basculerFavori}
      />

      <ListeCommentaires commentaires={commentaires} />
      <CommentaireForm onAjouter={ajouterCommentaire} />
    </div>
  );
}