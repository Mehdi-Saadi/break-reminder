<script setup lang="ts">
import SettingItemWithIcon from '@/components/SettingItemWithIcon.vue';
import { useT } from '@/composables/t';
import { useSettingStore } from '@/stores/setting';
import { Settings } from '@/types/setting';
import { storeToRefs } from 'pinia';

const t = useT();

const { settings } = storeToRefs(useSettingStore());

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
</script>

<template>
  <div class="flex flex-col space-y-5 p-4 text-sm">
    <!-- language -->
    <SettingItemWithIcon
      :title="t('language')"
      icon="lucide:languages"
    >
      <USelect
        v-model="settings.language"
        :items="languageOptions"
        class="min-w-20"
      />
    </SettingItemWithIcon>

    <!-- dark mode -->
    <SettingItemWithIcon
      :title="t('darkMode')"
      icon="lucide:moon"
    >
      <UCheckbox
        v-model="settings.darkMode"
        size="xl"
      />
    </SettingItemWithIcon>

    <!-- run on startup -->
    <SettingItemWithIcon
      :title="t('runOnStartup')"
      icon="lucide:arrow-up-from-line"
    >
      <UCheckbox
        v-model="settings.autostart"
        size="xl"
      />
    </SettingItemWithIcon>
  </div>
</template>
