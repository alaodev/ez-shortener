<script setup lang="ts">
import { Loader2 } from 'lucide-vue-next';
import { useCountdown } from '@vueuse/core';

definePageMeta({
  auth: false,
  layout: false,
  name: 'redirect',
  path: '/:shortId',
});

const urlsStore = useUrlsStore();

const useCountdownSeconds = 10;

const { loadingGetUrlByShortId } = storeToRefs(urlsStore);

const { params } = useRoute();
const { remaining, start: startCountDown } = useCountdown(useCountdownSeconds);

const redirectMessage = computed(
  () =>
    `You will be redirected in ${remaining.value} second${remaining.value > 1 ? 's' : ''}`,
);

const { getUrlByShortId } = urlsStore;

async function handleGetUrlByShortId(shortId: string) {
  return getUrlByShortId(shortId);
}

watch(remaining, async (newValue) => {
  if (newValue === 0) {
    const { shortId } = params;
    const url = await handleGetUrlByShortId(shortId as string);
    return navigateTo(url.originalUrl, { external: true });
  }
});

startCountDown();
</script>

<template>
  <div
    v-auto-animate
    class="flex flex-col items-center justify-center h-screen"
  >
    <Loader2 v-if="loadingGetUrlByShortId" class="animate-spin" />
    <span v-else>{{ redirectMessage }}</span>
  </div>
</template>
