<script setup lang="ts">
defineProps<{
  label: string;
}>();
</script>

<template>
  <div class="relative pt-2">
    <div class="border border-gray-300 rounded-md p-4 text-sm">
      <!-- label -->
      <span class="absolute top-0 start-2 text-xs font-semibold bg-[#f3f3f3] dark:bg-[#202020] px-1">
        {{ label }}
      </span>

      <div class="flex flex-col space-y-3">
        <slot />
      </div>
    </div>
  </div>
</template>
