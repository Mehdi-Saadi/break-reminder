import { KeyWord } from '@/shared/i18n/types';
import { useI18n } from 'vue-i18n';

export const useT = () => {
  const { t } = useI18n();

  type Rest = Parameters<typeof t> extends [any, ...infer P] ? P : never;

  return (
    key: KeyWord,
    ...params: any[]
  ): string => t(key, ...(params as Rest));
};
