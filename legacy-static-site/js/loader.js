/*
js/loader.js

Modification():

- Added   fetchJSON 加入逾時保護（AbortController + setTimeout）。
        先前沒有逾時機制時，若某個 JSON 請求因為網路狀況卡住
        （既不成功也不失敗），該次 fetch 會無限期停在 pending，
        雖然不會像先前的 ReferenceError 那樣直接讓整頁當掉，
        但仍會讓依賴該筆資料的區塊永遠停在「讀取中」。
        逾時預設 8 秒，超過就視同請求失敗，回傳 null 讓呼叫端的
        既有防呆邏輯（if (data) {...}）自然處理。
- Removed stripJSONComments 與相關剝除註解邏輯：
  config/*.json 已改為標準 JSON（不含註解），
  格式說明統一移至 config/HOW_TO.md，此函式已無存在必要
- Simplified fetchJSON 直接呼叫 response.json()，
  移除「文字讀取 → 剝註解 → 解析」的中間步驟

Description:

提供全站共用的 JSON 載入工具，統一處理請求失敗、逾時與錯誤訊息，
避免每個頁面重複撰寫 try/catch。
*/

const FETCH_TIMEOUT_MS = 8000;

// ── JSON 載入 ─────────────────────────────────────────────
/**
 * 讀取指定路徑的 JSON 檔案，附帶逾時保護。
 * @param {string} path - JSON 檔案的相對路徑。
 * @returns {Promise<any|null>} 解析後的資料，失敗或逾時時回傳 null。
 */
async function fetchJSON(path) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);

  try {
    const response = await fetch(path, { cache: 'no-cache', signal: controller.signal });
    if (!response.ok) {
      throw new Error(`無法載入 ${path}（狀態碼 ${response.status}）`);
    }
    return await response.json();
  } catch (error) {
    const reason = error.name === 'AbortError' ? `逾時（超過 ${FETCH_TIMEOUT_MS}ms）` : error;
    console.error(`[fetchJSON] ${path} 載入失敗：`, reason);
    return null;
  } finally {
    clearTimeout(timeoutId);
  }
}
