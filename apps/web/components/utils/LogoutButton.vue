<script setup lang="ts">
import { LogOut } from 'lucide-vue-next';

const authStore = useAuthStore();

const { logoutUser } = authStore;

async function handleLogoutUser() {
  await logoutUser();
  return navigateTo('/');
}
</script>

<template>
  <Button size="icon" variant="ghost" @click="handleLogoutUser">
    <LogOut />
  </Button>
</template>
