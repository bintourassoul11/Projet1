import { useEffect, useState } from "react";
import { Link } from "react-router";
import { API_URL } from "../constants";
import EtatRequete from "../components/EtatRequete";

export default function Auteurs() {
  const [auteurs, setAuteurs] = useState([]);
  const [chargement, setChargement] = useState(true);
  const [erreur, setErreur] = useState(null);

  useEffect(() => {
    const controleur = new AbortController();

    fetch(`${API_URL}/users`, { signal: controleur.signal })
      .then((reponse) => {
        if (!reponse.ok) {
          throw new Error("Erreur " + reponse.status);
        }
        return reponse.json();
      })
      .then((donnees) => {
        setAuteurs(donnees);
        setChargement(false);
      })
      .catch((e) => {
        if (e.name === "AbortError") return;
        setErreur("Impossible de charger les auteurs.");
        setChargement(false);
      });

    return () => controleur.abort();
  }, []);

  return (
    <div>
      <h1>Auteurs</h1>

      <EtatRequete chargement={chargement} erreur={erreur}>
        <div className="grille">
          {auteurs.map((auteur) => (
            <div className="carte" key={auteur.id}>
              <h3>
                <Link to={`/auteurs/${auteur.id}`}>{auteur.name}</Link>
              </h3>
              <p className="discret">@{auteur.username}</p>
              <p>{auteur.email}</p>
              <p className="discret">{auteur.company.name}</p>
            </div>
          ))}
        </div>
      </EtatRequete>
    </div>
  );
}