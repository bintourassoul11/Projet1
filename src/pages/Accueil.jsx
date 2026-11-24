import ArticleCard from "../components/ArticleCard";
import {articlesDeTest} from "../donnees-test";

export default function Accueil(){
  return (
     <div>
      <h1>Bienvenue sur Teranga Blog  </h1>
        <ArticleCard article={articlesDeTest[0]}/>
        <ArticleCard article={articlesDeTest[1]}/>
        <ArticleCard article={articlesDeTest[2]}/>
        </div>
  );
}