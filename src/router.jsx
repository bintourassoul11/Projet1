import { createBrowserRouter } from "react-router";
import LayoutPrincipal from "./layouts/LayoutPrincipal.jsx";
import Accueil from "./pages/Accueil.jsx";
import Articles from "./pages/Articles.jsx";
import Article from "./pages/Article.jsx";
import Auteurs from "./pages/Auteurs.jsx";
import Auteur from "./pages/Auteur.jsx";
import Favoris from "./pages/Favoris.jsx";
import Introuvable from "./pages/Introuvable.jsx";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <LayoutPrincipal />,
    children: [
      { index: true, element: <Accueil /> },
      { path: "articles", element: <Articles /> },
      { path: "articles/:id", element: <Article /> },
      { path: "auteurs", element: <Auteurs /> },
      { path: "auteurs/:id", element: <Auteur /> },
      { path: "favoris", element: <Favoris /> },
      { path: "*", element: <Introuvable /> },
    ],
  },
]);