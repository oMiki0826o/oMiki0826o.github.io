## 開始前：邀請與權限

先在 Discord Developer Portal 依實際啟用的模組開啟需要的 Privileged Gateway Intents。邀請 Bot 時至少要包含 bot 與 applications.commands 兩個 scope，否則 Slash Command 不會正常出現。

## 先確認 Bot 是否正常在線

Bot 啟動後，先使用 /help、/ping 和 /botinfo。/help 會依目前真正載入的模組列出可用的 Slash Command；不同伺服器啟用的功能不一樣，所以它是最可靠的入口。

## 從一般功能開始

一般成員可先從 /help 找到可用功能。依模組設定，Bot 可能提供音樂播放、社群身分組、Ticket、訊息工具、文件轉換與 AI 對話。AI 功能需要另外啟用，沒有設定時不必強行使用。

## 管理者與 Owner 的維運指令

模組狀態、設定與 Bot 健康狀態屬於維運工作，應由 Owner 使用設定檔中的 Prefix 指令處理；預設 Prefix 是 $。可先用 $help、$bot status、$bot health、$mod list 與 $settings status 檢查，不要把 Token 或 Gemini API Key 貼到 Discord、截圖或公開文章。
