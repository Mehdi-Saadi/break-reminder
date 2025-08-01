<template>
  <div class="h-full w-1/3 fixed bg-inherit p-5 flex flex-col justify-between">
    <!-- main buttons -->
    <div class="space-y-1 w-full">
      <GeneralButton />
      <BreakScheduleButton />
      <BehaviorButton />
      <NotifButton />
      <BreakMessagesButton />
    </div>

    <!-- about software -->
    <div class="w-full">
      <AboutButton />
    </div>
  </div>
</template>

<script setup lang="ts">
import GeneralButton from '@/components/sidebar/GeneralButton.vue';
import BreakScheduleButton from '@/components/sidebar/BreakScheduleButton.vue';
import BehaviorButton from '@/components/sidebar/BehaviorButton.vue';
import NotifButton from '@/components/sidebar/NotifButton.vue';
import BreakMessagesButton from '@/components/sidebar/BreakMessagesButton.vue';
import AboutButton from '@/components/sidebar/AboutButton.vue';
</script>
