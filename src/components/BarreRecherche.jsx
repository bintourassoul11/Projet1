export default function BarreRecherche({ recherche, onChangerRecherche }) {
  return (
    <input
      className="champ"
      type="text"
      placeholder="Rechercher un article par titre..."
      value={recherche}
      onChange={(event) => onChangerRecherche(event.target.value)}
    />
  );
}