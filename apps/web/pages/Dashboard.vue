<script setup lang="ts">
import AccessTable, {
  type AccessData,
} from '@/components/tables/AccessTable.vue';

definePageMeta({
  auth: true,
  name: 'dashboard',
  path: '/dashboard',
});

const accessStore = useAccessStore();

const { loadingAccess, access } = storeToRefs(accessStore);

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

const { getAccess } = accessStore;

async function handleGetAccess() {
  await useAsyncData('access', async () => {
    return getAccess();
  });
}

handleGetAccess();
</script>

<template>
  <div class="flex">
    <div class="container mx-auto">
      <AccessTable v-if="!loadingAccess" :data="accessTableData" />
    </div>
  </div>
</template>
