<script setup lang="ts">
import { FormInput } from 'lucide-vue-next';
</script>

<template>
  <Button size="icon" variant="ghost" @click="navigateTo('/shorten')">
    <FormInput />
  </Button>
</template>
