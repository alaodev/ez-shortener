import { createProxyMiddleware } from 'http-proxy-middleware';

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const { apiGatewayUrl: target } = config.public;
  const { req, res } = event.node;
  if (req.url?.startsWith('/api')) {
    return new Promise((resolve, reject) => {
      const proxy = createProxyMiddleware({
        target,
        changeOrigin: true,
        pathRewrite: { '^/api': '' },
        xfwd: true,
      });
      proxy(req, res, (result) => {
        if (result instanceof Error) reject(result);
        else resolve(result);
      });
    });
  }
});
