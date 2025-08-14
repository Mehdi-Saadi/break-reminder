<script setup lang="ts">
import { Language } from '@/shared/types/setting.ts';
import { useBrowser } from '@/shared/composables/browser';
import { BREAK_WINDOW_EVENT, BreakWindowPayload } from '@/shared/types/break';
import { formatSecondsToMinutesAndSeconds } from '@/shared/utils/time';
import { getCurrentWindow } from '@tauri-apps/api/window';
import { computed, onBeforeMount, onMounted } from 'vue';
import { emit, listen } from '@tauri-apps/api/event';
import { useT } from '@/shared/composables/t';
import { Second } from '@/shared/types/time';
import { useCountdown } from '@vueuse/core';
import { useI18n } from 'vue-i18n';

useBrowser().disableContextmenuInProd();

const t = useT();

const getBreakWindowPayloadFromUrl = (): BreakWindowPayload => {
  const searchParams = new URLSearchParams(location.search);

  return {
    message: searchParams.get('message') || undefined,
    timeout: parseInt(searchParams.get('timeout') || '20') as Second,
    showSkipBtn: searchParams.get('showSkipBtn') !== 'false',
    showPostponeBtn: searchParams.get('showPostponeBtn') !== 'false',
    language: searchParams.get('language') as Language || 'en',
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

const { locale } = useI18n();

const setLocale = (): void => {
  locale.value = windowPayload.language;
};

const setBodyStyles = (): void => {
  document.body.classList.add('bg-black/80');
};

onBeforeMount(() => {
  setLocale();
  setBodyStyles();
});
onMounted(destroyCurrentWindowOnSkip);
</script>

<template>
  <div class="min-w-dvw min-h-dvh flex items-center justify-center text-gray-300 select-none">
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
          v-if="windowPayload.showPostponeBtn"
          :label="t('postpone')"
          class="w-24 h-10 rounded-3xl justify-center"
          color="neutral"
          variant="soft"
        />

        <UButton
          v-if="windowPayload.showSkipBtn"
          :label="t('skip')"
          class="w-24 h-10 rounded-3xl justify-center"
          color="neutral"
          variant="soft"
          @click="skip"
        />
      </div>
    </div>
  </div>
</template>
