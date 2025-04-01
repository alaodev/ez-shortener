<script setup lang="ts">
import type { AlertDialogProps } from 'reka-ui';
import ShortenInput from '@/components/inputs/ShortenInput.vue';

export type Props = AlertDialogProps & {
  shortenedUrl: string;
};

const props = defineProps<Props>();
const emits = defineEmits<{
  (event: 'close:modal'): void;
}>();

function handleCancel() {
  emits('close:modal');
}
</script>

<template>
  <AlertDialog v-bind="props">
    <AlertDialogContent @interact-outside="handleCancel">
      <AlertDialogHeader>
        <AlertDialogTitle>Share your shortened link</AlertDialogTitle>
        <AlertDialogDescription>
          Click the button to copy your link to the clipboard.
        </AlertDialogDescription>
      </AlertDialogHeader>
      <ShortenInput :shortened-url />
    </AlertDialogContent>
  </AlertDialog>
</template>
