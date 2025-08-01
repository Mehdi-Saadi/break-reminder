<template>
  <NavButton
    :to="{ name: 'general' }"
    :title="t('general')"
    :ui="{ icon: 'size-5 me-1.5' }"
    icon="ic:baseline-settings"
  />
</template>

<script setup lang="ts">
import NavButton from '@/components/sidebar/NavButton.vue';
import { useT } from '@/composables/t';

const t = useT();
</script>
