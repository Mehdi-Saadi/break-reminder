<template>
  <NavButton
    :to="{ name: 'behavior' }"
    :title="t('behavior')"
    icon="lucide:brain"
  />
</template>

<script setup lang="ts">
import NavButton from '@/components/sidebar/NavButton.vue';
import { useT } from '@/composables/t';

const t = useT();
</script>
