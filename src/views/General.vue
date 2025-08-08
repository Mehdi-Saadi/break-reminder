<script setup lang="ts">
import Item from '@/components/setting/Item.vue';
import { useT } from '@/composables/t';
import { useSettingStore } from '@/stores/setting';
import { Settings } from '@/types/setting';
import { useColorMode } from '@vueuse/core';
import { watchEffect } from 'vue';

const t = useT();

const settingStore = useSettingStore();

interface LanguageOption {
  label: string;
  value: Settings['language'];
}

const languageOptions: LanguageOption[] = [
  {
    label: 'English',
    value: 'en',
  },
  {
    label: 'فارسی',
    value: 'fa',
  },
];

const mode = useColorMode();

watchEffect(() => {
  mode.value = settingStore.settings.darkMode
    ? 'dark'
    : 'light';
});
</script>

<template>
  <div class="flex flex-col space-y-5 p-4 text-sm">
    <!-- language -->
    <Item
      :title="t('language')"
      icon="lucide:languages"
    >
      <USelect
        v-model="settingStore.settings.language"
        :items="languageOptions"
        class="min-w-20"
      />
    </Item>

    <!-- dark mode -->
    <Item
      :title="t('darkMode')"
      icon="lucide:moon"
    >
      <UCheckbox
        v-model="settingStore.settings.darkMode"
        size="xl"
      />
    </Item>

    <!-- run on startup -->
    <Item
      :title="t('runOnStartup')"
      icon="lucide:arrow-up-from-line"
    >
      <UCheckbox
        v-model="settingStore.settings.autostart"
        size="xl"
      />
    </Item>
  </div>
</template>
