import { storeToRefs } from 'pinia'
import { useSettingStore } from '@/main/stores/setting'

export function useBreakMessage() {
  const { settings } = storeToRefs(useSettingStore())

  let shortBreakMessageIndex = 0
  let longBreakMessageIndex = 0

  function getMessage(messages: string[], index: number): [string, number] {
    if (messages.length < (index + 1)) {
      index = 0
    }

    const message = messages[index] || ''
    index++

    return [message, index]
  }

  function getShortBreakMessage(): string {
    const [message, newIndex] = getMessage(
      Object.values(settings.value.shortBreakMessages),
      shortBreakMessageIndex,
    )

    shortBreakMessageIndex = newIndex

    return message
  }

  function getLongBreakMessage(): string {
    const [message, newIndex] = getMessage(
      Object.values(settings.value.longBreakMessages),
      longBreakMessageIndex,
    )

    longBreakMessageIndex = newIndex

    return message
  }

  return {
    getShortBreakMessage,
    getLongBreakMessage,
  }
}
