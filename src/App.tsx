import { useMemo, useState } from "react";
import { ArticleCard } from "./components/ArticleCard";
import { Filters } from "./components/Filters";
import { useArticles } from "./hooks/useArticles";
import type { SortOrder, Topic } from "./types";

const PAGE_SIZE = 6;

export default function App() {
  const {articles,isLoading,error} = useArticles();
  const [query,setQuery] = useState("");
  const [topic,setTopic] = useState<Topic | "All">("All");
  const [sort,setSort] = useState<SortOrder>("newest");
  const [page,setPage] = useState(1);

  const results = useMemo(() => {
    const term = query.trim().toLocaleLowerCase();
    return articles.filter(article => {
      const matchesTopic = topic === "All" || article.topic === topic;
      const text = `${article.title} ${article.excerpt} ${article.author}`.toLocaleLowerCase();
      return matchesTopic && text.includes(term);
    }).sort((a,b) => {
      if (sort === "title") return a.title.localeCompare(b.title);
      const delta = Date.parse(a.publishedAt) - Date.parse(b.publishedAt);
      return sort === "newest" ? -delta : delta;
    });
  },[articles,query,topic,sort]);

  const pageCount = Math.max(1,Math.ceil(results.length / PAGE_SIZE));
  const pageItems = results.slice((page-1)*PAGE_SIZE,page*PAGE_SIZE);

  const changeQuery = (value:string) => {setQuery(value);setPage(1);};
  const changeTopic = (value:Topic | "All") => {setTopic(value);setPage(1);};
  const changeSort = (value:SortOrder) => {setSort(value);setPage(1);};

  return <div className="shell">
    <header className="topbar">
      <a className="logo" href="#" aria-label="Fieldnotes home">fieldnotes<span>.</span></a>
      <nav aria-label="Main navigation"><a href="#stories" aria-current="page">Stories</a><a href="#about">About</a></nav>
      <span className="topbar__note">Ideas for a thoughtful web</span>
    </header>

    <main>
      <section className="hero">
        <p className="eyebrow">The Fieldnotes Journal · Issue 04</p>
        <h1>Good work starts<br/><em>with good questions.</em></h1>
        <p className="intro">Notes on design, technology, and the people shaping a more useful web.</p>
        <div className="rule"><span>Curiosity, considered.</span><span>Est. 2025</span></div>
      </section>

      <section id="stories" className="stories" aria-labelledby="stories-title">
        <div className="section-head"><div><p className="eyebrow">Explore the journal</p><h2 id="stories-title">Latest stories</h2></div>
          <span className="count" aria-live="polite">{isLoading ? "Loading…" : `${results.length} stories`}</span>
        </div>
        <Filters query={query} topic={topic} sort={sort} onQuery={changeQuery} onTopic={changeTopic} onSort={changeSort}/>
        {isLoading && <p className="feedback" role="status">Loading stories…</p>}
        {error && <p className="feedback error" role="alert">{error}</p>}
        {!isLoading && !error && pageItems.length === 0 && <div className="feedback" role="status">
          <strong>No stories found.</strong><span>Try another search or choose a different topic.</span>
          <button className="clear" onClick={() => {changeQuery("");changeTopic("All");}}>Clear filters</button>
        </div>}
        {!isLoading && !error && pageItems.length > 0 && <>
          <div className="grid">{pageItems.map((article,index) =>
            <ArticleCard key={article.id} article={article} featured={page===1 && index===0 && !query && topic==="All"}/>
          )}</div>
          {pageCount > 1 && <nav className="pagination" aria-label="Story pages">
            <button disabled={page===1} onClick={() => setPage(page-1)}>Previous</button>
            <span aria-live="polite">Page <strong>{page}</strong> of {pageCount}</span>
            <button disabled={page===pageCount} onClick={() => setPage(page+1)}>Next</button>
          </nav>}
        </>}
      </section>
      <section id="about" className="about"><p className="eyebrow">A small note</p>
        <p>Fieldnotes is a fictional editorial demo exploring clear content, accessible interactions, and considered frontend engineering.</p>
      </section>
    </main>
    <footer className="footer"><a className="logo" href="#">fieldnotes<span>.</span></a><span>Frontend engineering sample</span><span>© 2025 Fieldnotes</span></footer>
  </div>;
}