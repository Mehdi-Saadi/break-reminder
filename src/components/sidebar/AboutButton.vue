<template>
  <NavButton
    :to="{ name: 'about' }"
    :title="t('aboutSoftware')"
    icon="lucide:info"
  />
</template>

<script setup lang="ts">
import NavButton from '@/components/sidebar/NavButton.vue';
import { useT } from '@/composables/t';

const t = useT();
</script>
