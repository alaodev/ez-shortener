type ExtendedHeaders = HeadersInit & {
  'x-kong-api-key'?: string;
};

export function resolveHeaders(path: string) {
  const [_, domain] = path.split('ws/');
  const apiKey = extractApiKey(`ws${capitalize(domain)}`);
  const headers: ExtendedHeaders = {};
  if (apiKey) headers['x-kong-api-key'] = apiKey;
  return headers;
}

function extractApiKey(domain: string) {
  const config = useRuntimeConfig();
  const envKey = `${domain.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase())}ApiKey`;
  return (config.public as Record<string, string>)[envKey] || '';
}
