<script setup lang="ts">
import Sidebar from '@/components/layout/Sidebar.vue';
import { useBrowser } from '@/composables/browser.ts';
import { useDarkMode } from '@/composables/darkMode.ts';
import { useSetting } from '@/composables/setting.ts';
import { useUpdater } from '@/composables/updater.ts';
import { useWindow } from '@/composables/window.ts';

useDarkMode().setBasedOnStore();
useSetting().initWatchers();
useBrowser().disableContextmenuInProd();
useUpdater().checkForUpdatesOnOnline();
useWindow().hideOnClose();
</script>

<template>
  <div class="size-full min-h-screen grid grid-cols-3 select-none">
    <div class="col-span-1">
      <Sidebar />
    </div>

    <div class="col-span-2 py-6 ps-3 pe-7">
      <RouterView />
    </div>
  </div>
</template>
