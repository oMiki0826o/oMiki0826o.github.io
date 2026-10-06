import {z} from 'zod';
import {locales} from '@/i18n/config';

export const localizedTextSchema = z.object({
  'zh-TW': z.string(),
  en: z.string().optional(),
  ja: z.string().optional()
});

export const profileSchema = z.object({
  name: z.string(),
  avatar: z.string().url(),
  subtitle: localizedTextSchema,
  signature: localizedTextSchema,
  about: localizedTextSchema,
  status: localizedTextSchema
});

export type LocalizedText = z.infer<typeof localizedTextSchema>;
export type ProfileSource = z.infer<typeof profileSchema>;
export {locales};
