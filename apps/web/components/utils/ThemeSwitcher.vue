<script setup lang="ts">
import { Moon, Sun } from 'lucide-vue-next';

const colorMode = useColorMode();

function switchColorMode() {
  colorMode.preference = colorMode.preference === 'dark' ? 'light' : 'dark';
}
</script>

<template>
  <Button size="icon" variant="ghost" @click="switchColorMode">
    <Moon v-if="colorMode.preference === 'light'" />
    <Sun v-if="colorMode.preference === 'dark'" />
  </Button>
</template>
