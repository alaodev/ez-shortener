import type {
  DeleteUserUrlResponse,
  FindAllUserUrlsResponse,
  ShortenUrlRequestBody,
  ShortenUrlResponse,
} from '@ez-shortener/contracts';

export const useUrlsStore = defineStore('urls-store', function () {
  const { post, get, del } = useApi();

  const loadingShortenUrl = ref(false);
  const loadingGetUrls = ref(false);
  const loadingDeleteUrl = ref(false);
  const urls = ref<FindAllUserUrlsResponse>([]);
  const shortenedUrl = ref('');

  async function shortenUrl(originalUrl: string) {
    loadingShortenUrl.value = true;
    const startTime = Date.now();
    const loadingTimeMin = 1000;
    try {
      const createdUrl = await post<ShortenUrlRequestBody, ShortenUrlResponse>(
        '/urls/shorten',
        { originalUrl },
      );
      urls.value.unshift(createdUrl);
      return createdUrl;
    } catch (e) {
      console.error(e);
      throw e;
    } finally {
      const elapsedTime = Date.now() - startTime;
      const remainingTime = Math.max(0, loadingTimeMin - elapsedTime);
      setTimeout(() => {
        loadingShortenUrl.value = false;
      }, remainingTime);
    }
  }

  async function getUrls() {
    loadingGetUrls.value = true;
    try {
      const findedUrls = await get<FindAllUserUrlsResponse>('/urls');
      urls.value = findedUrls;
      return findedUrls;
    } catch (e) {
      console.error(e);
      throw e;
    } finally {
      loadingGetUrls.value = false;
    }
  }

  async function deleteUrl(id: string) {
    loadingDeleteUrl.value = true;
    try {
      const deletedUrl = await del<DeleteUserUrlResponse>(`/urls/${id}`);
      urls.value = urls.value.filter((url) => url.id !== deletedUrl.id);
    } catch (e) {
      console.error(e);
      throw e;
    } finally {
      loadingDeleteUrl.value = false;
    }
  }

  async function resetStore() {
    loadingShortenUrl.value = false;
    loadingGetUrls.value = false;
    shortenedUrl.value = '';
  }

  return {
    loadingShortenUrl,
    loadingGetUrls,
    loadingDeleteUrl,
    urls,
    shortenedUrl,
    shortenUrl,
    getUrls,
    deleteUrl,
    resetStore,
  };
});
