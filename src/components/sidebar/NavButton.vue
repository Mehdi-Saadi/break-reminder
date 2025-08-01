<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';

const props = defineProps<{
  to: { name: string };
  icon: string;
  title: string;
  ui?: {
    icon?: string;
  };
}>();

const route = useRoute();

const isActive = computed(() => route.name === props.to.name);

const activeClasses = 'bg-[#eaeaea] dark:bg-[#2d2d2d] hover:bg-[#ededed] dark:hover:bg-[#292929]';
const notActiveClasses = 'hover:bg-[#eaeaea] dark:hover:bg-[#2d2d2d]';
</script>

<template>
  <RouterLink
    :class="isActive ? activeClasses : notActiveClasses"
    :to
    class="flex items-center pe-4 py-2 rounded-md text-sm w-full"
  >
    <!-- active icon -->
    <span
      :class="isActive ? 'opacity-100' : 'opacity-0'"
      class="min-w-0.5 min-h-4 max-w-0.5 max-h-4 bg-[#0067c0] rounded-full"
    />

    <span class="flex items-center ps-1">
      <UIcon
        :name="icon"
        :class="ui?.icon"
      />

      <span class="pb-0.5">
        {{ title }}
      </span>
    </span>
  </RouterLink>
</template>
