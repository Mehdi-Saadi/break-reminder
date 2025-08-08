<script setup lang="ts">
import Item from '@/components/setting/Item.vue';
import { useT } from '@/composables/t';
import { useSettingStore } from '@/stores/setting';

const t = useT();

const settingStore = useSettingStore();
</script>

<template>
  <div class="flex flex-col space-y-5 p-4 text-sm">
    <!-- notification -->
    <Item
      :title="t('notification')"
      :description="t('notificationInfo')"
      icon="lucide:bell"
    >
      <UCheckbox
        v-model="settingStore.settings.notification"
        size="xl"
      />
    </Item>

    <!-- audible alert -->
    <Item
      :title="t('audibleAlert')"
      :description="t('audibleAlertInfo')"
      icon="lucide:music-2"
    >
      <UCheckbox
        v-model="settingStore.settings.audibleAlert"
        size="xl"
      />
    </Item>
  </div>
</template>
