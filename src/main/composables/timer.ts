import type { Second } from '@/shared/types/time'
import { invoke } from '@tauri-apps/api/core'
import { listen } from '@tauri-apps/api/event'
import { storeToRefs } from 'pinia'
import { onBeforeUnmount, onMounted } from 'vue'
import { useBreakAudio } from '@/main/composables/breakAudio'
import { useBreakNotification } from '@/main/composables/breakNotification'
import { useFullscreenBreak } from '@/main/composables/fullscreenBreak'
import { useSettingStore } from '@/main/stores/setting'
import { BREAK_WINDOW_EVENT } from '@/shared/types/break'
import { minutesToMilliseconds, secondsToMilliseconds } from '@/shared/utils/time'

export function useTimer(): void {
  const { createShortBreakWindow, createLongBreakWindow } = useFullscreenBreak()
  const { playPreBreakAudio, playStopBreakAudio } = useBreakAudio()
  const { show: showBreakNotification } = useBreakNotification()
  const { settings } = storeToRefs(useSettingStore())

  let workTimeout: NodeJS.Timeout | null = null
  let prepareForBreakTimeout: NodeJS.Timeout | null = null
  let breakTimeout: NodeJS.Timeout | null = null
  let countOfShortWorks = 0

  async function startWork(): Promise<void> {
    resetWorkTimeout()
    resetPrepareForBreakTimeout()
    await playStopBreakAudio()
  }

  function resetWorkTimeout(): void {
    clearWorkTimeout()
    setWorkTimeout()
  }

  function clearWorkTimeout(): void {
    if (workTimeout) {
      clearTimeout(workTimeout)
      workTimeout = null
    }
  }

  function setWorkTimeout(): void {
    workTimeout = setTimeout(
      takeBreakIfNeeded,
      minutesToMilliseconds(settings.value.workDuration),
    )
  }

  async function takeBreakIfNeeded(): Promise<void> {
    const focusedWindowIsFullscreen = await invoke('check_focused_window_fullscreen')

    if (settings.value.doNotDisturb && focusedWindowIsFullscreen) {
      await startWork()
    }
    else {
      await takeBreak()
    }
  }

  async function takeBreak(): Promise<void> {
    countOfShortWorks++

    if (shouldTakeLongBreak()) {
      await takeLongBreak()
    }
    else {
      await takeShortBreak()
    }

    await playPreBreakAudio()
  }

  function shouldTakeLongBreak(): boolean {
    if (countOfShortWorks >= settings.value.countOfShortWorksForLongBreak) {
      countOfShortWorks = 0
      return true
    }
    return false
  }

  async function takeLongBreak(): Promise<void> {
    await createLongBreakWindow()
    resetBreakTimeout(settings.value.longBreakDuration)
  }

  async function takeShortBreak(): Promise<void> {
    await createShortBreakWindow()
    resetBreakTimeout(settings.value.shortBreakDuration)
  }

  function resetBreakTimeout(seconds: Second): void {
    clearBreakTimeout()
    setBreakTimeout(seconds)
  }

  function clearBreakTimeout(): void {
    if (breakTimeout) {
      clearTimeout(breakTimeout)
      breakTimeout = null
    }
  }

  function setBreakTimeout(seconds: Second): void {
    breakTimeout = setTimeout(
      startWork,
      secondsToMilliseconds(seconds),
    )
  }

  function resetPrepareForBreakTimeout(): void {
    clearPrepareForBreakTimeout()
    setPrepareForBreakTimeout()
  }

  function clearPrepareForBreakTimeout(): void {
    if (prepareForBreakTimeout) {
      clearTimeout(prepareForBreakTimeout)
      prepareForBreakTimeout = null
    }
  }

  function setPrepareForBreakTimeout(): void {
    const workTime = minutesToMilliseconds(settings.value.workDuration)
    const prepareTime = secondsToMilliseconds(settings.value.timeToPrepareForBreak)
    const prepareForBreakTime = workTime - prepareTime

    prepareForBreakTimeout = setTimeout(showBreakNotification, prepareForBreakTime)
  }

  async function initBreakWindowListeners(): Promise<void> {
    await listen(BREAK_WINDOW_EVENT.skip, () => {
      clearBreakTimeout()
      startWork()
    })
  }

  onMounted(async () => {
    await startWork()
    await initBreakWindowListeners()
  })

  onBeforeUnmount(() => {
    clearWorkTimeout()
    clearBreakTimeout()
    clearPrepareForBreakTimeout()
  })
}
