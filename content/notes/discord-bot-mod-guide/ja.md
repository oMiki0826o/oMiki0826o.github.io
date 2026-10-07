## Moduleが見つかる仕組みを知る

Botはbot/mod/配下のフォルダを走査します。フォルダ名は有効なPython識別子で、extension.pyを含んでいる必要があります。この2つを満たすとLoaderが読み込み可能なModuleとして扱います。

たとえばリマインダー機能ならbot/mod/reminder/から始めます。機能をCoreへ直接入れたり、コマンド・設定・データベース・処理を1つの巨大なファイルへ詰め込んだりしないでください。

## extension.pyは組み立てに専念させる

extension.pyはModuleの入口です。ここにはMODULE_VERSION、MODULE_DISPLAY_NAME、MODULE_DEPENDENCIESを置き、async setup(bot)を用意します。Loaderはこの情報を読み、名前・バージョン・依存関係の順序を決め、setupがCogをBotへ登録します。

basic Moduleが分かりやすい例です。extension.pyでPingCog、BotInfoCog、HelpCogを読み込み、それぞれをawait bot.add_cog(...)で登録しています。このファイルは機能本体ではなく、組み立て表として保ちます。

## 入口ごとにCogを分ける

Slash Commandは役割を絞ったCogに置きます。たとえばPingCogは/pingだけを担当し、コンストラクタでbotを受け取り、@app_commands.commandでコマンドを宣言し、interaction.response.send_messageで返答します。最初のコマンドは1つのことだけを行わせ、読み込みを確認してから保存・設定・バックグラウンド処理を足します。

設定が必要な機能ではdm Moduleのようにsetupでsettingsを登録し、整えた設定オブジェクトをCogまたはServiceへ渡します。CommandはDiscordとのやり取り、Serviceは機能ロジックを担当するので、片方を変えてもModule全体が壊れにくくなります。

## 読み込みに失敗したときの4つの確認

1つ目はフォルダが本当にbot/mod/配下にあり、extension.pyを含むこと。2つ目はMODULE_DEPENDENCIESに書いたすべてのModuleが存在し、無効化されておらず、循環依存がないこと。3つ目はsetupがasyncで、各Cogが正常に生成できること。4つ目は$mod list、$bot health、またはログでLoaderが記録したエラーを確認することです。

「とりあえず起動させる」ために依存関係の検査を外したり、例外を握りつぶしたりしないでください。Loaderは依存関係の順番を守り、失敗状態も残します。原因を後から追えるよう、エラーは正しい場所で止めます。
