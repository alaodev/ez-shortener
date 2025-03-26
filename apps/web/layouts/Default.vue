<script setup lang="ts">
import LogoutButton from '@/components/utils/LogoutButton.vue';
import ThemeSwitcher from '@/components/utils/ThemeSwitcher.vue';
</script>

<template>
  <Navigation>
    <template #actions>
      <ThemeSwitcher />
      <LogoutButton />
    </template>
    <template #main>
      <slot />
    </template>
  </Navigation>
</template>
