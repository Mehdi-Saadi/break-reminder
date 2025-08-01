<template>
  <NavButton
    :to="{ name: 'break-schedule' }"
    :title="t('breakSchedule')"
    :ui="{ icon: 'size-5 me-1.5' }"
    icon="ic:baseline-access-alarm"
  />
</template>

<script setup lang="ts">
import NavButton from '@/components/sidebar/NavButton.vue';
import { useT } from '@/composables/t';

const t = useT();
</script>
