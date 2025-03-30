<script setup lang="ts">
import type { AlertDialogProps } from 'reka-ui';
import { useToast } from '@/components/ui/toast';

export type Props = AlertDialogProps & {
  shortenedUrlId: string;
};

const props = defineProps<Props>();
const emits = defineEmits<{
  (event: 'close:modal'): void;
}>();

const urlsStore = useUrlsStore();

const { loadingDeleteUrl } = storeToRefs(urlsStore);

const { deleteUrl } = urlsStore;
const { toast } = useToast();

async function handleDeleteUrl(id: string) {
  await deleteUrl(id);
  toast({ title: 'Good News', description: 'Link deleted successfully!' });
}

function handleCancel() {
  emits('close:modal');
}
</script>

<template>
  <AlertDialog v-bind="props">
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
        <AlertDialogDescription>
          This action cannot be undone. This will permanently delete your
          shortened link.
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <Button
          variant="outline"
          :disabled="loadingDeleteUrl"
          @click="handleCancel()"
        >
          Cancel
        </Button>
        <Button
          variant="destructive"
          :disabled="loadingDeleteUrl"
          @click="handleDeleteUrl(shortenedUrlId)"
        >
          Delete
        </Button>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
</template>
