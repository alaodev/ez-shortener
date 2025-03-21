import { apiHandler } from './handler';

export const useApi = () => {
  async function get(path: string) {
    return apiHandler(path, { method: 'GET' });
  }

  async function post(path: string, body: unknown) {
    return apiHandler(path, { method: 'POST', body });
  }

  async function put(path: string, body: unknown) {
    return apiHandler(path, { method: 'PUT', body });
  }

  async function del(path: string) {
    return apiHandler(path, { method: 'DELETE' });
  }

  return { get, post, put, del };
};
