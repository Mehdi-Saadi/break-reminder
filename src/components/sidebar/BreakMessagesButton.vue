<template>
  <NavButton
    :to="{ name: 'break-messages' }"
    :title="t('breakMessages')"
    :ui="{ icon: 'size-5 me-1.5' }"
    icon="lucide:message-circle"
  />
</template>

<script setup lang="ts">
import NavButton from '@/components/sidebar/NavButton.vue';
import { useT } from '@/composables/t';

const t = useT();
</script>
