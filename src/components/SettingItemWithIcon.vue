<script setup lang="ts">
defineProps<{
  title: string;
  icon: string;
  description?: string;
}>();
</script>

<template>
  <div class="flex items-center">
    <!-- label -->
    <div class="grow pe-4 pb-0.5 flex items-center space-x-1">
      <UIcon
        :name="icon"
        class="size-5"
      />

      <div class="flex flex-col">
        <div class="font-semibold">
          {{ title }}
        </div>
        <div class="text-xs text-[#5c5c5c] dark:text-[#cccccc]">
          {{ description }}
        </div>
      </div>
    </div>

    <!-- setting content -->
    <div>
      <slot />
    </div>
  </div>
</template>
