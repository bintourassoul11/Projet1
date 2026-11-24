export default function ArticleCard({article}){
  return(
   <article className="article-card">
   <h2>{article.title}</h2>
   <p>{article.body}</p>
   </article>
);
}  