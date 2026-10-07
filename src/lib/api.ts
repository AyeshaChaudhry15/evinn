
export class ApiError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

type Options = {
  method?: string;
  body?: unknown;
  query?: Record<string, string | number | boolean | undefined>;
};

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export async function request<T>(
  path: string,
  { method = "GET", body, query }: Options = {}
): Promise<T> {
  const params = new URLSearchParams();

  Object.entries(query ?? {}).forEach(([key, value]) => {
    if (value !== undefined && value !== "") {
      params.set(key, String(value));
    }
  });

  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  const queryString = params.toString();

  const url = `${API_URL}${cleanPath}${
    queryString ? `?${queryString}` : ""
  }`;

  const isFormData = body instanceof FormData;

  try {
    const response = await fetch(url, {
      method,
      credentials: "include",
      headers:
        body !== undefined && !isFormData
          ? {
              "Content-Type": "application/json",
            }
          : undefined,
      body:
        body === undefined
          ? undefined
          : isFormData
            ? body
            : JSON.stringify(body),
    });

    const text = await response.text();

    let data: any = {};

    try {
      data = text ? JSON.parse(text) : {};
    } catch {
      data = {};
    }

    if (!response.ok) {
      if (
        response.status === 401 &&
        !path.includes("/admin/auth/login") &&
        !path.includes("/admin/auth/forgot-password") &&
        !path.includes("/admin/auth/reset-password") &&
        typeof window !== "undefined"
      ) {
        window.location.href = "/admin/login";
      }

      throw new ApiError(
        data.message ||
          data.error ||
          `Request failed with status ${response.status}`,
        response.status
      );
    }

    return data as T;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }

    throw new ApiError(
      "Failed to fetch API. Make sure the backend server is running on http://localhost:5000.",
      0
    );
  }
}

export const api = {
  get: <T>(
    path: string,
    options?: {
      params?: Record<string, string | number | boolean | undefined>;
      query?: Record<string, string | number | boolean | undefined>;
    }
  ) =>
    request<T>(path, {
      query: options?.query ?? options?.params,
    }),

  post: <T>(path: string, body?: unknown) =>
    request<T>(path, {
      method: "POST",
      body,
    }),

  put: <T>(path: string, body?: unknown) =>
    request<T>(path, {
      method: "PUT",
      body,
    }),

  patch: <T>(path: string, body?: unknown) =>
    request<T>(path, {
      method: "PATCH",
      body,
    }),

  delete: <T>(path: string) =>
    request<T>(path, {
      method: "DELETE",
    }),
};

