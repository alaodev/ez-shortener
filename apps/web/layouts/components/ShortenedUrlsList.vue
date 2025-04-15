<script setup lang="ts">
import ShortenedUrlsActions from './ShortenedUrlsActions.vue';

const runtimeConfig = useRuntimeConfig();
const urlsStore = useUrlsStore();

const { loadingGetUrls, urls } = storeToRefs(urlsStore);
const { domainUrl } = runtimeConfig.public;

const shortenedUrls = computed(() =>
  urls.value.map((url) => ({
    id: url.id,
    originalUrl: url.originalUrl,
    shortenedUrl: `${domainUrl}${url.shortId}`,
  })),
);
</script>

<template>
  <SidebarGroup>
    <SidebarGroupContent>
      <SidebarMenu v-auto-animate="{ duration: 1000 }">
        <template v-if="!loadingGetUrls">
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
            <ShortenedUrlsActions
              :shortened-url-id="shortenedUrl.id"
              :shortened-url="shortenedUrl.shortenedUrl"
            />
          </SidebarMenuItem>
        </template>
        <template v-else>
          <div class="flex flex-col gap-2">
            <Skeleton
              v-for="item in 5"
              :key="item"
              class="h-7 rounded-md w-full"
            />
          </div>
        </template>
      </SidebarMenu>
    </SidebarGroupContent>
  </SidebarGroup>
</template>
