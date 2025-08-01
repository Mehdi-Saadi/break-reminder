<template>
  <NavButton
    :to="{ name: 'notification-alerts' }"
    :title="t('notificationsAndAlerts')"
    :ui="{ icon: 'size-5 me-1.5' }"
    icon="lucide:bell"
  />
</template>

<script setup lang="ts">
import NavButton from '@/components/sidebar/NavButton.vue';
import { useT } from '@/composables/t';

const t = useT();
</script>
