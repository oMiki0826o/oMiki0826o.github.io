import type {Locale} from './config';
import en from './messages/en.json';
import ja from './messages/ja.json';
import zhTW from './messages/zh-TW.json';

const messages = {'zh-TW': zhTW, en, ja} as const;

export function getMessages(locale: Locale) {
  return messages[locale];
}
