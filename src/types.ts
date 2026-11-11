export type Topic = "Design" | "Engineering" | "Culture";
export type SortOrder = "newest" | "oldest" | "title";

export interface Article {
  id: string;
  title: string;
  excerpt: string;
  topic: Topic;
  author: string;
  publishedAt: string;
  readMinutes: number;
}