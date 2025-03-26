export default defineNuxtRouteMiddleware(async (to) => {
  const authStore = useAuthStore();
  const { authenticated } = storeToRefs(authStore);
  if (!authenticated.value && to.meta.auth) return navigateTo('/');
  if (authenticated.value && !to.meta.auth) return navigateTo('/dashboard');
});
