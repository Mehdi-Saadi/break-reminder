import { KeyWord } from '@/break/i18n/types';
import { useI18n } from 'vue-i18n';

export const useT = () => {
  const { t } = useI18n();

  return (
    key: KeyWord,
    ...params: any[]
  ): string => t(key, ...params);
};
