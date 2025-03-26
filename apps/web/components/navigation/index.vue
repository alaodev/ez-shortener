<template>
  <SidebarProvider>
    <Sidebar class="border-none">
      <SidebarHeader>
        <slot name="sidebar-header" />
      </SidebarHeader>
      <SidebarContent>
        <slot name="sidebar-content" />
      </SidebarContent>
    </Sidebar>
    <SidebarInset>
      <header
        class="flex items-center bg-background sticky top-0 px-3 h-[4rem]"
      >
        <SidebarTrigger class="mr-auto" />
        <div class="flex gap-2">
          <slot name="actions" />
        </div>
      </header>
      <main class="p-5" style="height: calc(100vh - 4rem)">
        <slot name="main" />
      </main>
    </SidebarInset>
  </SidebarProvider>
</template>
