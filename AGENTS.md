# 開發協作規範

本專案參考 [AI Development Governance](https://github.com/oMiki0826o/AI-Development-Governance)。原始治理倉庫為規範來源；此文件僅列出本站的實際執行方式，不複製整套規範。

## 工作方式

1. 先確認需求、既有行為與修改範圍，避免無關重構。
2. 錯誤先重現與定位根因，再補回歸測試後修復。
3. 保留三語系、靜態匯出、StructMark 與現有視覺設計；破壞性調整先取得同意。
4. 修改程式碼後執行對應測試；正式發布必須通過完整驗證與瀏覽器測試。
5. README、docs/ 文件面向讀者，以自然、準確、可操作的文字撰寫，不寫成給 Agent 的命令集合。
6. 不得把未執行的測試寫成通過；無法驗證時記錄限制及重現方式。

## 檢查關卡

- Gate A（範圍）：需求與受影響檔案清楚。
- Gate B（修正）：測試先證實問題，修改後確認回歸測試通過。
- Gate C（品質）：`npm run validate:fast`。
- Gate D（發布）：`npm run test:e2e` 與 GitHub Actions 均通過。

完整說明見 `docs/GOVERNANCE.sm`，其他文件維持 StructMark `.sm` 格式。
