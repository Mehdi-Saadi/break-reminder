<script setup lang="ts">
import BreakMessageItem from '@/components/BreakMessageItem.vue';
import Section from '@/components/setting/Section.vue';
import { useT } from '@/composables/t';
import { useSettingStore } from '@/stores/setting';
import { computed } from 'vue';

const t = useT();

const settingStore = useSettingStore();

const shortBreakMessages = computed({
  get() {
    return settingStore.settings.shortBreakMessages;
  },
  set(newValue) {
    settingStore.settings.shortBreakMessages = newValue;
  },
});

const longBreakMessages = computed({
  get() {
    return settingStore.settings.longBreakMessages;
  },
  set(newValue) {
    settingStore.settings.longBreakMessages = newValue;
  },
});

const onAddNewShortBreakMessage = (): void => {
  shortBreakMessages.value[crypto.randomUUID()] = '';
};

const onAddNewLongBreakMessage = (): void => {
  longBreakMessages.value[crypto.randomUUID()] = '';
};
</script>

<template>
  <div class="flex flex-col space-y-4">
    <Section :label="t('shortBreaks')">
      <BreakMessageItem
        v-for="(_, key) in shortBreakMessages"
        :key="key"
        v-model="shortBreakMessages[key]"
        @delete="delete shortBreakMessages[key]"
      />

      <UButton
        :label="t('addNewMessage')"
        variant="subtle"
        class="justify-center"
        color="neutral"
        @click="onAddNewShortBreakMessage"
      />
    </Section>

    <Section :label="t('longBreaks')">
      <BreakMessageItem
        v-for="(_, key) in longBreakMessages"
        :key="key"
        v-model="longBreakMessages[key]"
        @delete="delete longBreakMessages[key]"
      />

      <UButton
        :label="t('addNewMessage')"
        variant="subtle"
        class="justify-center"
        color="neutral"
        @click="onAddNewLongBreakMessage"
      />
    </Section>
  </div>
</template>
