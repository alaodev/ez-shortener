<script setup lang="ts">
import { useSidebar } from '@/components/ui/sidebar';
import { PanelRightOpen, PanelLeftOpen } from 'lucide-vue-next';

const { open, toggleSidebar } = useSidebar();
</script>

<template>
  <Button size="icon" variant="ghost" @click="toggleSidebar">
    <PanelRightOpen v-if="open" />
    <PanelLeftOpen v-else />
  </Button>
</template>
