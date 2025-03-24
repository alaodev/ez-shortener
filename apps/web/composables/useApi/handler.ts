import { resolveHeaders } from './headers';

type HandlerOptions<TBody> = {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  body?: TBody;
};

export async function apiHandler<TBody = unknown, TResponse = unknown>(
  path: string,
  options: HandlerOptions<TBody>,
): Promise<TResponse> {
  const config = useRuntimeConfig();
  const { baseUrl: baseURL } = config.public;
  const { body, method } = options;
  const headers = resolveHeaders(path);

  try {
    const response = await $fetch<TResponse>(path, {
      baseURL,
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
    });
    return response;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
}
