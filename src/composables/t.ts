import { KeyWord } from '@/i18n/types';
import { useI18n } from 'vue-i18n';

type OmitFirst<T extends any[]> = T extends [any, ...infer R] ? R : never;

export const useT = () => {
  const { t } = useI18n();

  return (
    key: KeyWord,
    ...params: OmitFirst<Parameters<typeof t>>
  ): string => t(key, ...params);
};
