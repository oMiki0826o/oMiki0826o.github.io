/**
 * js/loader.js
 *
 * Modification():
 *
 * - Added 共用 JSON 載入函式
 * - Added stripJSONComments：支援在 config/*.json 中撰寫 // 與 /* *\/ 註解
 *
 * Description:
 *
 * 提供全站共用的 fetchJSON 工具，統一處理請求失敗與錯誤訊息，
 * 避免每個頁面重複撰寫 try/catch。
 *
 * 因為瀏覽器原生的 JSON.parse 不支援註解，但我們希望 config 檔案
 * 能寫上「這一行在調整什麼」的說明文字，所以這裡先把檔案當純文字
 * 抓回來，剝掉註解之後才轉成 JSON 物件。
 */

/**
 * 移除 JSON 文字中的註解，讓內容可以被 JSON.parse 解析。
 *
 * 規則（刻意設計得保守，避免誤殺資料裡的網址）：
 * 1. 只移除「整行開頭就是 //」的整行註解，例如：
 *      // 這是說明文字
 *    不會處理一行中間出現的 //，所以像
 *      "url": "https://example.com"
 *    這種值中間的 // 不會被誤判成註解而被切掉。
 * 2. 移除 /* 多行區塊註解 *\/。
 *
 * @param {string} text - 原始檔案文字（含註解）。
 * @returns {string} 移除註解後、可被 JSON.parse 解析的文字。
 */
function stripJSONComments(text) {
  const withoutBlockComments = text.replace(/\/\*[\s\S]*?\*\//g, '');
  const withoutLineComments = withoutBlockComments.replace(/^[ \t]*\/\/.*$/gm, '');
  return withoutLineComments;
}

/**
 * 讀取指定路徑的 JSON（實際上允許是 JSONC，含註解）檔案。
 * @param {string} path - JSON 檔案的相對路徑。
 * @returns {Promise<any|null>} 解析後的資料，失敗時回傳 null。
 */
async function fetchJSON(path) {
  try {
    const response = await fetch(path, { cache: 'no-cache' });
    if (!response.ok) {
      throw new Error(`無法載入 ${path}（狀態碼 ${response.status}）`);
    }
    const rawText = await response.text();
    return JSON.parse(stripJSONComments(rawText));
  } catch (error) {
    console.error('[fetchJSON]', error);
    return null;
  }
}
