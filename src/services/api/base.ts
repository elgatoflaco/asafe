import { ApiError } from "@/types/api";

interface FetchOptions {
  revalidate?: number;
  tags?: string[];
  cache?: RequestCache;
}

export async function fetchApi<T>(
  url: string,
  options: FetchOptions = {}
): Promise<T> {
  try {
    const response = await fetch(url, {
      next: {
        revalidate: options.revalidate,
        tags: options.tags,
      },
      cache: options.cache,
      headers: {
        "Cache-Control": options.revalidate
          ? `public, max-age=${options.revalidate}, stale-while-revalidate=59`
          : "no-cache",
      },
    });

    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }

    return response.json();
  } catch (error) {
    throw {
      message: error instanceof Error ? error.message : "Error desconocido",
      status: 500,
    } as ApiError;
  }
}
