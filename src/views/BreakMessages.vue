<script setup lang="ts">
import BreakMessageItem from '@/components/BreakMessageItem.vue';
import SectionBorder from '@/components/setting/SectionBorder.vue';
import { useT } from '@/composables/t';
import { useSettingStore } from '@/stores/setting';
import { computed } from 'vue';

const t = useT();

const settingStore = useSettingStore();

const shortBreakMessages = computed({
  get() {
    return settingStore.settings.shortBreakMessages;
  },
  set(newValue) {
    settingStore.settings.shortBreakMessages = newValue;
  },
});

const longBreakMessages = computed({
  get() {
    return settingStore.settings.longBreakMessages;
  },
  set(newValue) {
    settingStore.settings.longBreakMessages = newValue;
  },
});
</script>

<template>
  <div class="flex flex-col space-y-4">
    <SectionBorder :label="t('shortBreaks')">
      <BreakMessageItem
        v-for="(_, key) in shortBreakMessages"
        :key="key"
        v-model="shortBreakMessages[key]"
        @delete="delete shortBreakMessages[key]"
      />
    </SectionBorder>

    <SectionBorder :label="t('longBreaks')">
      <BreakMessageItem
        v-for="(_, key) in longBreakMessages"
        :key="key"
        v-model="longBreakMessages[key]"
        @delete="delete longBreakMessages[key]"
      />
    </SectionBorder>
  </div>
</template>
