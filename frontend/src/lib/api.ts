const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:3333";

export class ApiError extends Error {
  fieldErrors: Record<string, string>;
  generalMessage: string | null;

  constructor(
    fieldErrors: Record<string, string>,
    generalMessage: string | null,
  ) {
    super(generalMessage ?? "Request failed");
    this.fieldErrors = fieldErrors;
    this.generalMessage = generalMessage;
  }
}

type JiraLikeError = { field?: string; message: string };

async function toApiError(res: Response): Promise<ApiError> {
  let body: { errors?: JiraLikeError[] } | null = null;
  try {
    body = await res.json();
  } catch {
    // no body / not JSON
  }

  const fieldErrors: Record<string, string> = {};
  const generalMessages: string[] = [];

  for (const error of body?.errors ?? []) {
    if (error.field) {
      fieldErrors[error.field] ??= error.message;
    } else {
      generalMessages.push(error.message);
    }
  }

  const generalMessage =
    generalMessages.length > 0
      ? generalMessages.join(" ")
      : Object.keys(fieldErrors).length === 0
        ? `Something went wrong (status ${res.status}).`
        : null;

  return new ApiError(fieldErrors, generalMessage);
}

export async function request<T>(
  path: string,
  options: { method?: string; body?: unknown; token?: string | null } = {},
): Promise<T> {
  const { method = "GET", body, token } = options;

  let res: Response;
  try {
    res = await fetch(`${API_URL}${path}`, {
      method,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: body ? JSON.stringify(body) : undefined,
    });
  } catch {
    throw new ApiError(
      {},
      "Could not reach the server. Please check your connection.",
    );
  }

  if (!res.ok) {
    throw await toApiError(res);
  }

  if (res.status === 204) {
    return undefined as T;
  }

  return (await res.json()) as T;
}
