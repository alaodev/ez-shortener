import { ResponseError } from '@ez-shortener/exceptions';
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
      onResponseError: async ({ response }) => {
        if (!response.ok) {
          if (response._data.name === 'ResponseError') {
            const { error, message, statusCode }: ResponseError =
              response._data;
            throw new ResponseError(statusCode, message, error);
          }
          throw new Error('unexpected error');
        }
      },
    });
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
