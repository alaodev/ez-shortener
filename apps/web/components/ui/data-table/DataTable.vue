<script setup lang="ts" generic="TData, TValue">
import { Loader2 } from 'lucide-vue-next';
import { valueUpdater } from '~/lib/utils';
import { breakpointsTailwind, useBreakpoints } from '@vueuse/core';
import {
  FlexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
  useVueTable,
} from '@tanstack/vue-table';
import DataTableFilters, { type DataTableFilter } from './DataTableFilters.vue';
import type { ColumnDef, ColumnFiltersState } from '@tanstack/vue-table';

const props = defineProps<{
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  filters?: DataTableFilter[];
  title?: string;
  description?: string;
  height?: number;
  loading?: boolean;
}>();

const breakpoints = useBreakpoints(breakpointsTailwind);

const openFiltersModal = ref(false);
const columnFilters = ref<ColumnFiltersState>([]);

const table = useVueTable({
  get data() {
    return props.data;
  },
  get columns() {
    return props.columns;
  },
  getCoreRowModel: getCoreRowModel(),
  getPaginationRowModel: getPaginationRowModel(),
  onColumnFiltersChange: (updaterOrValue) =>
    valueUpdater(updaterOrValue, columnFilters),
  getFilteredRowModel: getFilteredRowModel(),
  state: {
    get columnFilters() {
      return columnFilters.value;
    },
  },
});

const contentHeight = computed(() => `${props.height}px`);

watch(breakpoints.md, (newValue) => {
  if (newValue) openFiltersModal.value = false;
});

table.setPageSize(20);
</script>

<template>
  <Card>
    <CardHeader v-if="title || description">
      <CardTitle v-if="title">{{ title }}</CardTitle>
      <CardDescription v-if="description">
        {{ description }}
      </CardDescription>
    </CardHeader>
    <CardContent v-auto-animate>
      <div class="mb-4">
        <DataTableFilters class="hidden md:grid" :filters :table />
        <Drawer v-model:open="openFiltersModal">
          <DrawerTrigger as-child>
            <Button class="w-full md:hidden" variant="outline">
              Filters
            </Button>
          </DrawerTrigger>
          <DrawerContent>
            <div class="mx-auto w-full max-w-md">
              <DrawerHeader>
                <DrawerTitle>Filters</DrawerTitle>
                <DrawerDescription>
                  Define your table filters below.
                </DrawerDescription>
              </DrawerHeader>
              <div class="px-4 pb-10">
                <DataTableFilters :filters :table />
              </div>
            </div>
          </DrawerContent>
        </Drawer>
      </div>
      <ScrollArea
        v-if="!loading"
        class="grid"
        :style="{ height: contentHeight }"
      >
        <Table>
          <TableHeader>
            <TableRow
              v-for="headerGroup in table.getHeaderGroups()"
              :key="headerGroup.id"
            >
              <TableHead v-for="header in headerGroup.headers" :key="header.id">
                <FlexRender
                  v-if="!header.isPlaceholder"
                  :render="header.column.columnDef.header"
                  :props="header.getContext()"
                />
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <template v-if="table.getRowModel().rows?.length">
              <TableRow
                v-for="row in table.getRowModel().rows"
                :key="row.id"
                :data-state="row.getIsSelected() ? 'selected' : undefined"
              >
                <TableCell v-for="cell in row.getVisibleCells()" :key="cell.id">
                  <FlexRender
                    :render="cell.column.columnDef.cell"
                    :props="cell.getContext()"
                  />
                </TableCell>
              </TableRow>
            </template>
            <template v-else>
              <TableRow>
                <TableCell :colspan="columns.length" class="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            </template>
          </TableBody>
        </Table>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
      <div
        v-else
        class="flex items-center justify-center"
        :style="{ height: contentHeight }"
      >
        <Loader2 class="animate-spin" />
      </div>
    </CardContent>
    <CardFooter>
      <DataTablePagination :table />
    </CardFooter>
  </Card>
</template>
