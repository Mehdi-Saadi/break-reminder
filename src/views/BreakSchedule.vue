<script setup lang="ts">
import Item from '@/components/setting/Item.vue';
import SectionBorder from '@/components/setting/SectionBorder.vue';
import { useT } from '@/composables/t';
import { useSettingStore } from '@/stores/setting';
import { storeToRefs } from 'pinia';

const t = useT();

const { settings } = storeToRefs(useSettingStore());
</script>

<template>
  <div class="flex flex-col space-y-4">
    <SectionBorder :label="t('workSession')">
      <Item :title="t('workDurationInMinutes')">
        <UInputNumber
          v-model="settings.shortWorkDuration"
          :max="900"
          :min="1"
          class="max-w-32"
        />
      </Item>
    </SectionBorder>

    <SectionBorder :label="t('shortBreaks')">
      <Item :title="t('breakDurationInSeconds')">
        <UInputNumber
          v-model="settings.shortBreakDuration"
          :max="900"
          :min="1"
          class="max-w-32"
        />
      </Item>
    </SectionBorder>

    <SectionBorder :label="t('longBreaks')">
      <Item :title="t('countOfShortWorksForLongBreak')">
        <UInputNumber
          v-model="settings.countOfShortWorksForLongBreak"
          :max="900"
          :min="1"
          class="max-w-32"
        />
      </Item>

      <Item :title="t('breakDurationInSeconds')">
        <UInputNumber
          v-model="settings.longBreakDuration"
          :max="900"
          :min="1"
          class="max-w-32"
        />
      </Item>
    </SectionBorder>
  </div>
</template>
