<script setup lang="ts">
defineProps<{
  title: string;
  icon: string;
  description?: string;
}>();
</script>

<template>
  <div class="flex items-center justify-between">
    <!-- label -->
    <div class="flex items-center space-x-1">
      <UIcon
        :name="icon"
      />

      <div>
        <div>
          {{ title }}
        </div>
        <div>
          {{ description }}
        </div>
      </div>
    </div>

    <div>
      <slot />
    </div>
  </div>
</template>
