import {notes} from '@/content/notes';

export const dynamic = 'force-static';

function escapeXml(value: string) {
  return value.replace(/[<>&'\"]/g, (character) => ({'<': '&lt;', '>': '&gt;', '&': '&amp;', "'": '&apos;', '"': '&quot;'}[character]!));
}

export function GET() {
  const items = notes.map((note) => `<item><title>${escapeXml(note.title['zh-TW'])}</title><description>${escapeXml(note.excerpt['zh-TW'])}</description><link>https://omiki0826o.github.io/zh-TW/notes/${note.slug}/</link><guid>https://omiki0826o.github.io/zh-TW/notes/${note.slug}/</guid><pubDate>${new Date(`${note.date}T00:00:00Z`).toUTCString()}</pubDate></item>`).join('');
  const xml = `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>Miki 的文章與紀錄</title><link>https://omiki0826o.github.io/zh-TW/notes/</link><description>開發紀錄、研究筆記與一些不想讓它們消失的小記錄。</description><language>zh-TW</language>${items}</channel></rss>`;
  return new Response(xml, {headers: {'Content-Type': 'application/rss+xml; charset=utf-8'}});
}
