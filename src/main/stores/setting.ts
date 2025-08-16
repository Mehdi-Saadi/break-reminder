import type { Settings } from '@/shared/types/setting'
import type { Minute, Second } from '@/shared/types/time'
import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

export const useSettingStore = defineStore('setting', () => {
  const STORAGE_KEY = 'settings'
  const DEFAULT_SETTINGS: Readonly<Settings> = {
    workDuration: 20 as Minute,
    shortBreakDuration: 20 as Second,
    longBreakDuration: 120 as Second,
    countOfShortWorksForLongBreak: 3,
    timeToPrepareForBreak: 10 as Second,
    strictBreak: false,
    allowPostponingBreaks: false,
    postponeDuration: 5 as Minute,
    autostart: true,
    doNotDisturb: true,
    notification: true,
    audibleAlert: true,
    selectedAudio: null,
    smartPause: true,
    screensaver: true,
    darkMode: true,
    shortBreakMessages: {
      '88027327-d0a0-42c3-a990-363e865d49e3': 'Tightly close your eyes',
      'db36bc4b-6d4f-42d2-a10f-f31f8fd8fe8d': 'Roll your eyes a few times to each side',
      '60981702-125f-411b-ac70-98fc6b7a5c8c': 'Rotate your eyes in clockwise direction',
      'a1416a32-977d-4035-832b-30245bb9444b': 'Rotate your eyes in counterclockwise direction',
      '6d18d092-2f49-4e16-99b0-f95538f6c479': 'Blink your eyes',
      '141dfbfc-6f24-4fac-84ab-0835b0f11584': 'Focus on a point in the far distance',
      '707748c5-4629-47f8-9ed7-e94db77632e9': 'Have some water',
    },
    longBreakMessages: {
      'b077fa44-9219-4bfc-a665-2e3a87a95727': 'Walk for a while',
      'aa88fa9a-51a3-40a7-b8a3-35a7bdf247d0': 'Lean back at your seat and relax',
    },
    language: 'en',
  }

  const settings = ref<Settings>(getSettings())

  function getSettings(): Settings {
    const localData = localStorage.getItem(STORAGE_KEY)

    if (!localData) {
      return { ...DEFAULT_SETTINGS }
    }

    try {
      const parsedData = JSON.parse(localData)

      for (const key in parsedData) {
        if (!(key in DEFAULT_SETTINGS)) {
          return { ...DEFAULT_SETTINGS }
        }
      }

      return { ...DEFAULT_SETTINGS, ...parsedData }
    }
    catch {
      return { ...DEFAULT_SETTINGS }
    }
  }

  function saveSettingsToStorage(): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings.value))
  }

  watch(settings, saveSettingsToStorage, { deep: true })

  return {
    settings,
  }
})
