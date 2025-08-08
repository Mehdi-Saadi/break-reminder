<script setup lang="ts">
defineProps<{
  label: string;
}>();
</script>

<template>
  <div class="relative pt-2">
    <UCard :ui="{ body: 'sm:p-4 text-sm' }">
      <!-- label -->
      <span class="absolute top-0 start-2 text-xs font-semibold bg-default px-1">
        {{ label }}
      </span>

      <div class="flex flex-col space-y-3">
        <slot />
      </div>
    </UCard>
  </div>
</template>
