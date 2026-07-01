/**
 * js/player.js
 *
 * Modification():
 *
 * - Changed 音訊引擎由 HTML5 Audio 完全改為 YouTube IFrame API
 * - Added   自動播放支援：頁面載入後嘗試自動播放；
 *           若被瀏覽器阻擋（常見於首次造訪），顯示 .autoplay-hint 橫幅，
 *           等待使用者任意點擊後再開始播放
 * - Added   _startProgressTimer：改用 setInterval 輪詢取代
 *           audio 的 timeupdate 事件（YouTube API 無此事件）
 * - Removed HTML5 Audio 相關邏輯
 *
 * Description:
 *
 * 讀取 config/music.json 播放清單（type: "youtube"），
 * 透過 YouTube IFrame API 驅動隱藏的播放器元素純輸出音訊，
 * 提供播放/暫停、換曲、進度條 Seek、音量調整等功能。
 *
 * 播放器 DOM 結構（由 index.html 提供，data-player-* 對應）：
 *   [data-player-title]    歌曲名稱
 *   [data-player-artist]   演出者
 *   [data-player-progress] <input type="range"> 進度條
 *   [data-player-current]  當前時間
 *   [data-player-duration] 總時長
 *   [data-player-play]     播放/暫停按鈕
 *   [data-player-prev]     上一首按鈕
 *   [data-player-next]     下一首按鈕
 *   [data-player-volume]   <input type="range"> 音量
 */

class MusicPlayer {
  /**
   * @param {HTMLElement} root     播放器容器
   * @param {Array}       playlist music.json 讀取的歌曲物件陣列
   */
  constructor(root, playlist) {
    this.root       = root;
    this.playlist   = playlist;
    this.index      = 0;
    this.ytPlayer   = null;  // YouTube IFrame Player 實例，API 就緒後才賦值
    this.isReady    = false; // true 代表 YT Player 已完成初始化
    this.progressTimer = null; // setInterval ID，切換歌曲時需先清除

    // ── DOM 參考（一次性查詢，避免每次操作都重複 querySelector）──
    this.titleEl    = root.querySelector('[data-player-title]');
    this.artistEl   = root.querySelector('[data-player-artist]');
    this.progressEl = root.querySelector('[data-player-progress]');
    this.currentEl  = root.querySelector('[data-player-current]');
    this.durationEl = root.querySelector('[data-player-duration]');
    this.playBtn    = root.querySelector('[data-player-play]');
    this.prevBtn    = root.querySelector('[data-player-prev]');
    this.nextBtn    = root.querySelector('[data-player-next]');
    this.volumeEl   = root.querySelector('[data-player-volume]');

    this._bindButtons();
    this._loadYouTubeAPI();
  }

  // ── YouTube IFrame API 載入 ──────────────────────────────
  /**
   * 動態注入 YouTube IFrame API 腳本。
   * 若 API 已存在（例如同頁有其他播放器），直接呼叫 _createYTPlayer。
   * 全域 onYouTubeIframeAPIReady callback 以 chain 方式保留既有的值，
   * 避免多個播放器實例互相覆蓋。
   */
  _loadYouTubeAPI() {
    if (window.YT?.Player) {
      this._createYTPlayer();
      return;
    }

    if (!document.getElementById('yt-iframe-api')) {
      const s = document.createElement('script');
      s.id  = 'yt-iframe-api';
      s.src = 'https://www.youtube.com/iframe_api';
      document.head.appendChild(s);
    }

    const prev = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      if (typeof prev === 'function') prev();
      this._createYTPlayer();
    };
  }

  /**
   * 建立隱藏的 YouTube 播放器 DOM 容器並初始化 YT.Player。
   * 容器設為 position:fixed 1×1px，視覺上完全不可見，僅輸出音訊。
   */
  _createYTPlayer() {
    const container = document.createElement('div');
    container.id = 'yt-hidden-player';
    container.setAttribute('aria-hidden', 'true');
    container.style.cssText =
      'position:fixed;bottom:0;left:0;width:1px;height:1px;' +
      'overflow:hidden;opacity:0;pointer-events:none;';
    document.body.appendChild(container);

    const track = this.playlist[this.index];
    this.ytPlayer = new YT.Player('yt-hidden-player', {
      videoId: track.youtubeId,
      playerVars: {
        autoplay: 1,        // 嘗試自動播放；實際能否播放取決於瀏覽器政策
        controls: 0,        // 隱藏 YouTube 原生控制列
        disablekb: 1,       // 停用鍵盤快捷鍵，避免與頁面衝突
        iv_load_policy: 3,  // 關閉影片標註
        modestbranding: 1,  // 最小化 YouTube logo
        playsinline: 1,     // iOS 上不強制全螢幕
        rel: 0,             // 播放結束後不推薦其他影片
      },
      events: {
        onReady:       (e) => this._onReady(e),
        onStateChange: (e) => this._onStateChange(e),
      },
    });
  }

  // ── 播放器事件處理 ──────────────────────────────────────
  /**
   * YouTube Player 初始化完成後觸發。
   * 設定音量後等待 300ms 確認是否真的開始播放，
   * 若狀態仍非 PLAYING，代表被瀏覽器阻擋，則顯示提示橫幅。
   */
  _onReady(event) {
    this.isReady = true;
    const vol = this.volumeEl ? Number(this.volumeEl.value) : 70;
    event.target.setVolume(vol);
    this._updateTrackInfo();
    this._startProgressTimer();

    // 等 300ms 再檢查狀態，給 autoplay 請求足夠時間被處理
    setTimeout(() => {
      if (this.ytPlayer?.getPlayerState?.() !== YT.PlayerState.PLAYING) {
        this._showAutoplayHint();
      }
    }, 300);
  }

  /** 曲目播放完畢時自動跳下一首。 */
  _onStateChange(event) {
    if (event.data === YT.PlayerState.ENDED) {
      this.skip(1);
    }
    this.updatePlayIcon();
  }

  // ── 自動播放被阻擋時的提示 ───────────────────────────────
  /**
   * 在頁面底部顯示一條 .autoplay-hint 提示橫幅。
   * 使用者點擊頁面任意位置後開始播放並自動收起橫幅。
   * capture:true 確保點擊不會被子元素 stopPropagation 攔截。
   */
  _showAutoplayHint() {
    if (document.querySelector('.autoplay-hint')) return;

    const hint = document.createElement('div');
    hint.className = 'autoplay-hint';
    hint.innerHTML = '<i class="fa-solid fa-music"></i> 點擊任意位置播放音樂';
    document.body.appendChild(hint);

    const resume = () => {
      this.ytPlayer?.playVideo?.();
      hint.classList.add('is-hiding');
      setTimeout(() => hint.remove(), 400);
    };
    document.addEventListener('click', resume, { capture: true, once: true });
  }

  // ── 播放控制公開方法 ────────────────────────────────────
  togglePlay() {
    if (!this.isReady) return;
    const state = this.ytPlayer.getPlayerState();
    if (state === YT.PlayerState.PLAYING) {
      this.ytPlayer.pauseVideo();
    } else {
      this.ytPlayer.playVideo();
    }
    // 狀態更新非同步，稍等再更新圖示
    setTimeout(() => this.updatePlayIcon(), 100);
  }

  /** @param {number} direction  +1 下一首，-1 上一首 */
  skip(direction) {
    const total = this.playlist.length;
    this.index  = ((this.index + direction) % total + total) % total;
    this._loadTrack();
  }

  // ── 內部方法 ────────────────────────────────────────────
  _loadTrack() {
    if (!this.isReady) return;
    const track = this.playlist[this.index];
    // loadVideoById 會立即開始播放
    this.ytPlayer.loadVideoById(track.youtubeId);
    this._updateTrackInfo();
  }

  _updateTrackInfo() {
    const track = this.playlist[this.index];
    if (this.titleEl)  this.titleEl.textContent  = track.title  ?? '';
    if (this.artistEl) this.artistEl.textContent = track.artist ?? '';
  }

  updatePlayIcon() {
    if (!this.playBtn || !this.isReady) return;
    const icon = this.playBtn.querySelector('i');
    if (!icon) return;
    const playing = this.ytPlayer?.getPlayerState?.() === YT.PlayerState.PLAYING;
    icon.className = playing ? 'fa-solid fa-circle-pause' : 'fa-solid fa-circle-play';
  }

  /**
   * 每 500ms 輪詢一次 YouTube Player 的時間資料更新進度條。
   * YouTube IFrame API 沒有 timeupdate 事件，只能以輪詢取代。
   * 切換歌曲時先 clearInterval 再重新建立，避免計時器堆積。
   */
  _startProgressTimer() {
    clearInterval(this.progressTimer);
    this.progressTimer = setInterval(() => this._updateProgress(), 500);
  }

  _updateProgress() {
    if (!this.isReady || !this.ytPlayer?.getDuration) return;
    const current  = this.ytPlayer.getCurrentTime() ?? 0;
    const duration = this.ytPlayer.getDuration()    ?? 0;
    if (!duration) return;

    const percent = (current / duration) * 100;
    if (this.progressEl) {
      this.progressEl.value = percent;
      // CSS 背景漸層用 --progress 自訂屬性做填色
      this.progressEl.style.setProperty('--progress', `${percent}%`);
    }
    if (this.currentEl)  this.currentEl.textContent  = formatTime(current);
    if (this.durationEl) this.durationEl.textContent = formatTime(duration);
    this.updatePlayIcon();
  }

  // ── 按鈕事件 ────────────────────────────────────────────
  _bindButtons() {
    this.playBtn?.addEventListener('click', () => this.togglePlay());
    this.prevBtn?.addEventListener('click', () => this.skip(-1));
    this.nextBtn?.addEventListener('click', () => this.skip(1));

    this.progressEl?.addEventListener('input', () => {
      if (!this.isReady || !this.ytPlayer?.getDuration?.()) return;
      const ratio = Number(this.progressEl.value) / 100;
      // seekTo(seconds, allowSeekAhead) - 第二個參數 true 允許跨快取邊界 seek
      this.ytPlayer.seekTo(ratio * this.ytPlayer.getDuration(), true);
    });

    this.volumeEl?.addEventListener('input', () => {
      if (!this.isReady) return;
      // YouTube API 音量範圍為 0-100，與 input[max=100] 一致
      this.ytPlayer.setVolume(Number(this.volumeEl.value));
    });
  }
}

// ── 工具函式 ────────────────────────────────────────────────
/** 將秒數格式化為 mm:ss，非有限數值時回傳 00:00。 */
function formatTime(seconds) {
  if (!Number.isFinite(seconds) || seconds < 0) return '00:00';
  const m = Math.floor(seconds / 60).toString().padStart(2, '0');
  const s = Math.floor(seconds % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
}
