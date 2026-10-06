import type {Locale} from './config';
import ja from './messages/ja.json';
import zhTW from './messages/zh-TW.json';

const messages = {'zh-TW': zhTW, ja} as const;

export function getMessages(locale: Locale) {
  return messages[locale];
}
