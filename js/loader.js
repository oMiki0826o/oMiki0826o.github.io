/*
js/loader.js

Modification():

- Removed stripJSONComments 與相關剝除註解邏輯：
  config/*.json 已改為標準 JSON（不含註解），
  格式說明統一移至 config/HOW_TO.md，此函式已無存在必要
- Simplified fetchJSON 直接呼叫 response.json()，
  移除「文字讀取 → 剝註解 → 解析」的中間步驟

Description:

提供全站共用的 JSON 載入工具，統一處理請求失敗與錯誤訊息，
避免每個頁面重複撰寫 try/catch。
*/

// ── JSON 載入 ─────────────────────────────────────────────
/**
 * 讀取指定路徑的 JSON 檔案。
 * @param {string} path - JSON 檔案的相對路徑。
 * @returns {Promise<any|null>} 解析後的資料，失敗時回傳 null。
 */
async function fetchJSON(path) {
  try {
    const response = await fetch(path, { cache: 'no-cache' });
    if (!response.ok) {
      throw new Error(`無法載入 ${path}（狀態碼 ${response.status}）`);
    }
    return await response.json();
  } catch (error) {
    console.error('[fetchJSON]', error);
    return null;
  }
}
