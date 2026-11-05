import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

const read = (file) => readFileSync(file, 'utf8');
const articles = [
  ['about-me', ['整理作品與文章', 'Organizing works and notes', '作品と記事の整理']],
  ['discord-bot-from-zero', ['模組化之後的驗證', 'Verifying modular behavior', 'モジュール化後の検証']],
  ['discord-bot-mod-guide', ['提交前的模組檢查', 'Checking a module before release', '公開前のModの確認']],
  ['discord-bot-usage-guide', ['權限與回報問題', 'Permissions and bug reports', '権限と不具合報告']],
  ['seasonal-night-sky-guide', ['觀測前後的紀錄', 'Before and after observing', '観測前後の記録']],
  ['spacetime-and-gravitational-waves', ['分清模型與證據', 'Models versus evidence', 'モデルと証拠の違い']],
  ['ultrasonic-call-study-notes', ['呈現結果的原則', 'Presenting results responsibly', '結果を示すための原則']]
];

test('all seven Notes have a matching substantive editorial section in all three languages', () => {
  for (const [slug, headings] of articles) {
    for (const [i, locale] of ['zh-TW', 'en', 'ja'].entries()) {
      const body = read(`content/notes/${slug}/${locale}.sm`);
      assert.ok(body.includes('#2 ' + headings[i]), `Missing new section: ${slug}/${locale}`);
      assert.ok(body.length > 950, `Article is too brief: ${slug}/${locale}`);
    }
  }
});

test('featured image caption carries the requested slogan in all three locales', () => {
  const p = read('content/profile.ts');
  assert.ok(p.includes('認識螢門、理解螢門、加入螢門！流螢佔領全世界！'));
  assert.ok(p.includes('Understand Firefly'));
  assert.ok(p.includes('ホタル'));
});
