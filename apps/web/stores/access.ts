import type { FindAllUserAccessResponse } from '@ez-shortener/contracts';

export const useAccessStore = defineStore('access-store', function () {
  const { get } = useApi();
  const { connect, disconnect, on } = useSocket();

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

  function getAccessWs() {
    connect('/ws/access');
    on('userAccessUpdated', (msg) => {
      access.value = msg as FindAllUserAccessResponse;
    });
  }

  return {
    loadingAccess,
    access,
    getAccess,
    getAccessWs,
    wsDisconnect: disconnect,
  };
});
