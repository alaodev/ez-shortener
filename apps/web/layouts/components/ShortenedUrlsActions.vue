<script setup lang="ts">
import { MoreHorizontal, Trash2 } from 'lucide-vue-next';
import ShortenedUrlsDeleteModal from './ShortenedUrlsDeleteModal.vue';

export type Props = {
  shortenedUrlId: string;
};

defineProps<Props>();

const openDeleteModal = ref(false);

function handleDeleteModalStatus(status: boolean) {
  openDeleteModal.value = status;
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
      <DropdownMenuItem
        class="text-destructive"
        @click="handleDeleteModalStatus(true)"
      >
        <Trash2 />
        <span>Delete</span>
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
  <ShortenedUrlsDeleteModal
    :open="openDeleteModal"
    :shortened-url-id
    @close:modal="handleDeleteModalStatus(false)"
  />
</template>
