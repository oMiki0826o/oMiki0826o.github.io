import type {Note} from './types';
import {loadMarkdownNote} from './notes-loader';
import {aboutMeMeta} from './notes/about-me/meta';

const allNotes: Note[] = [
  {
    slug: 'discord-bot-from-zero',
    title: {'zh-TW': 'Firefly Bot 是怎麼長出來的', en: 'How Firefly Bot grew', ja: 'Firefly Botができるまで'},
    excerpt: {
      'zh-TW': '從「想做個能播歌的東西」開始，最後一路長成塞滿功能、也得慢慢收拾的 Discord Bot。',
      en: 'It started as a music Bot, grew feature by feature, then became something that needed a proper cleanup.',
      ja: '音楽を流せるBotから始まり、機能を足すうちに、ちゃんと片付ける必要が出てきた記録。'
    },
    date: '2025-08-10',
    category: 'Discord',
    sections: [
      {
        heading: {'zh-TW': '起點其實很普通', en: 'Starting with an idea', ja: 'ひとつのアイデアから'},
        paragraphs: {
          'zh-TW': ['最早只是想做一隻能放歌、能少打一點指令的 Bot。後來看到什麼麻煩就想塞什麼進去：管理、查資料、Minecraft 相關的小工具，然後它就越來越不像一開始那隻了。'],
          en: ['At first I only wanted a Bot that could play music and save me from typing the same commands. Then every small annoyance became a reason to add something: moderation, lookups, Minecraft tools. It slowly stopped resembling the Bot I started with.'],
          ja: ['最初は音楽を流せて、同じコマンドを少し減らせるBotが欲しかっただけでした。その後は面倒なことを見るたびに機能を足しました。管理、検索、Minecraftまわりの小さな道具。気付けば最初のBotとはだいぶ違うものになっていました。']
        }
      },
      {
        heading: {'zh-TW': '功能長太快，才知道要整理', en: 'Building while learning', ja: '作りながら整える'},
        paragraphs: {
          'zh-TW': ['一開始當然是想到就寫，能動就先爽。等功能彼此開始牽線、改一個地方另一邊壞掉，才被迫學著拆模組、留設定、把錯誤講清楚。Firefly Bot 還在收拾，但至少現在比較知道自己在收拾什麼。'],
          en: ['At first I wrote whatever came to mind because making it work was enough. When features started pulling on one another and fixing one place broke another, I had to learn modules, settings, and useful errors. Firefly Bot is still being tidied up, but at least I now know what I am tidying.'],
          ja: ['最初は思い付いたら書いて、動けばそれで満足でした。機能どうしがつながり、片方を直すと別の場所が壊れ始めてから、モジュール分け、設定、分かるエラーの必要を覚えました。Firefly Botはまだ片付け中ですが、少なくとも今は何を片付けているのか分かります。']
        }
      }
    ]
  },
  {
    slug: 'about-me',
    title: {'zh-TW': '這個網站不是履歷表', en: 'A little about me', ja: '私について少し'},
    excerpt: {
      'zh-TW': '放一些做過的東西、踩過的坑，還有不想讓它們直接消失的小紀錄。',
      en: 'A place for things I made, holes I fell into, and notes I did not want to vanish completely.',
      ja: '作ったもの、踏んだ穴、そしてそのまま消えてほしくない小さな記録を置く場所。'
    },
    date: '2025-07-25',
    category: 'About',
    sections: [
      {
        heading: {'zh-TW': '不是用來裝專業的', en: 'Making things I can use', ja: '実際に使うものを作る'},
        paragraphs: {
          'zh-TW': ['這裡沒有要假裝自己是什麼全端大神。Bot、Minecraft 工具、網站和一些不知道以後還會不會碰的東西，都只是剛好做過，或是還沒放棄。'],
          en: ['I am not here to pretend I am some full-stack genius. Bots, Minecraft tools, this site, and things I may or may not touch again are simply things I made, or have not given up on yet.'],
          ja: ['ここで全能なフルスタックの人のふりをするつもりはありません。Bot、Minecraftの道具、このサイト、そして今後触るか分からないもの。作ったか、まだ諦めていないものを置いているだけです。']
        }
      },
      {
        heading: {'zh-TW': '不想讓做過的東西直接蒸發', en: 'Keeping the process', ja: '過程を残す'},
        paragraphs: {
          'zh-TW': ['有些東西做完就忘了，有些會被新版蓋掉。這個網站就是留個地方，把還看得下去的作品、文章和一路上的一坨堆在一起。哪天回來看，大概會覺得以前的自己很吵，但至少還找得到。'],
          en: ['Some things disappear from memory once they are finished; some get buried by a newer version. This site is a place to pile up the work, writing, and small messes I can still stand to look at. One day I will probably find my past self loud, but at least I will still be able to find them.'],
          ja: ['作り終えた途端に忘れるものもあれば、新しい版に上書きされるものもあります。このサイトは、まだ見ていられる作品や文章や道中のごちゃごちゃを積んでおく場所です。いつか昔の自分をうるさいと思うかもしれませんが、少なくとも見つけられます。']
        }
      }
    ]
  },
  {
    slug: 'discord-bot-usage-guide',
    title: {'zh-TW': 'Discord Bot 使用教學', en: 'Discord Bot usage guide', ja: 'Discord Bot 利用ガイド'},
    excerpt: {
      'zh-TW': '從邀請 Bot、確認連線到第一批常用指令；給伺服器成員與管理者的簡短開始說明。',
      en: 'A short start-up guide for server members and administrators: invite the Bot, verify the connection, and try the first useful commands.',
      ja: 'Botの招待、接続確認、最初に使うコマンドまで。サーバーメンバーと管理者のための短いスタートガイド。'
    },
    date: '2026-10-07',
    category: 'Discord',
    sections: [
      {
        heading: {'zh-TW': '開始前：邀請與權限', en: 'Before you start: invite and permissions', ja: 'はじめる前に：招待と権限'},
        paragraphs: {
          'zh-TW': ['先在 Discord Developer Portal 依實際啟用的模組開啟需要的 Privileged Gateway Intents。邀請 Bot 時至少要包含 bot 與 applications.commands 兩個 scope，否則 Slash Command 不會正常出現。'],
          en: ['In the Discord Developer Portal, enable the Privileged Gateway Intents required by the modules you use. When inviting the Bot, include at least the bot and applications.commands scopes so Slash Commands can appear.'],
          ja: ['Discord Developer Portalで、利用するモジュールに必要なPrivileged Gateway Intentsを有効にします。Botの招待には少なくともbotとapplications.commandsのscopeを含めてください。そうしないとSlash Commandが表示されません。']
        }
      },
      {
        heading: {'zh-TW': '先確認 Bot 是否正常在線', en: 'First, check that the Bot is online', ja: 'まずBotが正常に動いているか確認する'},
        paragraphs: {
          'zh-TW': ['Bot 啟動後，先使用 /help、/ping 和 /botinfo。/help 會依目前真正載入的模組列出可用的 Slash Command；不同伺服器啟用的功能不一樣，所以它是最可靠的入口。'],
          en: ['Once the Bot is running, start with /help, /ping, and /botinfo. /help lists the Slash Commands from the modules that are actually loaded, making it the most reliable entry point when servers enable different features.'],
          ja: ['Botを起動したら、まず/help、/ping、/botinfoを使います。/helpには実際に読み込まれているモジュールのSlash Commandが表示されるため、サーバーごとに有効な機能が異なる場合でも最も確実な入口になります。']
        }
      },
      {
        heading: {'zh-TW': '從一般功能開始', en: 'Start with everyday features', ja: '普段使いの機能から始める'},
        paragraphs: {
          'zh-TW': ['一般成員可先從 /help 找到可用功能。依模組設定，Bot 可能提供音樂播放、社群身分組、Ticket、訊息工具、文件轉換與 AI 對話。AI 功能需要另外啟用，沒有設定時不必強行使用。'],
          en: ['Members can begin with /help to see what is available. Depending on the enabled modules, the Bot may offer music playback, self-roles, tickets, messaging tools, document conversion, and AI chat. AI is optional, so there is no need to use it when it has not been configured.'],
          ja: ['一般メンバーは/helpから使える機能を確認できます。有効なモジュールによって、音楽再生、セルフロール、Ticket、メッセージ機能、ドキュメント変換、AI会話などが利用できます。AIは任意機能なので、設定されていない場合に無理に使う必要はありません。']
        }
      },
      {
        heading: {'zh-TW': '管理者與 Owner 的維運指令', en: 'Operations commands for administrators and the owner', ja: '管理者・Owner向けの運用コマンド'},
        paragraphs: {
          'zh-TW': ['模組狀態、設定與 Bot 健康狀態屬於維運工作，應由 Owner 使用設定檔中的 Prefix 指令處理；預設 Prefix 是 $。可先用 $help、$bot status、$bot health、$mod list 與 $settings status 檢查，不要把 Token 或 Gemini API Key 貼到 Discord、截圖或公開文章。'],
          en: ['Module status, settings, and Bot health are operational tasks handled by the owner through the configured Prefix commands; the default prefix is $. Start with $help, $bot status, $bot health, $mod list, and $settings status. Never post the Bot token or Gemini API key in Discord, screenshots, or public writing.'],
          ja: ['モジュールの状態、設定、Botの健全性は運用作業です。Ownerが設定済みのPrefixコマンドで扱い、初期値は$です。まず$help、$bot status、$bot health、$mod list、$settings statusを確認してください。Bot TokenやGemini API KeyはDiscord、スクリーンショット、公開記事に絶対に載せません。']
        }
      }
    ]
  },
  {
    slug: 'discord-bot-mod-guide',
    title: {'zh-TW': 'Discord Bot Mod 撰寫教學', en: 'Writing a Discord Bot Module', ja: 'Discord Bot Mod の書き方'},
    excerpt: {
      'zh-TW': '從建立資料夾、寫 extension.py、拆 Cog，到實際載入檢查；以目前 Bot 的模組載入方式為準。',
      en: 'Create the folder, write extension.py, split Cogs, then verify loading — following the current Bot module loader.',
      ja: 'フォルダ作成、extension.py、Cogの分割、実際の読み込み確認まで。現在のBotのモジュールローダーに沿った手順です。'
    },
    date: '2026-10-07',
    category: 'Discord',
    sections: [
      {
        heading: {'zh-TW': '先理解它怎麼被找到', en: 'Understand how a Module is discovered', ja: 'Moduleが見つかる仕組みを知る'},
        paragraphs: {
          'zh-TW': ['這個 Bot 會掃描 bot/mod/ 底下的資料夾。資料夾名稱必須是合法的 Python 識別字，而且裡面一定要有 extension.py；符合這兩個條件，Loader 才會把它當成可載入的 Mod。', '例如要做提醒功能，可以先建立 bot/mod/reminder/。不要把功能直接塞進 Core，也不要用一個巨大的檔案同時放指令、設定、資料庫和商業邏輯。'],
          en: ['The Bot scans folders under bot/mod/. A folder must have a valid Python identifier as its name and contain extension.py before the loader treats it as a loadable Module.', 'For example, a reminder feature can begin in bot/mod/reminder/. Do not put feature code into Core, and do not turn one large file into commands, settings, storage, and business logic all at once.'],
          ja: ['Botはbot/mod/配下のフォルダを走査します。フォルダ名は有効なPython識別子で、extension.pyを含んでいる必要があります。この2つを満たすとLoaderが読み込み可能なModuleとして扱います。', 'たとえばリマインダー機能ならbot/mod/reminder/から始めます。機能をCoreへ直接入れたり、コマンド・設定・データベース・処理を1つの巨大なファイルへ詰め込んだりしないでください。']
        }
      },
      {
        heading: {'zh-TW': 'extension.py 只做組裝', en: 'Keep extension.py focused on assembly', ja: 'extension.pyは組み立てに専念させる'},
        paragraphs: {
          'zh-TW': ['extension.py 是 Mod 的入口。放 MODULE_VERSION、MODULE_DISPLAY_NAME、MODULE_DEPENDENCIES 三個中繼資料，並提供 async setup(bot)。Loader 會讀這些中繼資料來決定名稱、版本與依賴順序，再由 setup 把 Cog 註冊進 Bot。', '可以參考 basic Mod：extension.py 匯入 PingCog、BotInfoCog、HelpCog，然後逐一 await bot.add_cog(...)。這個檔案應該看起來像目錄，不是功能實作本體。'],
          en: ['extension.py is a Module entry point. Keep MODULE_VERSION, MODULE_DISPLAY_NAME, and MODULE_DEPENDENCIES there, then provide async setup(bot). The loader reads this metadata for the name, version, and dependency order; setup registers the Cogs with the Bot.', 'The basic Module is the clearest reference: extension.py imports PingCog, BotInfoCog, and HelpCog, then awaits bot.add_cog(...) for each. Treat this file as an assembly list, not as the feature implementation itself.'],
          ja: ['extension.pyはModuleの入口です。ここにはMODULE_VERSION、MODULE_DISPLAY_NAME、MODULE_DEPENDENCIESを置き、async setup(bot)を用意します。Loaderはこの情報を読み、名前・バージョン・依存関係の順序を決め、setupがCogをBotへ登録します。', 'basic Moduleが分かりやすい例です。extension.pyでPingCog、BotInfoCog、HelpCogを読み込み、それぞれをawait bot.add_cog(...)で登録しています。このファイルは機能本体ではなく、組み立て表として保ちます。']
        }
      },
      {
        heading: {'zh-TW': '一個入口、一個 Cog', en: 'One entry point, one Cog', ja: '入口ごとにCogを分ける'},
        paragraphs: {
          'zh-TW': ['Slash Command 可以放在獨立的 Cog。像 PingCog 只負責 /ping，建構子接收 bot，指令方法用 @app_commands.command 宣告，再從 interaction.response.send_message 回應。先讓第一個指令只做一件事，確認能載入後再加資料庫、設定或背景工作。', '若功能需要設定，可以像 dm Mod 一樣在 setup 中註冊 settings，再把整理過的設定物件交給 Cog 或 Service。指令處理 Discord 互動，Service 處理功能邏輯，這樣之後要改其中一邊不會整個 Mod 一起倒。'],
          en: ['Put each Slash Command surface in a focused Cog. PingCog, for example, only owns /ping: it receives bot in its constructor, declares the command with @app_commands.command, and replies through interaction.response.send_message. Make the first command do one thing, confirm it loads, then add storage, settings, or background work.', 'When a feature needs settings, follow the dm Module: register settings in setup, then pass a prepared settings object to the Cog or Service. Commands handle Discord interaction while Services handle feature logic, so changing one side does not bring down the whole Module.'],
          ja: ['Slash Commandは役割を絞ったCogに置きます。たとえばPingCogは/pingだけを担当し、コンストラクタでbotを受け取り、@app_commands.commandでコマンドを宣言し、interaction.response.send_messageで返答します。最初のコマンドは1つのことだけを行わせ、読み込みを確認してから保存・設定・バックグラウンド処理を足します。', '設定が必要な機能ではdm Moduleのようにsetupでsettingsを登録し、整えた設定オブジェクトをCogまたはServiceへ渡します。CommandはDiscordとのやり取り、Serviceは機能ロジックを担当するので、片方を変えてもModule全体が壊れにくくなります。']
        }
      },
      {
        heading: {'zh-TW': '載入失敗時先看這四件事', en: 'Four checks when loading fails', ja: '読み込みに失敗したときの4つの確認'},
        paragraphs: {
          'zh-TW': ['第一，資料夾是否真的在 bot/mod/ 下，而且有 extension.py。第二，MODULE_DEPENDENCIES 裡的每個 Mod 是否存在、沒有被停用，也沒有循環依賴。第三，setup 是否是 async，並且每個 Cog 都能正常建立。第四，用 $mod list、$bot health 或日誌查看 Loader 記下的錯誤。', '不要為了讓它「先跑起來」而把依賴檢查或例外吞掉。Loader 會依依賴順序載入 Module，也會把失敗狀態留下來；讓錯誤停在正確的地方，之後才找得到原因。'],
          en: ['First, make sure the folder really sits under bot/mod/ and contains extension.py. Second, every Module named in MODULE_DEPENDENCIES must exist, remain enabled, and avoid dependency cycles. Third, setup must be async and every Cog must construct correctly. Fourth, use $mod list, $bot health, or the logs to read the error recorded by the loader.', 'Do not hide dependency checks or swallow exceptions just to make the Bot “start somehow.” The loader respects dependency order and records failures; let the error stop in the right place so it can be diagnosed later.'],
          ja: ['1つ目はフォルダが本当にbot/mod/配下にあり、extension.pyを含むこと。2つ目はMODULE_DEPENDENCIESに書いたすべてのModuleが存在し、無効化されておらず、循環依存がないこと。3つ目はsetupがasyncで、各Cogが正常に生成できること。4つ目は$mod list、$bot health、またはログでLoaderが記録したエラーを確認することです。', '「とりあえず起動させる」ために依存関係の検査を外したり、例外を握りつぶしたりしないでください。Loaderは依存関係の順番を守り、失敗状態も残します。原因を後から追えるよう、エラーは正しい場所で止めます。']
        }
      }
    ]
  },
  {
    slug: 'seasonal-night-sky-guide',
    title: {'zh-TW': '夜空入門：從北極星開始認星', en: 'A beginner’s night sky: start with Polaris', ja: '夜空入門：北極星から星を探す'},
    excerpt: {
      'zh-TW': '不靠背整張星圖，先抓住幾個明顯的形狀，再慢慢認識四季的亮星與深空天體。',
      en: 'You do not need to memorize the whole sky. Start with a few obvious shapes, then learn the bright stars and deep-sky objects of each season.',
      ja: '星図を丸ごと覚える必要はありません。目立つ形をいくつか見つけ、季節ごとの明るい星や深宇宙天体へ進みます。'
    },
    date: '2026-10-07',
    category: 'Astronomy',
    sections: [
      {
        heading: {'zh-TW': '先讓眼睛適應黑暗', en: 'Let your eyes adjust first', ja: 'まず目を暗さに慣らす'},
        paragraphs: {
          'zh-TW': ['到戶外後先別急著抬頭找目標。避開直射燈光，給眼睛十幾分鐘適應；手機亮度調低或開紅光模式，星點會比一直滑地圖更容易出現。', '剛開始不必追最暗的小星。先找出最亮、最有形狀的星群，確認方向後再用 Stellarium 或 Star Walk 2 對照。App 是輔助，不是取代抬頭看天空。'],
          en: ['Do not rush to find targets the moment you arrive. Stay away from direct lights and give your eyes around fifteen minutes to adapt. Lower your phone brightness or use a red-light mode.', 'You do not need to chase faint stars at first. Find the brightest, most recognizable pattern, establish your direction, then check it with Stellarium or Star Walk 2. An app should support looking up, not replace it.'],
          ja: ['外に出たらすぐに目標を探さず、まず直射光を避けて10数分ほど目を暗さに慣らします。スマートフォンは明るさを下げるか、赤色表示にすると星が見えやすくなります。', '最初から暗い星を追う必要はありません。明るく形の分かりやすい星の並びを見つけ、方角を確かめてからStellariumやStar Walk 2で照合します。アプリは空を見上げるための補助です。']
        }
      },
      {
        heading: {'zh-TW': '北極星是北方的基準', en: 'Polaris is a northward reference', ja: '北極星は北の基準'},
        paragraphs: {
          'zh-TW': ['北極星位在小熊座，靠近北天極，所以整晚看起來幾乎不動。它不是全天最亮的星，卻很適合拿來判斷正北方，也能作為整片北天的起點。', '春夏常從北斗七星開始：把斗口兩顆星連線，向外延長約五倍距離，就能找到北極星。秋冬則可先找 W 形的仙后座，再往相對方向尋找。'],
          en: ['Polaris belongs to Ursa Minor and sits close to the north celestial pole, so it appears nearly fixed through the night. It is not the brightest star, but it is a useful reference for true north and the northern sky.', 'In spring and summer, begin with the Big Dipper. Extend the line through the two stars at the bowl’s outer edge by roughly five times their separation. In autumn and winter, the W of Cassiopeia offers another starting point.'],
          ja: ['北極星はこぐま座にあり、北天の極に近いため一晩を通してほとんど動かないように見えます。全天で最も明るい星ではありませんが、北の方角と北の空を知る基準になります。', '春と夏は北斗七星から始めます。ひしゃくの外側にある2つの星を結ぶ線を、およそ5倍延ばすと北極星に届きます。秋と冬はW字のカシオペヤ座も手がかりになります。']
        }
      },
      {
        heading: {'zh-TW': '每一季先記一組亮星', en: 'Learn one bright pattern per season', ja: '季節ごとに明るい星の組を覚える'},
        paragraphs: {
          'zh-TW': ['春天可以找大角星、角宿一與五帝座一組成的春季大三角。夏天最容易的是夏季大三角：織女星、牛郎星與天津四，三顆都亮，也靠近銀河。', '秋天先認仙后座、飛馬座大四邊形，再延伸到仙女座；冬天則是獵戶座腰帶三星、天狼星與南河三。把這些當作地標，其他星座會慢慢有位置。'],
          en: ['For spring, look for the Spring Triangle of Arcturus, Spica, and Regulus. Summer’s easiest pattern is the Summer Triangle: Vega, Altair, and Deneb. All three are bright and lie near the Milky Way.', 'In autumn, recognize Cassiopeia and the Great Square of Pegasus before moving toward Andromeda. Winter begins with Orion’s Belt, Sirius, and Procyon. Treat these as landmarks and the rest of the sky starts to gain a place.'],
          ja: ['春はアークトゥルス、スピカ、レグルスの春の大三角を探します。夏はベガ、アルタイル、デネブによる夏の大三角が分かりやすく、3つとも明るく天の川の近くにあります。', '秋はカシオペヤ座とペガスス座の大四辺形を見つけてからアンドロメダ座へ進みます。冬はオリオン座の三つ星、シリウス、プロキオンから始めます。これらを地標にすると、ほかの星座も位置をつかみやすくなります。']
        }
      },
      {
        heading: {'zh-TW': '星座旁邊還有深空天體', en: 'Constellations also lead to deep-sky objects', ja: '星座のそばには深宇宙天体もある'},
        paragraphs: {
          'zh-TW': ['仙女座附近的 M31 是肉眼在夠暗的天空下有機會看到的星系，像一小塊模糊的雲。獵戶座腰帶下方的 M42 則是冬季最容易入門的星雲之一。', '金牛座方向有昴宿星團 M45，像一團細小的藍白色星點。雙筒望遠鏡比高倍率天文望遠鏡更適合第一次找這些目標，視野大，也比較不容易迷路。'],
          en: ['M31 near Andromeda is a galaxy that can appear as a small hazy patch to the unaided eye under a dark sky. M42 below Orion’s Belt is one of the most approachable nebulae in winter.', 'Taurus holds the Pleiades, M45, a compact cluster of fine blue-white stars. Binoculars are often friendlier than a high-power telescope for a first attempt: the field is wider and it is easier to stay oriented.'],
          ja: ['アンドロメダ座の近くにあるM31は、十分に暗い空なら肉眼で小さな雲のように見えることがある銀河です。オリオン座の三つ星の下にあるM42は、冬に見つけやすい星雲のひとつです。', 'おうし座の方向には、青白い小さな星が集まったプレアデス星団M45があります。初めて探すときは高倍率の望遠鏡より双眼鏡の方が向いています。視野が広く、位置を見失いにくいためです。']
        }
      },
      {
        heading: {'zh-TW': '把一次觀測留成自己的星圖', en: 'Turn one observation into your own sky map', ja: '一度の観測を自分の星図にする'},
        paragraphs: {
          'zh-TW': ['每次只訂一個小目標，例如「找到北極星」或「認出夏季大三角」。記下日期、地點、天氣和看到的東西，下一次回到同一片天空時會很有感。', '雲、月光和光害都會改變能看到多少星。看不到並不代表找錯，先確認月相與透明度，換一個晚上再試就好。觀星不是考試，是慢慢熟悉同一片天空。'],
          en: ['Give each session one small goal, such as finding Polaris or recognizing the Summer Triangle. Note the date, place, weather, and what you saw. Returning to the same sky becomes much more rewarding.', 'Cloud, moonlight, and light pollution all change what is visible. Missing a target does not mean you did it wrong. Check the moon phase and transparency, then try on another night. Stargazing is a gradual familiarity, not a test.'],
          ja: ['観測ごとに「北極星を見つける」「夏の大三角を見分ける」のような小さな目標を1つだけ決めます。日付、場所、天気、見えたものを残すと、次に同じ空を見るときの手がかりになります。', '雲、月明かり、光害によって見える星の数は変わります。見つからなかったからといって間違いではありません。月齢と空の透明度を確かめ、別の夜に試してください。星を見ることは試験ではなく、同じ空に少しずつ慣れることです。']
        }
      }
    ]
  },
  {
    slug: 'spacetime-and-gravitational-waves',
    title: {'zh-TW': '從幾何到重力波：時空的入門筆記', en: 'From geometry to gravitational waves: an introduction to spacetime', ja: '幾何から重力波へ：時空の入門ノート'},
    excerpt: {
      'zh-TW': '從平行線、參考系到時空彎曲，整理相對論為什麼改變了我們理解重力的方式。',
      en: 'From parallel lines and reference frames to curved spacetime, a compact path through how relativity changed our picture of gravity.',
      ja: '平行線、基準系、時空の曲がり方から、相対論が重力の理解をどう変えたかをたどる短い入門です。'
    },
    date: '2026-10-07',
    category: 'Astronomy',
    sections: [
      {
        heading: {'zh-TW': '幾何不只存在於平面', en: 'Geometry is not limited to a plane', ja: '幾何は平面だけのものではない'},
        paragraphs: {
          'zh-TW': ['在紙上畫三角形，內角和是 180 度；但在球面上沿著大圓走出三角形，內角和可以大於 180 度。這不是作圖錯誤，而是空間本身的幾何不同。', '球面上兩點間的最短路徑叫測地線。飛機航線在地圖上看起來彎彎的，實際上可能更接近球面上的最短路徑。這個想法後來成了理解彎曲時空的重要語言。'],
          en: ['A triangle on paper has angles adding to 180 degrees. A triangle traced along great circles on a sphere can add to more than 180 degrees. Nothing went wrong with the drawing; the geometry of the surface is different.', 'The shortest path between two points on a curved surface is a geodesic. A flight path can look curved on a map while still following a near-shortest route on Earth. This idea later became essential for describing curved spacetime.'],
          ja: ['紙の上の三角形の内角和は180度です。しかし球面の大円に沿って作った三角形では、180度を超えることがあります。図が間違っているのではなく、空間の幾何そのものが異なるためです。', '曲面上の2点を結ぶ最短経路を測地線と呼びます。飛行機の航路は地図上で曲がって見えても、地球上では最短に近い道筋であることがあります。この考え方が、後に曲がった時空を表す言葉になりました。']
        }
      },
      {
        heading: {'zh-TW': '牛頓的舞台與參考系', en: 'Newton’s stage and reference frames', ja: 'ニュートンの舞台と基準系'},
        paragraphs: {
          'zh-TW': ['牛頓力學把空間和時間想成固定舞台：物體在上面運動，舞台本身不受影響。在穩定等速運動的車廂裡做實驗，也無法只靠車內現象判斷自己是否正在等速前進。', '這件事叫相對性原理的一部分。速度一定要相對某個參考物來說；沒有窗外、沒有其他物體，就沒有一個實驗能替你找出「絕對靜止」。'],
          en: ['Newtonian mechanics treats space and time as a fixed stage where objects move without changing the stage itself. Inside a train moving smoothly at constant velocity, an experiment cannot tell you that the carriage is moving at all.', 'That is part of the principle of relativity. Velocity always refers to something else. Without an outside view or another object, no experiment inside can reveal an “absolute rest.”'],
          ja: ['ニュートン力学では、空間と時間を固定された舞台のように考えます。物体はその上を動きますが、舞台そのものは影響を受けません。一定の速さで滑らかに動く列車の中では、車内の実験だけで列車の運動を見抜くことはできません。', 'これは相対性原理の一部です。速度は必ず何かに対して定義されます。外の景色や別の物体がなければ、車内の実験だけで「絶対的な静止」を見つけることはできません。']
        }
      },
      {
        heading: {'zh-TW': '光速讓時間與空間一起改寫', en: 'Light speed rewrites space and time together', ja: '光速は空間と時間を一緒に書き換える'},
        paragraphs: {
          'zh-TW': ['電磁學指出真空中的光速是固定常數，這和日常的速度相加直覺衝突。狹義相對論保留光速不變，代價是不同觀察者對時間間隔、長度和同時性的判斷不必一致。', '時間膨脹與長度收縮不是視覺錯覺，而是不同慣性參考系比較測量結果時的關係。日常速度下效果極小，接近光速時才變得明顯。'],
          en: ['Electromagnetism identifies the speed of light in vacuum as a fixed constant, which conflicts with everyday velocity addition. Special relativity keeps light speed invariant, so observers need not agree on time intervals, lengths, or simultaneity.', 'Time dilation and length contraction are not visual tricks. They describe how measurements relate between inertial frames. At everyday speeds the effect is tiny; near light speed it becomes significant.'],
          ja: ['電磁気学では、真空中の光速は一定の定数です。これは日常的な速度の足し算の直感と衝突します。特殊相対論は光速不変を保ち、その代わり観測者ごとに時間間隔、長さ、同時性の判断が一致しないことを受け入れます。', '時間の遅れと長さの収縮は見かけの錯覚ではありません。慣性系どうしの測定がどう関係するかを表します。日常の速さでは効果は小さく、光速に近づくと目立ちます。']
        }
      },
      {
        heading: {'zh-TW': '重力可以看成時空的彎曲', en: 'Gravity can be described as curved spacetime', ja: '重力は時空の曲がりとして記述できる'},
        paragraphs: {
          'zh-TW': ['廣義相對論把重力重新描述為時空幾何。物質和能量改變周圍的時空結構，物體則沿著那個結構中的測地線運動。行星繞太陽，不必再只想成一條看不見的拉力。', '常見的彈簧床比喻可以幫忙想像彎曲，但它有極限：床墊靠重力往下凹，真正的時空彎曲不需要另一個方向的重力。比喻可以用，別把它當成完整模型。'],
          en: ['General relativity describes gravity through spacetime geometry. Matter and energy change the surrounding structure of spacetime, and objects follow geodesics within that structure. A planet orbiting the Sun need not be pictured only as a pull through empty space.', 'The rubber-sheet image can help visualize curvature, but it has limits: a sheet sags because of gravity in another direction, while real spacetime curvature does not require that extra gravity. Use the picture as a hint, not a full model.'],
          ja: ['一般相対論では、重力を時空の幾何として記述します。物質とエネルギーが周囲の時空の構造を変え、物体はその構造の中の測地線を進みます。惑星の公転を、空っぽの空間を通じた見えない引力だけとして考える必要はありません。', 'ゴムシートのたとえは曲がり方を考える助けになりますが、限界もあります。シートがたわむのは別の向きの重力があるからで、実際の時空の曲率に別の重力は要りません。完全な模型ではなく、手がかりとして使います。']
        }
      },
      {
        heading: {'zh-TW': '重力波讓我們用另一種方式觀測宇宙', en: 'Gravitational waves offer another way to observe the universe', ja: '重力波は宇宙を見る別の窓になる'},
        paragraphs: {
          'zh-TW': ['當極端天體系統快速改變，例如兩個黑洞或中子星互相繞轉並合併，時空的擾動會以重力波向外傳播。它們抵達地球時的變化非常小，因此偵測工作極其困難。', '光會被塵埃吸收或遮擋，重力波和物質的交互作用極弱，可以帶來另一種訊息。把重力波、電磁波與其他觀測放在一起，就是多信使天文學的重要方向。'],
          en: ['When an extreme system changes rapidly, such as two black holes or neutron stars spiraling together, disturbances in spacetime propagate outward as gravitational waves. By the time they reach Earth, the change is extraordinarily small and difficult to detect.', 'Light can be absorbed or blocked by dust. Gravitational waves interact only weakly with matter and carry a different kind of information. Combining them with electromagnetic and other observations is a central part of multi-messenger astronomy.'],
          ja: ['2つのブラックホールや中性子星が互いの周りを回りながら合体するような極端な系では、時空の乱れが重力波として外へ伝わります。地球に届くころの変化は非常に小さく、検出は簡単ではありません。', '光は塵に吸収されたり遮られたりします。重力波は物質との相互作用がとても弱く、別の種類の情報を運びます。重力波、電磁波、ほかの観測を組み合わせることが、多信使天文学の大切な方向です。']
        }
      }
    ]
  },
  {
    slug: 'ultrasonic-call-study-notes',
    title: {'zh-TW': '幼鼠超音波叫聲研究紀錄與發表', en: 'Pup ultrasonic calls: research record and presentation', ja: '幼獣の超音波発声：研究記録と発表'},
    excerpt: {
      'zh-TW': '從掠食者氣味實驗、聲譜判讀到目前分析結果，記錄高山田鼠幼鼠如何以超音波回應環境訊號。',
      en: 'From predator-odor trials and spectrogram scoring to the current analysis, a record of how vole pups use ultrasonic calls in response to environmental signals.',
      ja: '捕食者のにおいを用いた実験、スペクトログラムの判読、現在の解析結果から、高山のハタネズミの幼獣が環境の手がかりに超音波でどう応答するかを記録します。'
    },
    date: '2026-10-07',
    category: 'Biology',
    sections: [
      {
        heading: {'zh-TW': '研究問題：威脅會改變呼叫嗎？', en: 'Research question: does threat change calling?', ja: '研究課題：脅威は発声を変えるか'},
        paragraphs: {
          'zh-TW': ['高山田鼠是臺灣高山環境中的特有齧齒類，幼體會發出人耳通常聽不到的超音波叫聲。這份研究想問的是：當幼鼠聞到掠食者相關氣味時，牠們會不會用不同的方式呼叫親代？', '研究將叫聲拆成三個面向比較：叫了幾次、頻率是否改變，以及不同叫聲類型的比例是否不同。比起只聽起來像不像求救，這些可量測的項目才能讓假說被檢驗。'],
          en: ['The Taiwan vole is an endemic rodent of Taiwan’s high mountain environments. Its pups produce ultrasonic calls that people usually cannot hear. This study asks whether pups change how they call to parents when they detect predator-related odor.', 'The study compares three features: number of calls, frequency, and the proportion of call types. These measurable features make the question testable rather than relying on whether a sound merely seems like a distress call.'],
          ja: ['タイワンハタネズミは、台湾の高山環境に固有のげっ歯類です。幼獣は人には聞こえにくい超音波の声を出します。この研究は、捕食者に関係するにおいを感じた幼獣が、親へ向けた呼び方を変えるかを問います。', '比べたのは、声の数、周波数、声の種類の割合の3点です。求助の声らしく聞こえるかだけでなく、測定できる項目に分けることで検証できる問いになります。']
        }
      },
      {
        heading: {'zh-TW': '實驗紀錄：兩種氣味條件', en: 'Experiment record: two odor conditions', ja: '実験記録：2つのにおい条件'},
        paragraphs: {
          'zh-TW': ['研究記錄共涵蓋 45 隻幼鼠、18 窩。在日齡第 4 與第 8 天的午後至傍晚，以相同的錄音空間、3 分鐘處理時間與固定溫度進行測試。', '一個條件使用掠食者相關氣味，另一個條件使用蒸餾水作為對照。除了氣味以外，容器、麥克風位置和操作流程盡量一致，才有辦法把觀察到的差異連回處理本身。'],
          en: ['The research record covers 45 pups from 18 litters. Tests took place in the afternoon to early evening on postnatal days 4 and 8, using the same recording space, a three-minute treatment period, and a controlled temperature.', 'One condition used predator-related odor while the control used distilled water. The enclosure, microphone position, and procedure were kept as consistent as possible so any observed difference could be tied back to the treatment.'],
          ja: ['研究記録には18腹から45匹の幼獣が含まれます。生後4日と8日の午後から夕方に、同じ録音空間、3分間の処理時間、一定の温度で実験しました。', '一方の条件では捕食者に関係するにおいを、対照では蒸留水を使いました。容器、マイクの位置、操作手順をできるだけそろえ、観察された差を処理に結び付けられるようにしました。']
        }
      },
      {
        heading: {'zh-TW': '從錄音到分類：讓聲音可以比較', en: 'From recording to classification', ja: '録音から分類へ：声を比べられる形にする'},
        paragraphs: {
          'zh-TW': ['錄音以超音波麥克風完成，再用聲譜圖判讀。資料先排除過短、來源不明或噪音，再依頻率走向分成 flat、upward、downward、chevron 與 complex 五類。', '判讀採單盲方式，並由多人交叉檢查。無法可靠辨識類型的訊號只計入總叫聲次數，不參加類型比例的統計，避免硬把不確定資料塞進某個答案。'],
          en: ['Recording used an ultrasonic microphone followed by spectrogram scoring. Signals that were too short, uncertain in origin, or noisy were excluded. The remaining calls were classified as flat, upward, downward, chevron, or complex by frequency trajectory.', 'Scoring used a single-blind approach with cross-checking by more than one reviewer. Signals that could not be reliably typed counted toward total calls but not toward type proportions, avoiding a forced answer for uncertain data.'],
          ja: ['録音は超音波マイクで行い、その後スペクトログラムで判読しました。短すぎる、発声者が不明、雑音が強い信号を除き、周波数の動きからflat、upward、downward、chevron、complexの5種類に分けました。', '判読は単盲検で行い、複数の人が照合しました。種類を確実に決められない信号は総発声数には含めますが、種類の割合の統計には入れません。不確かなデータに無理な答えを与えないためです。']
        }
      },
      {
        heading: {'zh-TW': '目前結果：叫聲結構出現差異', en: 'Current result: call structure differs', ja: '現在の結果：発声構造に差が見られた'},
        paragraphs: {
          'zh-TW': ['在日齡第 4 天、23 隻幼鼠的叫聲次數分析中，兩種氣味條件沒有顯著差異（p = 0.71）；對照組平均約 34 次，氣味組約 39 次。針對 chevron 類叫聲的頻率分析樣本較小（n = 4），同樣沒有顯著差異（p = 0.76）。', '不過在同樣較小的類型分析樣本中（n = 4），掠食者氣味與叫聲類型比例有顯著關聯（p = 0.049）：chevron 與 complex 等較複雜叫聲的比例較高。這是目前資料中的訊號，不等於最後定論。'],
          en: ['For call count in 23 pups on postnatal day 4, the two odor conditions did not differ significantly (p = 0.71): the control averaged about 34 calls and the odor condition about 39. The smaller frequency analysis of chevron calls (n = 4) also found no significant difference (p = 0.76).', 'In the similarly small type-analysis sample (n = 4), predator odor was significantly associated with the proportion of call types (p = 0.049), with a higher proportion of more complex chevron and complex calls. This is a signal in the current data, not a final conclusion.'],
          ja: ['生後4日の23匹を使った発声数の解析では、2つのにおい条件に有意な差はありませんでした（p = 0.71）。対照群は平均約34回、におい群は約39回でした。chevronの周波数を扱った小さな解析（n = 4）でも、有意な差はありませんでした（p = 0.76）。', '一方、同じく小さな種類別解析の標本（n = 4）では、捕食者のにおいと声の種類の割合に有意な関連がありました（p = 0.049）。chevronとcomplexのような、より複雑な声の割合が高くなりました。これは現在のデータにある手がかりであり、最終結論ではありません。']
        }
      },
      {
        heading: {'zh-TW': '發表時保留結果的邊界', en: 'Keeping the limits visible in a presentation', ja: '発表で結果の限界も残す'},
        paragraphs: {
          'zh-TW': ['目前類型與頻率的分析樣本只有 4 隻幼鼠，不能把結果說成物種已經確定的溝通規則。個體差異、發育階段與窩別效應都可能改變結果，需要擴大第 4 與第 8 天的樣本再確認。', '目前較合理的解讀是：幼鼠面對氣味威脅時，可能改變了叫聲結構，而不是單純增加叫聲數量。後續若能累積更多聲學資料，或許能成為理解環境壓力與保育行為的一個方向。'],
          en: ['The type and frequency analyses currently include only four pups, so they cannot establish a species-wide communication rule. Individual variation, development, and litter effects may all change the result; larger samples on days 4 and 8 are needed.', 'A more careful reading is that pups may change call structure under odor threat rather than simply calling more. With more acoustic records, this could become one direction for understanding environmental stress and conservation behavior.'],
          ja: ['種類と周波数の解析は現在4匹だけなので、種全体の確定したコミュニケーション規則とは言えません。個体差、発達段階、腹ごとの影響で結果は変わり得ます。生後4日と8日の標本を増やして確かめる必要があります。', '現時点では、においの脅威に対して幼獣が単に多く鳴くのではなく、声の構造を変えている可能性がある、と慎重に読むのが妥当です。音響記録を増やせば、環境ストレスと保全行動を理解する方向の一つになるかもしれません。']
        }
      }
    ]
  }
];

export const notes = [...allNotes.filter((note) => note.slug !== 'about-me'), loadMarkdownNote(aboutMeMeta)].sort((left, right) => Date.parse(right.date) - Date.parse(left.date));
export const featuredNote = notes.find((note) => note.slug === 'ultrasonic-call-study-notes') ?? notes[0];

export function getNote(slug: string) {
  return notes.find((note) => note.slug === slug);
}

export const pinnedNoteSlugs = [
  'discord-bot-usage-guide',
  'discord-bot-mod-guide',
  'seasonal-night-sky-guide'
] as const;

export const pinnedNotes = pinnedNoteSlugs.map((slug) => {
  const note = getNote(slug);
  if (!note) throw new Error(`Pinned note not found: ${slug}`);
  return note;
});
