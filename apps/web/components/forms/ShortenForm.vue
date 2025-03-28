<script setup lang="ts">
import * as zod from 'zod';
import { toTypedSchema } from '@vee-validate/zod';
import { useClipboard } from '@vueuse/core';
import { useToast } from '@/components/ui/toast';
import { useForm } from 'vee-validate';
import { ArrowRight, Clipboard, Loader2, RefreshCcw } from 'lucide-vue-next';

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

const shortenSchemaValidator = zod.object({
  originalUrl: zod.string().url().nonempty(),
});

const formSchema = toTypedSchema(shortenSchemaValidator);

const { handleSubmit, resetForm, values } = useForm({
  validationSchema: formSchema,
  initialValues: {
    originalUrl: '',
  },
});
const { copy } = useClipboard();
const { toast } = useToast();

const formTitle = computed(() => {
  if (props.loading) return 'Shortening...';
  if (!props.shortenedUrl) return 'Which link to shorten?';
  return 'Link successfully shortened!';
});
const shrinkStyle = computed(() =>
  props.loading ? 'w-[3.5rem] justify-end pr-2.5' : 'w-full pl-5 pr-2 py-2',
);

const onSubmit = handleSubmit((values) => emits('submit:form', values));

async function handleCopyToClipboard() {
  if (!props.shortenedUrl) return;
  await copy(props.shortenedUrl);
  toast({
    title: 'Good news',
    description: 'Shortened link copied to clipboard',
  });
}

function handleReset() {
  resetForm();
  emits('reset:form');
}
</script>

<template>
  <form class="flex flex-col gap-4 items-center w-full" @submit="onSubmit">
    <h1 class="font-medium text-2xl">{{ formTitle }}</h1>
    <div
      class="flex items-center gap-4 rounded-full duration-300 shadow-lg dark:bg-secondary h-[3.5rem]"
      :class="shrinkStyle"
    >
      <div v-if="!loading" class="flex-1 min-w-0">
        <FormField
          v-if="!shortenedUrl"
          v-slot="{ componentField }"
          name="originalUrl"
        >
          <FormItem>
            <FormControl>
              <input
                id="originalUrl"
                v-bind="componentField"
                class="bg-transparent outline-none w-full"
                type="url"
                placeholder="Type your link..."
                autocomplete="off"
              />
            </FormControl>
          </FormItem>
        </FormField>
        <span
          v-else
          class="block overflow-hidden text-ellipsis whitespace-nowrap"
        >
          {{ shortenedUrl }}
        </span>
      </div>
      <Button
        v-if="shortenedUrl && !loading"
        class="rounded-full"
        size="icon"
        variant="ghost"
        @click="handleReset"
      >
        <RefreshCcw />
      </Button>
      <Button
        v-if="loading"
        class="rounded-full flex-shrink-0"
        size="icon"
        variant="ghost"
      >
        <Loader2 class="animate-spin" />
      </Button>
      <Button
        v-if="!loading && !shortenedUrl"
        class="rounded-full flex-shrink-0"
        size="icon"
        :disabled="!values.originalUrl"
      >
        <ArrowRight />
      </Button>
      <Button
        v-if="!loading && shortenedUrl"
        class="rounded-full flex-shrink-0"
        size="icon"
        :disabled="!shortenedUrl"
        @click="handleCopyToClipboard"
      >
        <Clipboard />
      </Button>
    </div>
  </form>
</template>
