import { useState } from "react";
import BarreRecherche from "../components/BarreRecherche";
import ListeArticles from "../components/ListeArticles";
import ListeCommentaires from "../components/ListeCommentaires";
import CommentaireForm from "../components/CommentaireForm";
import Article from "./Article";
import Auteur from "./Auteur";
import { articlesDeTest, commentairesDeTest } from "../donnees-test";

export default function Accueil() {
  const [favoris, setFavoris] = useState([]);
  const [recherche, setRecherche] = useState("");
  const [commentaires, setCommentaires] = useState(commentairesDeTest);
  const [idTest, setIdTest] = useState(1);

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

      <hr />
      <button className="bouton" onClick={() => setIdTest(idTest + 1)}>
        Suivant
      </button>
      <button className="bouton secondaire" onClick={() => setIdTest(999)}>
        Id inexistant
      </button>
      <button className="bouton secondaire" onClick={() => setIdTest(1)}>
        Revenir à 1
      </button>
      <Article id={idTest} />
      <hr />
      <Auteur id={idTest} />
    </div>
  );
}