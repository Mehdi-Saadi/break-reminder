<script setup lang="ts">
import Item from '@/components/setting/Item.vue';
import Section from '@/components/setting/Section.vue';
import { useT } from '@/composables/t';
import { useSettingStore } from '@/stores/setting';

const t = useT();

const settingStore = useSettingStore();
</script>

<template>
  <div class="flex flex-col space-y-4">
    <Section :label="t('workSession')">
      <Item :title="t('workDurationInMinutes')">
        <UInputNumber
          v-model="settingStore.settings.shortWorkDuration"
          :max="900"
          :min="1"
          class="max-w-32"
        />
      </Item>
    </Section>

    <Section :label="t('shortBreaks')">
      <Item :title="t('breakDurationInSeconds')">
        <UInputNumber
          v-model="settingStore.settings.shortBreakDuration"
          :max="900"
          :min="1"
          class="max-w-32"
        />
      </Item>
    </Section>

    <Section :label="t('longBreaks')">
      <Item :title="t('countOfShortWorksForLongBreak')">
        <UInputNumber
          v-model="settingStore.settings.countOfShortWorksForLongBreak"
          :max="900"
          :min="1"
          class="max-w-32"
        />
      </Item>

      <Item :title="t('breakDurationInSeconds')">
        <UInputNumber
          v-model="settingStore.settings.longBreakDuration"
          :max="900"
          :min="1"
          class="max-w-32"
        />
      </Item>
    </Section>
  </div>
</template>
