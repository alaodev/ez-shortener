<script setup lang="ts">
import { MoreHorizontal, Share, Trash2 } from 'lucide-vue-next';
import ShortenedUrlsShareModal from './ShortenedUrlsShareModal.vue';
import ShortenedUrlsDeleteModal from './ShortenedUrlsDeleteModal.vue';

export type Props = {
  shortenedUrlId: string;
  shortenedUrl: string;
};

defineProps<Props>();

const modalStatusHandler = {
  delete: (status: boolean) => (openDeleteModal.value = status),
  share: (status: boolean) => (openShareModal.value = status),
};

const openDeleteModal = ref(false);
const openShareModal = ref(false);

function handleModalStatus(type: 'delete' | 'share', status: boolean) {
  modalStatusHandler[type](status);
}
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <SidebarMenuAction>
        <MoreHorizontal />
      </SidebarMenuAction>
    </DropdownMenuTrigger>
    <DropdownMenuContent side="right" align="start">
      <DropdownMenuItem @click="handleModalStatus('share', true)">
        <Share />
        <span>Compartilhar</span>
      </DropdownMenuItem>
      <DropdownMenuItem
        class="text-destructive"
        @click="handleModalStatus('delete', true)"
      >
        <Trash2 />
        <span>Delete</span>
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
  <ShortenedUrlsShareModal
    :open="openShareModal"
    :shortened-url
    @close:modal="handleModalStatus('share', false)"
  />
  <ShortenedUrlsDeleteModal
    :open="openDeleteModal"
    :shortened-url-id
    @close:modal="handleModalStatus('delete', false)"
  />
</template>
