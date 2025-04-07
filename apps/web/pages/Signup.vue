<script setup lang="ts">
import SignupForm, {
  type SubmitFormDataType,
} from '@/components/forms/SignupForm.vue';
import { useToast } from '@/components/ui/toast';

definePageMeta({
  auth: false,
  layout: false,
  pageTransition: false,
  name: 'signup',
  path: '/signup',
});

const authStore = useAuthStore();

const { loading } = storeToRefs(authStore);

const { registerUser } = authStore;
const { toast } = useToast();

async function handleRegisterUser(data: SubmitFormDataType) {
  await registerUser(data);
  toast({ title: 'Good news', description: 'User created successfully!' });
  navigateTo('/');
}
</script>

<template>
  <div
    class="flex min-h-svh flex-col items-center justify-center p-6 md:p-10 md:bg-muted"
  >
    <div class="w-full max-w-sm md:max-w-3xl">
      <SignupForm :disabled="loading" @submit:form="handleRegisterUser" />
    </div>
  </div>
</template>
