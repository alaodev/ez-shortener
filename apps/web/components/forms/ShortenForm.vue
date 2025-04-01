<script setup lang="ts">
import * as zod from 'zod';
import ShortenInput from '../inputs/ShortenInput.vue';

export type SubmitFormDataType = zod.infer<typeof shortenSchemaValidator>;
export type Props = {
  shortenedUrl?: string;
  loading?: boolean;
};

const props = defineProps<Props>();
const emits = defineEmits<{
  (event: 'submit:form', data: SubmitFormDataType): void;
  (event: 'reset:form'): void;
}>();

const originalUrl = ref('');

const shortenSchemaValidator = zod.object({
  originalUrl: zod.string().url().nonempty(),
});

const formTitle = computed(() => {
  if (props.loading) return 'Shortening...';
  if (!props.shortenedUrl) return 'Which link to shorten?';
  return 'Link successfully shortened!';
});

function handleResetInput() {
  originalUrl.value = '';
  emits('reset:form');
}

function handleSubmitForm() {
  const { error } = shortenSchemaValidator.safeParse({
    originalUrl: originalUrl.value,
  });
  if (error) return;
  emits('submit:form', { originalUrl: originalUrl.value });
}
</script>

<template>
  <form
    class="flex flex-col gap-4 items-center w-full"
    @submit.prevent="handleSubmitForm"
  >
    <h1 class="font-medium text-2xl">{{ formTitle }}</h1>
    <ShortenInput
      v-model="originalUrl"
      :shortened-url="props.shortenedUrl"
      :loading="props.loading"
      @reset:input="handleResetInput"
    />
  </form>
</template>
