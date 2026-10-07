## 先理解它怎麼被找到

這個 Bot 會掃描 bot/mod/ 底下的資料夾。資料夾名稱必須是合法的 Python 識別字，而且裡面一定要有 extension.py；符合這兩個條件，Loader 才會把它當成可載入的 Mod。

例如要做提醒功能，可以先建立 bot/mod/reminder/。不要把功能直接塞進 Core，也不要用一個巨大的檔案同時放指令、設定、資料庫和商業邏輯。

## extension.py 只做組裝

extension.py 是 Mod 的入口。放 MODULE_VERSION、MODULE_DISPLAY_NAME、MODULE_DEPENDENCIES 三個中繼資料，並提供 async setup(bot)。Loader 會讀這些中繼資料來決定名稱、版本與依賴順序，再由 setup 把 Cog 註冊進 Bot。

可以參考 basic Mod：extension.py 匯入 PingCog、BotInfoCog、HelpCog，然後逐一 await bot.add_cog(...)。這個檔案應該看起來像目錄，不是功能實作本體。

## 一個入口、一個 Cog

Slash Command 可以放在獨立的 Cog。像 PingCog 只負責 /ping，建構子接收 bot，指令方法用 @app_commands.command 宣告，再從 interaction.response.send_message 回應。先讓第一個指令只做一件事，確認能載入後再加資料庫、設定或背景工作。

若功能需要設定，可以像 dm Mod 一樣在 setup 中註冊 settings，再把整理過的設定物件交給 Cog 或 Service。指令處理 Discord 互動，Service 處理功能邏輯，這樣之後要改其中一邊不會整個 Mod 一起倒。

## 載入失敗時先看這四件事

第一，資料夾是否真的在 bot/mod/ 下，而且有 extension.py。第二，MODULE_DEPENDENCIES 裡的每個 Mod 是否存在、沒有被停用，也沒有循環依賴。第三，setup 是否是 async，並且每個 Cog 都能正常建立。第四，用 $mod list、$bot health 或日誌查看 Loader 記下的錯誤。

不要為了讓它「先跑起來」而把依賴檢查或例外吞掉。Loader 會依依賴順序載入 Module，也會把失敗狀態留下來；讓錯誤停在正確的地方，之後才找得到原因。
