<script setup lang="ts">
import NavButton from '@/components/sidebar/NavButton.vue';
import { useT } from '@/composables/t';

const t = useT();
</script>

<template>
  <NavButton
    :to="{ name: 'notification-alerts' }"
    :title="t('notificationsAndAlerts')"
    icon="lucide:bell"
  />
</template>
