import { articles } from "../data/articles";
import type { Article } from "../types";

/** Replace this demo adapter with fetch() or a GraphQL client in production. */
export async function getArticles(signal?: AbortSignal): Promise<Article[]> {
  await new Promise<void>((resolve, reject) => {
    const timer = window.setTimeout(resolve, 120);
    signal?.addEventListener("abort", () => {
      window.clearTimeout(timer);
      reject(new DOMException("Request aborted", "AbortError"));
    }, {once:true});
  });
  if (signal?.aborted) throw new DOMException("Request aborted", "AbortError");
  return articles;
}