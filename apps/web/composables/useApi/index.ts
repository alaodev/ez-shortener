import { apiHandler } from './handler';

export const useApi = () => {
  async function get<TResponse>(path: string) {
    return apiHandler<null, TResponse>(path, { method: 'GET' });
  }

  async function post<TBody, TResponse>(path: string, body: TBody) {
    return apiHandler<TBody, TResponse>(path, { method: 'POST', body });
  }

  async function put<TBody, TResponse>(path: string, body: TBody) {
    return apiHandler<TBody, TResponse>(path, { method: 'PUT', body });
  }

  async function del<TResponse>(path: string) {
    return apiHandler<null, TResponse>(path, { method: 'DELETE' });
  }

  return { get, post, put, del };
};
