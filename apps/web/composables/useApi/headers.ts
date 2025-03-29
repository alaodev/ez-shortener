type ExtendedHeaders = HeadersInit & {
  'x-kong-api-key'?: string;
};

export function resolveHeaders(path: string) {
  const [_, domain] = path.split('/');
  const apiKey = extractApiKey(domain);
  const headers: ExtendedHeaders = {};
  if (apiKey) headers['x-kong-api-key'] = apiKey;
  if (import.meta.server) {
    const cookie = extractCookie();
    if (cookie) headers['cookie'] = cookie;
  }
  return headers;
}

function extractApiKey(domain: string) {
  const config = useRuntimeConfig();
  const envKey = `${domain.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase())}ApiKey`;
  return (config.public as Record<string, string>)[envKey] || '';
}

function extractCookie() {
  const requestHeadersCookie = useRequestHeaders(['cookie']);
  return requestHeadersCookie.cookie;
}
