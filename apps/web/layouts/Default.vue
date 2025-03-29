<script setup lang="ts">
import LogoutButton from '@/components/utils/LogoutButton.vue';
import ThemeSwitcher from '@/components/utils/ThemeSwitcher.vue';
import SidebarToggleButton from '@/components/utils/SidebarToggleButton.vue';
import NavigateToButton from '@/components/utils/NavigateToButton.vue';
import ShortenedUrlsList from '@/layouts/components/ShortenedUrlsList.vue';

const route = useRoute();
const urlsStore = useUrlsStore();

const filteredNavs = computed(() =>
  navs.filter((nav) => nav.to !== route.path),
);

const { getUrls } = urlsStore;

async function handleGetUrls() {
  await useAsyncData('urls', async () => {
    return getUrls();
  });
}

handleGetUrls();
</script>

<template>
  <Navigation>
    <template #leading-actions>
      <SidebarToggleButton />
      <NavigateToButton
        v-for="nav of filteredNavs"
        :key="nav.to"
        :to="nav.to"
        :icon="nav.icon"
      />
    </template>
    <template #actions>
      <ThemeSwitcher />
      <LogoutButton />
    </template>
    <template #sidebar-content>
      <ShortenedUrlsList />
    </template>
    <template #main>
      <slot />
    </template>
  </Navigation>
</template>
