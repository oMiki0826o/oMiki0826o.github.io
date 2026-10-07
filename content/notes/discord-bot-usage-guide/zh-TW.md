## 開始前：邀請與權限

先在 Discord Developer Portal 依實際啟用的模組開啟需要的 Privileged Gateway Intents。邀請 Bot 時至少要包含 bot 與 applications.commands 兩個 scope，否則 Slash Command 不會正常出現。

## 先確認 Bot 是否正常在線

Bot 啟動後，先使用 /help、/ping 和 /botinfo。/help 會依目前真正載入的模組列出可用的 Slash Command；不同伺服器啟用的功能不一樣，所以它是最可靠的入口。

## 從一般功能開始

一般成員可先從 /help 找到可用功能。依模組設定，Bot 可能提供音樂播放、社群身分組、Ticket、訊息工具、文件轉換與 AI 對話。AI 功能需要另外啟用，沒有設定時不必強行使用。

## 管理者與 Owner 的維運指令

模組狀態、設定與 Bot 健康狀態屬於維運工作，應由 Owner 使用設定檔中的 Prefix 指令處理；預設 Prefix 是 $。可先用 $help、$bot status、$bot health、$mod list 與 $settings status 檢查，不要把 Token 或 Gemini API Key 貼到 Discord、截圖或公開文章。

## 從一個小功能開始熟悉

第一次使用不必把所有模組都試過一輪。先在測試頻道輸入 `/help`，看這個伺服器實際載入了哪些指令，再挑一個不會影響其他人的功能，例如 `/ping` 或 `/botinfo`。如果看不到指令，先等幾秒讓 Slash Command 同步完成；仍然沒有時，再檢查 Bot 是否被邀請了 `applications.commands` scope。

音樂模組則建議先在有語音權限的頻道測試搜尋、加入佇列與停止。管理者可以把 Bot 的指令權限限制在指定頻道，先讓少數人試用，再逐步開放。這比一開始把所有權限給滿，最後才追查是哪個模組造成問題安全得多。

## 出問題時怎麼留下線索

遇到指令沒有反應時，先記下時間、伺服器、使用的指令與 Bot 當時顯示的訊息，不要只寫「壞了」。接著用 `$bot health` 和 `$mod list` 看核心與模組狀態；如果只有某一個功能失敗，通常比整隻 Bot 離線更容易定位。Token、API Key、伺服器邀請連結與成員識別碼都不要貼到公開 issue。

## 使用上的界線

這個 Bot 的功能會依設定與環境不同而改變：AI 需要額外的 Gemini 設定，音樂需要 FFmpeg，Minecraft 維運則需要另外的 bridge 與本機權限。文件中的指令是目前專案的入口，不代表每個伺服器都會開啟全部功能；以 `/help` 顯示的結果和部署端設定為準。
