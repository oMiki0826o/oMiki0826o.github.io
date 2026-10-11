/*
 * File: lab-tools.ts
 * Modification: 2026-10-11 — Single source for Lab index, links, routes, and titles.
 */

export const labTools = [
  {
    slug: 'pearl-cannon', number: '01', title: 'Pearl cannon calculator',
    description: '輸入珍珠與目標座標，搜尋通用幾何模型的 TNT 當量。',
    detail: '輸入砲口珍珠 XYZ、目標 XZ 與單側當量，檢視 XZ 誤差與預測高度。'
  },
  {
    slug: 'astro-compare', number: '02', title: 'Astro compare',
    description: '把照片處理前後放在同一片天空下。',
    detail: '使用本機的兩張真實照片與分界線比較處理差異。'
  },
  {
    slug: 'snake', number: '03', title: 'Small strange things',
    description: '沒有用途，但我想知道它能不能動。',
    detail: '玩一局可以用鍵盤或畫面按鈕操作的貪食蛇。'
  },
  {
    slug: 'github-galaxy', number: '04', title: 'GitHub galaxy',
    description: '把公開專案暫時放進同一片軌道。',
    detail: '每個星體連到真實 GitHub 儲存庫；大小與顏色只是視覺比喻。'
  },
  {
    slug: 'structmark', number: '05', title: 'StructMark Playground',
    description: '把自己寫的標記語言拿來實際寫文章。',
    detail: '即時預覽 HTML、AST、診斷資訊，並匯入或匯出 .sm。'
  }
] as const;

export type LabToolId = (typeof labTools)[number]['slug'];
export function getLabTool(slug: string) {
  return labTools.find((tool) => tool.slug === slug);
}
