<script setup lang="ts">
import { Millisecond } from '@/shared/types/time';
import { useCountdown } from '@vueuse/core';

const getBreakWindowPayloadFromUrl = () => {
  const searchParams = new URLSearchParams(window.location.search);

  return {
    message: searchParams.get('message') || undefined,
    timeout: parseInt(searchParams.get('timeout') || '20000') as Millisecond,
    showSkipBtn: searchParams.get('showSkipBtn') !== 'false',
    showPostponeBtn: searchParams.get('showPostponeBtn') !== 'false'
  };
};

const windowPayload = getBreakWindowPayloadFromUrl();

const { remaining } = useCountdown(windowPayload.timeout, {
  immediate: true,
});
</script>

<template>
  <UApp>
    <div class="min-w-dvw min-h-dvh flex items-center justify-center bg-black/80 text-gray-300 select-none">
      <!-- wrapper -->
      <div class="flex flex-col items-center space-y-5">
        <div class="font-semibold text-4xl">
          {{ windowPayload.message }}
        </div>

        <div class="text-sm">
          {{ remaining }}
        </div>

        <div class="flex items-center text-xs">
        </div>
      </div>
      Hey there!
    </div>
  </UApp>
</template>
