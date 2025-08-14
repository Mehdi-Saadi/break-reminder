<script setup lang="ts">
import Sidebar from '@/main/components/layout/Sidebar.vue';
import { useAutostart } from '@/main/composables/autostart';
import { useBrowser } from '@/main/composables/browser';
import { useDarkMode } from '@/main/composables/darkMode';
import { useLanguage } from '@/main/composables/language';
import { useTimer } from '@/main/composables/timer';
import { useTray } from '@/main/composables/tray';
import { useUpdater } from '@/main/composables/updater';
import { useWindow } from '@/main/composables/window';

useDarkMode().setBasedOnStore();
useLanguage().setBasedOnStore();
useAutostart().setBasedOnStore();
useBrowser().disableContextmenuInProd();
useUpdater().checkForUpdatesOnOnline();
useWindow().hideOnClose();
useTray().getOrCreate();
useTimer();
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
