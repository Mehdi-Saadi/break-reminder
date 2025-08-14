<script setup lang="ts">
import { useT } from '@/shared/composables/t';
import { Second } from '@/shared/types/time';
import { formatSecondsToMinutesAndSeconds } from '@/shared/utils/time';
import { getCurrentWindow } from '@tauri-apps/api/window';
import { useCountdown } from '@vueuse/core';
import { computed } from 'vue';

const t = useT();

const getBreakWindowPayloadFromUrl = () => {
  const searchParams = new URLSearchParams(window.location.search);

  return {
    message: searchParams.get('message') || undefined,
    timeout: parseInt(searchParams.get('timeout') || '20') as Second,
    showSkipBtn: searchParams.get('showSkipBtn') !== 'false',
    showPostponeBtn: searchParams.get('showPostponeBtn') !== 'false',
  };
};

const windowPayload = getBreakWindowPayloadFromUrl();

const destroyCurrentWindow = (): Promise<void> => getCurrentWindow().destroy();

const {
  remaining: remainingSeconds,
} = useCountdown(windowPayload.timeout, {
  immediate: true,
  onComplete: destroyCurrentWindow,
});

const remainingTime = computed(() => formatSecondsToMinutesAndSeconds(remainingSeconds.value as Second));
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
          {{ remainingTime }}
        </div>

        <div class="flex items-center text-xs">
        </div>
      </div>
      Hey there!
    </div>
  </UApp>
</template>
