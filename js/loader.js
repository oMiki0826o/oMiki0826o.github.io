/**
 * js/loader.js
 *
 * Modification():
 *
 * - Added 共用 JSON 載入函式
 *
 * Description:
 *
 * 提供全站共用的 fetchJSON 工具，統一處理請求失敗與錯誤訊息，
 * 避免每個頁面重複撰寫 try/catch。
 */

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
