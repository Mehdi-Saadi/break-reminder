<script setup lang="ts">
import InputNumberItem from '@/main/components/setting/InputNumberItem.vue';
import Section from '@/main/components/setting/Section.vue';
import { useSettingStore } from '@/main/stores/setting';
import { useT } from '@/shared/composables/t';

const t = useT();

const settingStore = useSettingStore();
</script>

<template>
  <div class="flex flex-col space-y-4">
    <Section :label="t('workSession')">
      <InputNumberItem
        v-model="settingStore.settings.shortWorkDuration"
        :title="t('workDurationInMinutes')"
      />
    </Section>

    <Section :label="t('shortBreaks')">
      <InputNumberItem
        v-model="settingStore.settings.shortBreakDuration"
        :title="t('breakDurationInSeconds')"
      />
    </Section>

    <Section :label="t('longBreaks')">
      <InputNumberItem
        v-model="settingStore.settings.countOfShortWorksForLongBreak"
        :title="t('countOfShortWorksForLongBreak')"
      />

      <InputNumberItem
        v-model="settingStore.settings.longBreakDuration"
        :title="t('breakDurationInSeconds')"
      />
    </Section>
  </div>
</template>
