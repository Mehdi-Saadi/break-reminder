<script setup lang="ts">
import { useUpdaterStore } from '@/main/stores/updater';
import { useT } from '@/shared/composables/t';
import { getVersion } from '@tauri-apps/api/app';
import { onMounted, ref } from 'vue';
import { storeToRefs } from 'pinia';

const t = useT();

const updaterStore = useUpdaterStore();
const {
  downloadLoading,
  checkForUpdateLoading,
  updateAvailable,
} = storeToRefs(updaterStore);
const {
  checkAndNotify,
  downloadAndInstall,
} = updaterStore;

const supportEmail = 'mehdi.0.saadi@gmail.com';
const supportPage = 'https://github.com/Mehdi-Saadi/break-reminder/issues';

const appVersion = ref<string>('-');

const setVersion = async (): Promise<void> => {
  appVersion.value = await getVersion();
};

onMounted(setVersion);
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
          v-if="updateAvailable"
          :label="t('update')"
          :loading="downloadLoading"
          variant="subtle"
          color="neutral"
          @click="downloadAndInstall"
        />

        <UButton
          v-else
          :label="t('checkForUpdates')"
          :loading="checkForUpdateLoading"
          variant="subtle"
          color="neutral"
          @click="checkAndNotify"
        />
      </div>
    </section>
  </div>
</template>
