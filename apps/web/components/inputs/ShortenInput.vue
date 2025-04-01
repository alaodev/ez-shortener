<script setup lang="ts">
import { ArrowRight, Clipboard, Loader2, RefreshCcw } from 'lucide-vue-next';
import { useClipboard, useVModel } from '@vueuse/core';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/toast';

export type Props = {
  modelValue?: string;
  shortenedUrl?: string;
  loading?: boolean;
  resettable?: boolean;
};

const props = defineProps<Props>();
const emits = defineEmits<{
  (event: 'reset:input' | 'submit:input'): void;
  (event: 'update:modelValue'): string;
}>();

const { copy } = useClipboard();
const { toast } = useToast();

const value = useVModel(props, 'modelValue', emits);

const shrinkStyle = computed(() =>
  props.loading ? 'w-[3.5rem] justify-end pr-2.5' : 'w-full pl-5 pr-2 py-2',
);

async function handleCopyToClipboard() {
  if (!props.shortenedUrl) return;
  await copy(props.shortenedUrl);
  toast({
    title: 'Good news',
    description: 'Shortened link copied to clipboard',
  });
}
</script>

<template>
  <div
    class="flex items-center gap-4 rounded-full duration-300 shadow-lg dark:bg-secondary h-[3.5rem]"
    :class="shrinkStyle"
  >
    <div v-if="!props.loading" class="flex-1 min-w-0">
      <span
        v-if="props.shortenedUrl"
        class="block overflow-hidden text-ellipsis whitespace-nowrap"
      >
        {{ props.shortenedUrl }}
      </span>
      <input
        v-else
        id="originalUrl"
        v-model="value"
        class="bg-transparent outline-none w-full"
        type="url"
        placeholder="Type your link..."
        autocomplete="off"
        @keyup.enter="emits('submit:input')"
      />
    </div>
    <Button
      v-if="props.resettable && props.shortenedUrl && !props.loading"
      class="rounded-full"
      size="icon"
      variant="ghost"
      @click="emits('reset:input')"
    >
      <RefreshCcw />
    </Button>
    <Button
      v-if="props.loading"
      class="rounded-full flex-shrink-0"
      size="icon"
      variant="ghost"
    >
      <Loader2 class="animate-spin" />
    </Button>
    <Button
      v-if="!props.loading && !props.shortenedUrl"
      class="rounded-full flex-shrink-0"
      size="icon"
      :disabled="!value"
      @click="emits('submit:input')"
    >
      <ArrowRight />
    </Button>
    <Button
      v-if="!props.loading && props.shortenedUrl"
      class="rounded-full flex-shrink-0"
      size="icon"
      :disabled="!props.shortenedUrl"
      @click.prevent="handleCopyToClipboard"
    >
      <Clipboard />
    </Button>
  </div>
</template>
