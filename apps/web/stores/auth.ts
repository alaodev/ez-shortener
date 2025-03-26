import type {
  AuthenticateUserRequestBody,
  AuthenticateUserResponse,
  RegisterUserRequestBody,
  RegisterUserResponse,
} from '@ez-shortener/contracts';

export const useAuthStore = defineStore(
  'auth-store',
  function () {
    const { post, get } = useApi();

    const loading = ref(false);
    const authenticated = ref(false);

    async function authenticateUser(email: string, password: string) {
      loading.value = true;
      try {
        await post<AuthenticateUserRequestBody, AuthenticateUserResponse>(
          '/auth/signin',
          { email, password },
        );
        authenticated.value = true;
      } catch (e) {
        console.error(e);
        throw e;
      } finally {
        loading.value = false;
      }
    }

    async function registerUser(data: {
      username: string;
      email: string;
      password: string;
      passwordConfirmation: string;
    }) {
      loading.value = true;
      try {
        await post<RegisterUserRequestBody, RegisterUserResponse>(
          '/auth/signup',
          data,
        );
      } catch (e) {
        console.error(e);
        throw e;
      } finally {
        loading.value = false;
      }
    }

    async function logoutUser() {
      loading.value = true;
      try {
        await get('/auth/logout');
        authenticated.value = false;
      } catch (e) {
        console.error(e);
        throw e;
      } finally {
        loading.value = false;
      }
    }

    return {
      loading,
      authenticated,
      authenticateUser,
      registerUser,
      logoutUser,
    };
  },
  { persist: { pick: ['authenticated'] } },
);
