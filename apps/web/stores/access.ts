import type { FindAllUserAccessResponse } from '@ez-shortener/contracts';

export const useAccessStore = defineStore('access-store', function () {
  const { get } = useApi();

  const loadingAccess = ref(false);
  const access = ref<FindAllUserAccessResponse>([]);

  async function getAccess() {
    loadingAccess.value = true;
    try {
      const foundAccess = await get<FindAllUserAccessResponse>('/access');
      access.value = foundAccess;
      return foundAccess;
    } catch (e) {
      console.error(e);
      throw e;
    } finally {
      loadingAccess.value = false;
    }
  }

  return { loadingAccess, access, getAccess };
});
