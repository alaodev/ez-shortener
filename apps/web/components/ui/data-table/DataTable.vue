<script setup lang="ts" generic="TData, TValue">
import { Loader2 } from 'lucide-vue-next';
import {
  FlexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useVueTable,
} from '@tanstack/vue-table';
import type { ColumnDef } from '@tanstack/vue-table';

const props = defineProps<{
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  title?: string;
  description?: string;
  height?: number;
  loading?: boolean;
}>();

const table = useVueTable({
  get data() {
    return props.data;
  },
  get columns() {
    return props.columns;
  },
  getCoreRowModel: getCoreRowModel(),
  getPaginationRowModel: getPaginationRowModel(),
});

const contentHeight = computed(() => `${props.height}px`);

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
