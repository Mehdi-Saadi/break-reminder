<script setup lang="ts">
import Sidebar from '@/layouts/Sidebar.vue';
import { useSettingStore } from '@/stores/setting';
import { computed } from 'vue';

const settingStore = useSettingStore();

const darkMode = computed(() => settingStore.settings.darkMode);
</script>

<template>
  <div
    :class="{ dark: darkMode }"
    class="size-full min-h-screen grid grid-cols-3 select-none"
  >
    <div class="col-span-1">
      <Sidebar />
    </div>

    <div class="col-span-2 py-6 ps-3 pe-7">
      <RouterView />
    </div>
  </div>
</template>
