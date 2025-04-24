<script setup lang="ts">
import {
  breakpointsTailwind,
  useBreakpoints,
  useWindowSize,
} from '@vueuse/core';
import AccessTable, {
  type AccessData,
} from '@/components/tables/AccessTable.vue';

definePageMeta({
  auth: true,
  name: 'dashboard',
  path: '/dashboard',
});

const accessStore = useAccessStore();
const breakpoints = useBreakpoints(breakpointsTailwind);

const tableHeight = ref();
const { loadingAccess, access } = storeToRefs(accessStore);
const { height: windowHeight } = useWindowSize();

const accessTableData: ComputedRef<AccessData[]> = computed(() =>
  access.value.map((item) => ({
    originalUrl: item.url.originalUrl,
    address: item.address,
    browserName: item.browserName,
    browserVersion: item.browserVersion,
    osName: item.osName,
    osVersion: item.osVersion,
    createdAt: new Date(item.createdAt),
  })),
);

const { getAccess, getAccessWs, wsDisconnect } = accessStore;

async function handleGetAccess() {
  await useAsyncData('access', async () => {
    return getAccess();
  });
}

function calculateTableHeight() {
  if (breakpoints['md'].value)
    return (tableHeight.value = windowHeight.value - 310);
  return (tableHeight.value = windowHeight.value - 330);
}

onMounted(() => {
  getAccessWs();
  calculateTableHeight();
  watch([windowHeight, breakpoints.current()], () => {
    calculateTableHeight();
  });
});

onBeforeUnmount(() => wsDisconnect());

handleGetAccess();
</script>

<template>
  <div class="container mx-auto">
    <AccessTable
      v-if="tableHeight"
      :data="accessTableData"
      :height="tableHeight"
      :loading="loadingAccess"
    />
  </div>
</template>
