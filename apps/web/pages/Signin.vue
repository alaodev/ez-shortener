<script setup lang="ts">
import SigninForm, {
  type SubmitFormDataType,
} from '@/components/forms/SigninForm.vue';
import { useToast } from '@/components/ui/toast';

definePageMeta({
  auth: false,
  layout: false,
  pageTransition: false,
  name: 'signin',
  path: '/',
});

const authStore = useAuthStore();

const { loading } = storeToRefs(authStore);

const { authenticateUser } = authStore;
const { toast } = useToast();

async function handleAuthenticateUser(data: SubmitFormDataType) {
  const { email, password } = data;
  await authenticateUser(email, password);
  toast({ title: 'Welcome', description: 'Login successfully!' });
  navigateTo('/shorten');
}
</script>

<template>
  <div
    class="w-full grid h-screen lg:grid-cols-2 xl:grid-cols-5 2xl:grid-cols-3"
  >
    <div class="flex items-center justify-center xl:col-span-2 2xl:col-span-1">
      <SigninForm :disabled="loading" @submit:form="handleAuthenticateUser" />
    </div>
    <div
      class="hidden items-center justify-center bg-[url('/placeholder.svg')] bg-cover bg-center lg:flex xl:col-span-3 2xl:col-span-2 filter dark:invert"
    >
      <div class="text-center w-[400px] space-y-4 xl:w-[520px] xl:text-left">
        <h1 class="text-5xl font-bold text-white xl:text-7xl">Welcome back!</h1>
        <p class="text-xl font-light text-white xl:text-2xl">
          You can sign in to access with your existing account.
        </p>
      </div>
    </div>
  </div>
</template>
