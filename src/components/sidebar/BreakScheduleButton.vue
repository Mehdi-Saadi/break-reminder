<script setup lang="ts">
import NavButton from '@/components/sidebar/NavButton.vue';
import { useT } from '@/composables/t';

const t = useT();
</script>

<template>
  <NavButton
    :to="{ name: 'break-schedule' }"
    :title="t('breakSchedule')"
    icon="lucide:alarm-clock"
  />
</template>
