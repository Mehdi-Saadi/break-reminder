<script setup lang="ts">
import SettingItemWithIcon from '@/components/SettingItemWithIcon.vue';
import { useT } from '@/composables/t';

const t = useT();
</script>

<template>
  <div class="flex flex-col space-y-5 p-4 text-sm">
    <SettingItemWithIcon
      :title="t('language')"
      icon="lucide:languages"
    >
      test
    </SettingItemWithIcon>
  </div>
</template>
