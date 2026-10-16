export class ApiError extends Error {
  constructor(
    message: string,
    public readonly status: number,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

export async function request<T>(
  serviceBaseUrl: string,
  path: string,
  init?: RequestInit,
): Promise<T> {
  const baseUrl = serviceBaseUrl.replace(/\/+$/, "");
  const response = await fetch(`${baseUrl}${path}`, init);
  const responseText = await response.text();
  const responseBody: unknown = responseText ? JSON.parse(responseText) : null;

  if (!response.ok) {
    const message =
      typeof responseBody === "object" &&
      responseBody !== null &&
      "message" in responseBody &&
      typeof responseBody.message === "string"
        ? responseBody.message
        : `İstek başarısız oldu (${response.status}).`;

    throw new ApiError(message, response.status);
  }

  return responseBody as T;
}
