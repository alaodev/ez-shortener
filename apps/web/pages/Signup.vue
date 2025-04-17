<script setup lang="ts">
import { Loader2 } from 'lucide-vue-next';
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
    <div
      class="hidden items-center justify-center bg-[url('/placeholder.svg')] bg-cover bg-center lg:flex xl:col-span-3 2xl:col-span-2 filter dark:invert"
    >
      <div class="text-center w-[325px] space-y-4 xl:w-[460px] xl:text-left">
        <h1 class="text-5xl font-bold text-white xl:text-7xl">
          Let's register!
        </h1>
        <p class="text-xl font-light text-white xl:text-2xl">
          Fill in your details below to sign up.
        </p>
      </div>
    </div>
    <div
      v-auto-animate
      class="flex items-center justify-center xl:col-span-2 2xl:col-span-1"
    >
      <SignupForm
        v-if="!loading"
        :disabled="loading"
        @submit:form="handleRegisterUser"
      />
      <Loader2 v-else class="animate-spin" />
    </div>
  </div>
</template>
