import { useState } from "react";
import { Link, NavLink, Outlet } from "react-router";

export default function LayoutPrincipal() {
  // On retient l'article entier : la page Favoris peut ainsi afficher les titres
  const [favoris, setFavoris] = useState([]);

  function basculerFavori(article) {
    const dejaFavori = favoris.some((favori) => favori.id === article.id);
    if (dejaFavori) {
      setFavoris(favoris.filter((favori) => favori.id !== article.id));
    } else {
      setFavoris([...favoris, article]);
    }
  }

  return (
    <div>
      <header className="barre-nav">
        <div className="conteneur">
          <Link to="/">
            <img
              className="logo"
              src="/logo-teranga-blog.png"
              alt="Teranga Blog"
            />
          </Link>
          <NavLink to="/" end>
            Accueil
          </NavLink>
          <NavLink to="/articles">Articles</NavLink>
          <NavLink to="/auteurs">Auteurs</NavLink>
          <NavLink to="/favoris">Favoris ({favoris.length})</NavLink>
        </div>
      </header>

      <main className="conteneur">
        <Outlet context={{ favoris, basculerFavori }} />
      </main>
    </div>
  );
}