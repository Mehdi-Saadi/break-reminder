<script setup lang="ts">
import { useUpdaterStore } from '@/main/stores/updater';
import { useT } from '@/shared/composables/t';
import { useClipboard } from '@vueuse/core';
import { getVersion } from '@tauri-apps/api/app';
import { onBeforeMount, ref } from 'vue';
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

const { copy: copyEmail, copied: emailCopied } = useClipboard({ source: supportEmail });
const { copy: copySupportPage, copied: supportPageCopied } = useClipboard({ source: supportPage });

const appVersion = ref<string>('-');

const setVersion = async (): Promise<void> => {
  appVersion.value = await getVersion();
};

onBeforeMount(setVersion);
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

        <!-- email -->
        <div>
          <span class="me-1">
            {{ t('support') }}:
          </span>

          <UPopover
            v-model:open="emailCopied"
            arrow
          >
            <template #anchor>
              <UButton
                :label="supportEmail"
                class="underline"
                variant="ghost"
                color="info"
                @click="copyEmail()"
              />
            </template>

            <template #content>
              <div class="px-4 py-3 select-none">
                {{ t('copied') }}!
              </div>
            </template>
          </UPopover>
        </div>

        <!-- page -->
        <div>
          <span class="me-3">
            {{ t('orVisit') }}:
          </span>

          <UPopover
            v-model:open="supportPageCopied"
            arrow
          >
            <template #anchor>
              <UButton
                :label="supportPage"
                class="underline"
                variant="ghost"
                color="info"
                @click="copySupportPage()"
              />
            </template>

            <template #content>
              <div class="px-4 py-3 select-none">
                {{ t('copied') }}!
              </div>
            </template>
          </UPopover>
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
