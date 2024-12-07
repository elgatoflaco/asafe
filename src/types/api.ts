export interface FetchOptions {
  revalidate?: number;
  tags?: string[];
  cache?: RequestCache;
}

export interface ApiError {
  message: string;
  status: number;
}

export interface ApiListResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}
