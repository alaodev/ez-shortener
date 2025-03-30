<script setup lang="ts">
import ShortenedUrlsActions from './ShortenedUrlsActions.vue';

const runtimeConfig = useRuntimeConfig();
const urlsStore = useUrlsStore();

const { urls } = storeToRefs(urlsStore);
const { domainUrl } = runtimeConfig.public;

const shortenedUrls = computed(() =>
  urls.value.map((url) => ({
    id: url.id,
    originalUrl: url.originalUrl,
    shortenedUrl: `${domainUrl}/${url.shortId}`,
  })),
);
</script>

<template>
  <SidebarGroup>
    <SidebarGroupContent>
      <SidebarMenu v-auto-animate="{ duration: 1000 }">
        <SidebarMenuItem
          v-for="shortenedUrl of shortenedUrls"
          :key="shortenedUrl.id"
        >
          <SidebarMenuButton as-child>
            <NuxtLink>
              <span class="overflow-hidden text-ellipsis whitespace-nowrap">
                {{ shortenedUrl.originalUrl }}
              </span>
            </NuxtLink>
          </SidebarMenuButton>
          <ShortenedUrlsActions :shortened-url-id="shortenedUrl.id" />
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarGroupContent>
  </SidebarGroup>
</template>
