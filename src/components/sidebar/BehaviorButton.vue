<template>
  <NavButton
    :to="{ name: 'behavior' }"
    :title="t('behavior')"
    :ui="{ icon: 'size-5 me-1.5' }"
    icon="lucide:brain"
  />
</template>

<script setup lang="ts">
import NavButton from '@/components/sidebar/NavButton.vue';
import { useT } from '@/composables/t';

const t = useT();
</script>
