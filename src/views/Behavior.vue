<script setup lang="ts">
import Item from '@/components/setting/Item.vue';
import { useT } from '@/composables/t';
import { useSettingStore } from '@/stores/setting';
import { storeToRefs } from 'pinia';

const t = useT();

const { settings } = storeToRefs(useSettingStore());
</script>

<template>
  <div class="flex flex-col space-y-5 p-4 text-sm">
    <Item
      :title="t('strictBreak')"
      :description="t('strictBreakInfo')"
      icon="lucide:lock"
    >
      <UCheckbox
        v-model="settings.strictBreak"
        size="xl"
      />
    </Item>
  </div>
</template>
