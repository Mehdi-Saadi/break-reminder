<script setup lang="ts">
import NavButton from '@/components/sidebar/NavButton.vue';
import { useT } from '@/composables/t';

const t = useT();
</script>

<template>
  <NavButton
    :to="{ name: 'general' }"
    :title="t('general')"
    icon="lucide:settings"
  />
</template>
