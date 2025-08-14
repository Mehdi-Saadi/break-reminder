<script setup lang="ts">
import { useT } from '@/shared/composables/t';
import { BREAK_WINDOW_EVENT, BreakWindowPayload } from '@/shared/types/break';
import { Second } from '@/shared/types/time';
import { formatSecondsToMinutesAndSeconds } from '@/shared/utils/time';
import { emit, listen } from '@tauri-apps/api/event';
import { getCurrentWindow } from '@tauri-apps/api/window';
import { useCountdown } from '@vueuse/core';
import { computed, onMounted } from 'vue';

const t = useT();

const getBreakWindowPayloadFromUrl = (): BreakWindowPayload => {
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

const skip = (): Promise<void> => emit(BREAK_WINDOW_EVENT.skip);

const destroyCurrentWindowOnSkip = async (): Promise<void> => {
  await listen(BREAK_WINDOW_EVENT.skip, destroyCurrentWindow);
};

onMounted(destroyCurrentWindowOnSkip);
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

        <div class="flex items-center text-xs space-x-2">
          <UButton
            :label="t('postpone')"
            class="w-24 rounded-3xl"
            color="neutral"
            variant="outline"
          />

          <UButton
            :label="t('skip')"
            class="w-24 rounded-3xl"
            color="neutral"
            variant="outline"
            @click="skip"
          />
        </div>
      </div>
    </div>
  </UApp>
</template>
