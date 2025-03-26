import { ResponseError } from '@ez-shortener/exceptions';
import { useToast } from '@/components/ui/toast';
import { capitalizeString } from '@/util/formatters';
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
  const { toast } = useToast();
  const { baseUrl: baseURL } = config.public;
  const { body, method } = options;
  const headers = resolveHeaders(path);
  try {
    const response = await $fetch<TResponse>(path, {
      baseURL,
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
      credentials: 'include',
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
  } catch (e) {
    if (e instanceof ResponseError) {
      const { error, message, statusCode }: ResponseError = e;
      toast({
        title: `[${statusCode}] ${error}`,
        description: capitalizeString(message),
        variant: 'destructive',
      });
      throw e;
    }
    toast({
      title: '[500] INTERNAL_SERVER_ERROR',
      description: 'Unexpected error. Contact an administrator',
      variant: 'destructive',
    });
    throw e;
  }
}
