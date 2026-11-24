import { useState } from "react";

export default function CommentaireForm({ onAjouter }) {
  const [nom, setNom] = useState("");
  const [message, setMessage] = useState("");
  const [erreur, setErreur] = useState("");

  function soumettre(event) {
    event.preventDefault();

    if (nom.trim() === "") {
      setErreur("Le nom est obligatoire.");
      return;
    }
    if (message.trim().length < 5) {
      setErreur("Le message doit contenir au moins 5 caractères.");
      return;
    }

    onAjouter(nom.trim(), message.trim());
    setNom("");
    setMessage("");
    setErreur("");
  }

  return (
    <form onSubmit={soumettre}>
      <h3>Laisser un commentaire</h3>

      <input
        className="champ"
        type="text"
        placeholder="Votre nom"
        value={nom}
        onChange={(event) => setNom(event.target.value)}
      />

      <textarea
        className="champ"
        placeholder="Votre message"
        value={message}
        onChange={(event) => setMessage(event.target.value)}
      />

      {erreur && <p className="message-erreur">{erreur}</p>}

      <button className="bouton" type="submit">
        Publier
      </button>
    </form>
  );
}