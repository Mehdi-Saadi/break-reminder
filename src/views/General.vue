<script setup lang="ts">
import CheckboxItem from '@/components/setting/CheckboxItem.vue';
import Item from '@/components/setting/Item.vue';
import { useT } from '@/composables/t';
import { directions } from '@/i18n';
import { useSettingStore } from '@/stores/setting';
import { Settings } from '@/types/setting';
import { useColorMode } from '@vueuse/core';
import { watchEffect } from 'vue';
import { useI18n } from 'vue-i18n';

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

const { locale } = useI18n();

watchEffect(() => {
  const { language } = settingStore.settings;

  locale.value = language;

  document.documentElement.dir = directions[language];
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
        color="neutral"
        class="min-w-20"
      />
    </Item>

    <!-- dark mode -->
    <CheckboxItem
      v-model="settingStore.settings.darkMode"
      :title="t('darkMode')"
      icon="lucide:moon"
    />

    <!-- run on startup -->
    <CheckboxItem
      v-model="settingStore.settings.autostart"
      :title="t('runOnStartup')"
      icon="lucide:arrow-up-from-line"
    />
  </div>
</template>
