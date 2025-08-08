<script setup lang="ts">
import Item from '@/components/setting/Item.vue';

defineProps<{
  title: string;
  description?: string;
  icon?: string;
}>();

const model = defineModel<boolean>();
</script>

<template>
  <Item
    :title="title"
    :description="description"
    :icon="icon"
  >
    <UCheckbox
      v-model="model"
      color="neutral"
      size="xl"
    />
  </Item>
</template>
