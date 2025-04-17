<script setup lang="ts" generic="TData">
import type { Table } from '@tanstack/vue-table';

export type DataTableFilter = {
  key: string;
  colSpan: number;
  icon?: Component;
  placeholder?: string;
};

type DataTableFiltersProps = {
  table: Table<TData>;
  filters: DataTableFilter[] | undefined;
};

defineProps<DataTableFiltersProps>();
</script>

<template>
  <div v-if="filters" class="grid grid-cols-12 gap-6">
    <div
      v-for="filter of filters"
      :key="filter.key"
      :style="{ '--col-span': filter.colSpan }"
      class="relative items-center col-span-12 md:[grid-column:span_var(--col-span)_/_span_var(--col-span)]"
    >
      <Input
        :placeholder="filter.placeholder"
        :model-value="table.getColumn(filter.key)?.getFilterValue() as string"
        :class="filter.icon && 'pl-10'"
        @update:model-value="
          table.getColumn(filter.key)?.setFilterValue($event)
        "
      />
      <span
        class="absolute start-0 inset-y-0 flex items-center justify-center px-2"
      >
        <Component
          :is="filter.icon"
          :stroke-width="0.5"
          class="size-6 text-muted-foreground"
        />
      </span>
    </div>
  </div>
</template>
