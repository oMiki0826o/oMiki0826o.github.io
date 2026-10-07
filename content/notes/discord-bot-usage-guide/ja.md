## はじめる前に：招待と権限

Discord Developer Portalで、利用するモジュールに必要なPrivileged Gateway Intentsを有効にします。Botの招待には少なくともbotとapplications.commandsのscopeを含めてください。そうしないとSlash Commandが表示されません。

## まずBotが正常に動いているか確認する

Botを起動したら、まず/help、/ping、/botinfoを使います。/helpには実際に読み込まれているモジュールのSlash Commandが表示されるため、サーバーごとに有効な機能が異なる場合でも最も確実な入口になります。

## 普段使いの機能から始める

一般メンバーは/helpから使える機能を確認できます。有効なモジュールによって、音楽再生、セルフロール、Ticket、メッセージ機能、ドキュメント変換、AI会話などが利用できます。AIは任意機能なので、設定されていない場合に無理に使う必要はありません。

## 管理者・Owner向けの運用コマンド

モジュールの状態、設定、Botの健全性は運用作業です。Ownerが設定済みのPrefixコマンドで扱い、初期値は$です。まず$help、$bot status、$bot health、$mod list、$settings statusを確認してください。Bot TokenやGemini API KeyはDiscord、スクリーンショット、公開記事に絶対に載せません。
