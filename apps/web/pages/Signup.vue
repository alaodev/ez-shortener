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
    class="w-full grid h-screen lg:grid-cols-2 xl:grid-cols-5 2xl:grid-cols-3"
  >
    <div class="hidden bg-muted relative lg:block xl:col-span-3 2xl:col-span-2">
      <img
        src="/placeholder.svg"
        width="1920"
        height="1080"
        class="absolute h-full w-full object-cover"
      />
    </div>
    <div class="flex items-center justify-center xl:col-span-2 2xl:col-span-1">
      <SignupForm :disabled="loading" @submit:form="handleRegisterUser" />
    </div>
  </div>
</template>
