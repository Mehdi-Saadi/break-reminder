<script setup lang="ts">
import CheckboxItem from '@/components/setting/CheckboxItem.vue';
import { useT } from '@/composables/t';
import { useSettingStore } from '@/stores/setting';

const t = useT();

const settingStore = useSettingStore();
</script>

<template>
  <div class="flex flex-col space-y-5 p-4 text-sm">
    <!-- notification -->
    <CheckboxItem
      v-model="settingStore.settings.notification"
      :title="t('notification')"
      :description="t('notificationInfo')"
      icon="lucide:bell"
    />

    <!-- audible alert -->
    <CheckboxItem
      v-model="settingStore.settings.audibleAlert"
      :title="t('audibleAlert')"
      :description="t('audibleAlertInfo')"
      icon="lucide:music-2"
    />
  </div>
</template>
