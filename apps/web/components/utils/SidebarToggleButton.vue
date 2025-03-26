<script setup lang="ts">
import { PanelRightOpen, PanelLeftOpen } from 'lucide-vue-next';

const navigationStore = useNavigationStore();

const { sidebarOpen } = storeToRefs(navigationStore);

const { toggleSidebar } = navigationStore;
</script>

<template>
  <Button size="icon" variant="ghost" @click="toggleSidebar">
    <PanelRightOpen v-if="sidebarOpen" />
    <PanelLeftOpen v-else />
  </Button>
</template>
