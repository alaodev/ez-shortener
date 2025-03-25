import type {
  RegisterUserRequestBody,
  RegisterUserResponse,
} from '@ez-shortener/contracts';

export const useAuthStore = defineStore('auth-store', function () {
  const { post } = useApi();

  const loading = ref(false);

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

  return {
    loading,
    registerUser,
  };
});
