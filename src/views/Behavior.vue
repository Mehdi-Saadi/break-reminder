<script setup lang="ts">
import CheckboxItem from '@/components/setting/CheckboxItem.vue';
import Item from '@/components/setting/Item.vue';
import { useT } from '@/composables/t';
import { useSettingStore } from '@/stores/setting';

const t = useT();

const settingStore = useSettingStore();
</script>

<template>
  <div class="flex flex-col space-y-5 p-4 text-sm">
    <!-- strick break -->
    <CheckboxItem
      v-model="settingStore.settings.strictBreak"
      :title="t('strictBreak')"
      :description="t('strictBreakInfo')"
      icon="lucide:lock"
    />

    <!-- do not disturb -->
    <CheckboxItem
      v-model="settingStore.settings.doNotDisturb"
      :title="t('doNotDisturb')"
      :description="t('doNotDisturbInfo')"
      icon="lucide:octagon-x"
    />

    <!-- time to prepare for a break -->
    <Item
      :title="t('timeToPrepareForBreakInSeconds')"
      icon="lucide:hourglass"
    >
      <UInputNumber
        v-model="settingStore.settings.timeToPrepareForBreak"
        :max="900"
        :min="1"
        class="max-w-32"
        color="neutral"
      />
    </Item>
  </div>
</template>
