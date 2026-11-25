import { Link } from "react-router";

export default function Introuvable() {
  return (
    <div>
      <h1>Page introuvable</h1>
      <p>Cette adresse n'existe pas sur Teranga Blog.</p>
      <Link to="/">Retour à l'accueil</Link>
    </div>
  );
}