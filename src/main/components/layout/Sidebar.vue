<script setup lang="ts">
import NavButton from '@/main/components/layout/NavButton.vue';
import { useT } from '@/shared/composables/t';
import { computed } from 'vue';

const t = useT();

const mainButtons = computed(() => [
  {
    to: { name: 'general' },
    label: t('general'),
    icon: 'lucide:settings',
  },
  {
    to: { name: 'break-schedule' },
    label: t('breakSchedule'),
    icon: 'lucide:alarm-clock',
  },
  {
    to: { name: 'behavior' },
    label: t('behavior'),
    icon: 'lucide:brain',
  },
  {
    to: { name: 'notification-alerts' },
    label: t('notificationsAndAlerts'),
    icon: 'lucide:bell',
  },
  {
    to: { name: 'break-messages' },
    label: t('breakMessages'),
    icon: 'lucide:message-circle',
  },
]);

const secondaryButtons = computed(() => [
  {
    to: { name: 'about' },
    label: t('aboutSoftware'),
    icon: 'lucide:info',
  },
]);
</script>

<template>
  <div class="h-full w-1/3 fixed bg-inherit p-5 flex flex-col justify-between">
    <!-- main buttons -->
    <div class="space-y-1 w-full">
      <NavButton
        v-for="button in mainButtons"
        :key="button.label"
        :button="button"
      />
    </div>

    <!-- secondary buttons -->
    <div class="w-full">
      <NavButton
        v-for="button in secondaryButtons"
        :key="button.label"
        :button="button"
      />
    </div>
  </div>
</template>
