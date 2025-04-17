<script setup lang="ts">
import { Globe, EthernetPort, FormInput, LaptopMinimal } from 'lucide-vue-next';
import type { ColumnDef } from '@tanstack/vue-table';

export type AccessData = {
  originalUrl: string;
  address: string;
  browserName?: string;
  browserVersion?: string;
  osName?: string;
  osVersion?: string;
  createdAt: Date;
};

export type Props = {
  data: AccessData[];
  height?: number;
  loading?: boolean;
};

defineProps<Props>();

const columns: ColumnDef<AccessData>[] = [
  {
    accessorKey: 'originalUrl',
    header: () => h('div', 'Link'),
    cell: ({ row }) => {
      const value = row.getValue('originalUrl');
      return h(
        'div',
        {
          class:
            'overflow-hidden text-ellipsis whitespace-nowrap font-medium w-[200px]',
        },
        `${value}`,
      );
    },
  },
  {
    accessorKey: 'address',
    header: () => h('div', { class: 'text-center' }, 'Address'),
    cell: ({ row }) => {
      const value = row.getValue('address');
      return h('div', { class: 'text-center font-medium' }, `${value}`);
    },
  },
  {
    accessorKey: 'browserName',
    header: () => h('div', { class: 'text-center' }, 'Browser Name'),
    cell: ({ row }) => {
      const value = row.getValue('browserName');
      return h('div', { class: 'text-center font-medium' }, `${value}`);
    },
  },
  {
    accessorKey: 'browserVersion',
    header: () => h('div', { class: 'text-center' }, 'Browser Version'),
    cell: ({ row }) => {
      const value = row.getValue('browserVersion');
      return h('div', { class: 'text-center font-medium' }, `${value}`);
    },
  },
  {
    accessorKey: 'osName',
    header: () => h('div', { class: 'text-center' }, 'OS Name'),
    cell: ({ row }) => {
      const value = row.getValue('osName');
      return h('div', { class: 'text-center font-medium' }, `${value}`);
    },
  },
  {
    accessorKey: 'osVersion',
    header: () => h('div', { class: 'text-center' }, 'OS Version'),
    cell: ({ row }) => {
      const value = row.getValue('osVersion');
      return h('div', { class: 'text-center font-medium' }, `${value}`);
    },
  },
  {
    accessorKey: 'createdAt',
    header: () => h('div', { class: 'text-right' }, 'Access At'),
    cell: ({ row }) => {
      const value: Date = row.getValue('createdAt');
      return h(
        'div',
        { class: 'font-medium ml-auto text-end w-[170px]' },
        `${value.toLocaleDateString('en-US', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' })}`,
      );
    },
  },
];
</script>

<template>
  <DataTable
    title="Shortened Link Access Logs"
    description="This table displays user access records for shortened links, includin visit timestamps, user details, and access counts."
    :filters="[
      { key: 'originalUrl', placeholder: 'Link', colSpan: 3, icon: FormInput },
      {
        key: 'address',
        placeholder: 'Address',
        colSpan: 3,
        icon: EthernetPort,
      },
      {
        key: 'browserName',
        placeholder: 'Browser Name',
        colSpan: 3,
        icon: Globe,
      },
      {
        key: 'osName',
        placeholder: 'OS Name',
        colSpan: 3,
        icon: LaptopMinimal,
      },
    ]"
    :data
    :columns
    :height
    :loading
  />
</template>
