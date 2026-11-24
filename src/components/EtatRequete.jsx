export default function EtatRequete({ chargement, erreur, children }) {
  if (chargement) {
    return <p className="etat-chargement">Chargement en cours...</p>;
  }
  if (erreur) {
    return <p className="etat-erreur">{erreur}</p>;
  }
  return <>{children}</>;
}