<script setup lang="ts">
defineProps<{
  title: string
  description?: string
  icon?: string
}>()
</script>

<template>
  <div class="flex items-center">
    <!-- label -->
    <div class="grow pe-4 pb-0.5 flex items-center space-x-1">
      <UIcon
        v-if="icon"
        :name="icon"
        class="size-5"
      />

      <div class="flex flex-col">
        <div class="font-semibold">
          {{ title }}
        </div>
        <div class="text-xs text-default/75">
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
