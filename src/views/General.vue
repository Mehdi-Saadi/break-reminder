<script setup lang="ts">
import SettingItemWithIcon from '@/components/SettingItemWithIcon.vue';
import { useT } from '@/composables/t';
import { useSettingStore } from '@/stores/setting';
import { Settings } from '@/types/setting';
import { storeToRefs } from 'pinia';
import { ref } from 'vue';

const t = useT();

const { settings } = storeToRefs(useSettingStore());

interface LanguageOption {
  label: string;
  value: Settings['language'];
}

const languageOptions = ref<LanguageOption[]>([
  {
    label: 'English',
    value: 'en',
  },
  {
    label: 'فارسی',
    value: 'fa',
  },
]);
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
  </div>
</template>
