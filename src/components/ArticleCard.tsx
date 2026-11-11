import type { Article } from "../types";

export function ArticleCard({article,featured=false}:{article:Article;featured?:boolean}) {
  const date = new Intl.DateTimeFormat("en-US",{month:"short",day:"numeric",year:"numeric"})
    .format(new Date(`${article.publishedAt}T12:00:00`));
  return <article className={`card${featured ? " card--featured" : ""}`}>
    <div className="card__visual" aria-hidden="true"><span>{article.topic}</span></div>
    <div className="card__content">
      <div className="meta"><span>{article.topic}</span><span>{article.readMinutes} min read</span></div>
      <h3>{article.title}</h3>
      <p>{article.excerpt}</p>
      <footer><span>By {article.author}</span><time dateTime={article.publishedAt}>{date}</time></footer>
    </div>
  </article>;
}