<script setup lang="ts">
import Item from '@/components/setting/Item.vue';
import { useT } from '@/composables/t';
import { useSettingStore } from '@/stores/setting';

const t = useT();

const settingStore = useSettingStore();
</script>

<template>
  <div class="flex flex-col space-y-5 p-4 text-sm">
    <!-- strick break -->
    <Item
      :title="t('strictBreak')"
      :description="t('strictBreakInfo')"
      icon="lucide:lock"
    >
      <UCheckbox
        v-model="settingStore.settings.strictBreak"
        size="xl"
      />
    </Item>

    <!-- do not disturb -->
    <Item
      :title="t('doNotDisturb')"
      :description="t('doNotDisturbInfo')"
      icon="lucide:octagon-x"
    >
      <UCheckbox
        v-model="settingStore.settings.doNotDisturb"
        size="xl"
      />
    </Item>

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
      />
    </Item>
  </div>
</template>
