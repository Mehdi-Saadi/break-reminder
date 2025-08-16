<script setup lang="ts">
import CheckboxItem from '@/main/components/setting/CheckboxItem.vue'
import InputNumberItem from '@/main/components/setting/InputNumberItem.vue'
import { useSettingStore } from '@/main/stores/setting'
import { useT } from '@/shared/composables/t'

const t = useT()

const settingStore = useSettingStore()
</script>

<template>
  <div class="flex flex-col space-y-5 p-4 text-sm">
    <!-- strick break -->
    <CheckboxItem
      v-model="settingStore.settings.strictBreak"
      :title="t('strictBreak')"
      :description="t('strictBreakInfo')"
      icon="lucide:lock"
    />

    <!-- do not disturb -->
    <CheckboxItem
      v-model="settingStore.settings.doNotDisturb"
      :title="t('doNotDisturb')"
      :description="t('doNotDisturbInfo')"
      icon="lucide:octagon-x"
    />

    <!-- time to prepare for a break -->
    <InputNumberItem
      v-model="settingStore.settings.timeToPrepareForBreak"
      :title="t('timeToPrepareForBreakInSeconds')"
      icon="lucide:hourglass"
    />
  </div>
</template>
