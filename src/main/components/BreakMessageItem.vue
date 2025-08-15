<script setup lang="ts">
const model = defineModel<string>();

const emit = defineEmits<{
  (e: 'delete'): void;
}>();
</script>

<template>
  <div class="flex items-center space-x-4">
    <UInput
      v-model="model"
      class="grow"
      color="neutral"
    />

    <UButton
      class="rounded-full"
      variant="subtle"
      color="error"
      icon="lucide:trash-2"
      @click="emit('delete')"
    />
  </div>
</template>
