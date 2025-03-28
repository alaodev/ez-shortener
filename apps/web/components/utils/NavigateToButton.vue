<script setup lang="ts">
export type Props = {
  to: string;
  icon: Component;
};

defineProps<Props>();
</script>

<template>
  <Button size="icon" variant="ghost" @click="navigateTo(to)">
    <component :is="icon" />
  </Button>
</template>
