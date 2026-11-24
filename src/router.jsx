import { createBrowserRouter } from "react-router";
import Accueil from "./pages/Accueil.jsx";
import Articles from "./pages/Articles.jsx";
import Auteurs from "./pages/Auteurs.jsx";

// TODO(P500) : étape 5 (chapitre 5).
export const router = createBrowserRouter([
  { path: "/", element: <Accueil /> },
  { path: "/articles", element: <Articles /> },
  { path: "/auteurs", element: <Auteurs /> },
]);