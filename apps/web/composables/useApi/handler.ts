import { resolveHeaders } from './headers';

type HandlerOptions = {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  body?: unknown;
};

export async function apiHandler(path: string, options: HandlerOptions) {
  const config = useRuntimeConfig();
  const { baseUrl: baseURL } = config.public;
  const { body, method } = options;
  const headers = resolveHeaders(path);
  try {
    const response = await $fetch(path, {
      baseURL,
      method,
      headers,
      body: JSON.stringify(body),
    });
    return response;
  } catch (error) {
    console.error('Error');
    throw error;
  }
}
