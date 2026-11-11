import type { Topic, SortOrder } from "../types";

interface Props {
  query: string;
  topic: Topic | "All";
  sort: SortOrder;
  onQuery: (value: string) => void;
  onTopic: (value: Topic | "All") => void;
  onSort: (value: SortOrder) => void;
}

export function Filters({query,topic,sort,onQuery,onTopic,onSort}: Props) {
  return <section className="filters" aria-label="Filter stories">
    <label className="search">
      <span className="sr-only">Search stories</span>
      <input type="search" value={query} placeholder="Search stories…"
        onChange={event => onQuery(event.target.value)} />
    </label>
    <label>
      <span className="sr-only">Filter by topic</span>
      <select value={topic} onChange={event => onTopic(event.target.value as Topic | "All")}>
        <option>All</option><option>Design</option><option>Engineering</option><option>Culture</option>
      </select>
    </label>
    <label>
      <span className="sr-only">Sort stories</span>
      <select value={sort} onChange={event => onSort(event.target.value as SortOrder)}>
        <option value="newest">Newest first</option><option value="oldest">Oldest first</option><option value="title">Title A–Z</option>
      </select>
    </label>
  </section>;
}