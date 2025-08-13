<script setup lang="ts">
import { useT } from '@/main/composables/t';

const t = useT();

const appVersion = 'v0.3.0';
const supportEmail = 'mehdi.0.saadi@gmail.com';
const supportPage = 'https://github.com/Mehdi-Saadi/break-reminder/issues';
</script>

<template>
  <div class="space-y-5">
    <!-- about -->
    <section>
      <h2 class="text-base font-semibold mb-3">
        {{ t('aboutSoftware') }}
      </h2>

      <div class="text-sm space-y-2">
        <p>
          {{ t('aboutSoftwareFirstInfo') }}
        </p>

        <p>
          {{ t('aboutSoftwareSecondInfo') }}
        </p>
      </div>
    </section>

    <!-- design -->
    <section>
      <h2 class="text-base font-semibold mb-3">
        {{ t('designedWithCare') }}
      </h2>

      <div class="text-sm space-y-2">
        <p>
          {{ t('designedWithCareFirstInfo') }}
        </p>
      </div>
    </section>

    <!-- feedback & support -->
    <section>
      <h2 class="text-base font-semibold mb-3">
        {{ t('feedbackAndSupport') }}
      </h2>

      <div class="text-sm space-y-2">
        <p>
          {{ t('feedbackAndSupportFirstInfo') }}
        </p>

        <div>
          <span class="me-1">
            {{ t('support') }}:
          </span>
          <a
            :href="`mailto:${supportEmail}`"
            class="text-blue-500 dark:text-blue-300 underline"
          >
            {{ supportEmail }}
          </a>
        </div>

        <div>
          <div class="me-1">
            {{ t('orVisit') }}:
          </div>
          <a
            :href="supportPage"
            target="_blank"
            class="text-blue-500 dark:text-blue-300 underline"
          >
            {{ supportPage }}
          </a>
        </div>
      </div>
    </section>

    <!-- check for updates -->
    <section>
      <h2 class="text-base font-semibold mb-3">
        {{ t('checkForUpdates') }}
      </h2>

      <div class="text-sm space-y-5">
        <p>
          {{ t('currentVersion') }}: {{ appVersion }}
        </p>

        <UButton
          :label="t('checkForUpdates')"
          variant="subtle"
          color="neutral"
        />
      </div>
    </section>
  </div>
</template>
