<script setup lang="ts">
import Item from '@/components/setting/Item.vue';

defineProps<{
  title: string;
  icon?: string;
  description?: string;
}>();

const model = defineModel<number>();
</script>

<template>
  <Item
    :title="title"
    :description="description"
    :icon="icon"
  >
    <UInputNumber
      v-model="model"
      :max="900"
      :min="1"
      class="max-w-32"
      color="neutral"
    />
  </Item>
</template>
