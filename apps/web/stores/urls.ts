import type {
  ShortenUrlRequestBody,
  ShortenUrlResponse,
} from '@ez-shortener/contracts';

export const useUrlsStore = defineStore('urls-store', function () {
  const { post } = useApi();

  const loading = ref(false);
  const shortenedUrl = ref('');

  async function shortenUrl(originalUrl: string) {
    loading.value = true;
    const startTime = Date.now();
    const loadingTimeMin = 1000;
    try {
      const createdUrl = await post<ShortenUrlRequestBody, ShortenUrlResponse>(
        '/urls/shorten',
        { originalUrl },
      );
      return createdUrl;
    } catch (e) {
      console.error(e);
      throw e;
    } finally {
      const elapsedTime = Date.now() - startTime;
      const remainingTime = Math.max(0, loadingTimeMin - elapsedTime);
      setTimeout(() => {
        loading.value = false;
      }, remainingTime);
    }
  }

  async function resetStore() {
    loading.value = false;
    shortenedUrl.value = '';
  }

  return { loading, shortenedUrl, shortenUrl, resetStore };
});
