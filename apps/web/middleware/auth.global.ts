export default defineNuxtRouteMiddleware(async (to) => {
  const authPages = ['/', '/signup'];
  const authStore = useAuthStore();
  const { authenticated } = storeToRefs(authStore);
  if (!authenticated.value && to.meta.auth) return navigateTo('/');
  if (authenticated.value && authPages.includes(to.path))
    return navigateTo('/dashboard');
});
