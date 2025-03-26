export const useNavigationStore = defineStore(
  'navigation-store',
  function () {
    const sidebarOpen = ref(true);

    function toggleSidebar() {
      sidebarOpen.value = !sidebarOpen.value;
    }

    return {
      sidebarOpen,
      toggleSidebar,
    };
  },
  {
    persist: {
      pick: ['sidebarOpen'],
    },
  },
);
