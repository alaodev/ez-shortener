<script setup lang="ts">
import LogoutButton from '@/components/utils/LogoutButton.vue';
import ThemeSwitcher from '@/components/utils/ThemeSwitcher.vue';
import SidebarToggleButton from '@/components/utils/SidebarToggleButton.vue';
import NavigateToShortenButton from '@/components/utils/NavigateToShortenButton.vue';
</script>

<template>
  <Navigation>
    <template #leading-actions>
      <SidebarToggleButton />
      <NavigateToShortenButton />
    </template>
    <template #actions>
      <ThemeSwitcher />
      <LogoutButton />
    </template>
    <template #main>
      <slot />
    </template>
  </Navigation>
</template>
