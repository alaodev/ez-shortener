<script setup lang="ts">
import SigninForm, {
  type SubmitFormDataType,
} from '@/components/forms/SigninForm.vue';
import { useToast } from '@/components/ui/toast';

definePageMeta({
  auth: false,
  layout: false,
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
  navigateTo('/dashboard');
}
</script>

<template>
  <div
    class="flex min-h-svh flex-col items-center justify-center p-6 md:p-10 md:bg-muted"
  >
    <div class="w-full max-w-sm md:max-w-3xl">
      <SigninForm :disabled="loading" @submit:form="handleAuthenticateUser" />
    </div>
  </div>
</template>
