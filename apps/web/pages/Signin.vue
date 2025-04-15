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
  navigateTo('/dashboard');
}
</script>

<template>
  <div
    class="w-full grid h-screen lg:grid-cols-2 xl:grid-cols-5 2xl:grid-cols-3"
  >
    <div class="flex items-center justify-center xl:col-span-2 2xl:col-span-1">
      <SigninForm :disabled="loading" @submit:form="handleAuthenticateUser" />
    </div>
    <div class="hidden bg-muted relative lg:block xl:col-span-3 2xl:col-span-2">
      <img
        src="/placeholder.svg"
        width="1920"
        height="1080"
        class="absolute h-full w-full object-cover"
      />
    </div>
  </div>
</template>
