<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';

const props = defineProps<{
  button: {
    icon: string;
    label: string;
    to: {
      name: string;
    };
  };
}>();

const route = useRoute();

const isActive = computed(() => route.name === props.button.to.name);
</script>

<template>
  <UButton
    :icon="button.icon"
    :label="button.label"
    :to="button.to"
    :variant="isActive ? 'subtle' : 'ghost'"
    class="w-full"
    size="lg"
  />
</template>
