<script setup lang="ts">
import ShortenForm, {
  type SubmitFormDataType,
} from '@/components/forms/ShortenForm.vue';

definePageMeta({
  auth: true,
  name: 'shorten',
  path: '/shorten',
});

const urlsStore = useUrlsStore();

const { loadingShortenUrl: loading, shortenedUrl } = storeToRefs(urlsStore);

const { shortenUrl, resetStore } = urlsStore;

async function handleShortenUrl(data: SubmitFormDataType) {
  const { originalUrl } = data;
  const { domainUrl } = useRuntimeConfig().public;
  const createdUrl = await shortenUrl(originalUrl);
  shortenedUrl.value = `${domainUrl}${createdUrl.shortId}`;
}
</script>

<template>
  <div class="flex flex-col items-center justify-center h-full">
    <div class="max-w-xl w-10/12">
      <ShortenForm
        :shortened-url
        :loading
        @submit:form="handleShortenUrl"
        @reset:form="resetStore"
      />
    </div>
  </div>
</template>
