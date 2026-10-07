/*
js/player.js

Modification():

- Added   播放清單模式（usePlaylistNav）：當 music.json 的資料帶有
        playlistId 時，改用 YouTube 原生播放清單機制掛載（playerVars
        的 listType/list），上一首／下一首呼叫 previousVideo()/
        nextVideo()，單曲結束由 YouTube 自動接播下一首。
        沒有 playlistId 時則完全維持原本「在 music.json 本地陣列裡
        循環播放」的行為，兩種資料型態都相容，未來想切回手動歌單
        也不需要改程式碼。
- Added   _updateTrackInfo 改為優先呼叫 getVideoData() 向播放器本身
        取得目前這首歌「真正」的標題與頻道名稱；播放清單模式下
        music.json 不可能預先知道清單裡有哪些歌、順序為何，只有
        播放器自己知道目前播的是哪首。getVideoData() 尚未回傳資料
        時（例如剛切換瞬間）才退回 music.json 的靜態文字。
- Kept    autoplay 維持關閉（playerVars.autoplay: 0）：多數瀏覽器的
        自動播放政策會直接封鎖「有聲音」的自動播放，強行開啟只會在
        主控台噴錯誤且實際上仍播不出來，因此保留由使用者主動按下
        播放鍵的設計。

Description:

YouTube IFrame API 播放器，讀取 config/music.json 的播放清單設定。
頁面載入後播放器靜默就緒，使用者主動點擊播放按鈕才開始播放。

DOM 掛載點（由 index.html 提供）：
  [data-player]           播放器容器
  [data-player-title]     歌曲名稱
  [data-player-artist]    演出者
  [data-player-progress]  進度條 <input type="range">
  [data-player-current]   當前時間
  [data-player-duration]  總時長
  [data-player-play]      播放／暫停按鈕
  [data-player-prev]      上一首
  [data-player-next]      下一首
  [data-player-volume]    音量 <input type="range">
*/

class MusicPlayer {
  constructor(root, playlist) {
    this.root          = root;
    this.playlist      = playlist;
    this.index         = 0;
    this.ytPlayer      = null;
    this.isReady       = false;
    this.progressTimer = null;

    // 第一筆資料帶 playlistId 就視為「真正的 YouTube 播放清單」，
    // 導覽交給 YouTube 自己處理；否則維持在本地陣列裡循環的舊行為。
    this.usePlaylistNav = Boolean(playlist[0]?.playlistId);

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

  // ── YouTube API 初始化 ──────────────────────────────────
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

    // YouTube 的 API 只會呼叫「全域唯一」的 onYouTubeIframeAPIReady，
    // 這裡保留前一個已註冊的 callback 再串接，避免蓋掉其他程式碼
    // （目前站內只有一個播放器實例，但保留此寫法利於未來擴充）。
    const prev = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      if (typeof prev === 'function') prev();
      this._createYTPlayer();
    };
  }

  _createYTPlayer() {
    const container = document.createElement('div');
    container.id = 'yt-hidden-player';
    container.setAttribute('aria-hidden', 'true');
    container.style.cssText =
      'position:fixed;bottom:0;left:0;width:1px;height:1px;' +
      'overflow:hidden;opacity:0;pointer-events:none;';
    document.body.appendChild(container);

    const track = this.playlist[this.index];
    const playerVars = {
      autoplay:       0,  // 關閉自動播放，等待使用者主動按播放
      controls:       0,
      disablekb:      1,
      iv_load_policy: 3,
      modestbranding: 1,
      playsinline:    1,
      rel:            0,
    };

    const config = {
      playerVars,
      events: {
        onReady:       (e) => this._onReady(e),
        onStateChange: (e) => this._onStateChange(e),
      },
    };

    if (this.usePlaylistNav) {
      Object.assign(playerVars, {
        listType: 'playlist',
        list:     track.playlistId,
        index:    0,
      });
    } else {
      config.videoId = track.youtubeId;
    }

    this.ytPlayer = new YT.Player('yt-hidden-player', config);
  }

  // ── 播放器事件 ──────────────────────────────────────────
  _onReady(event) {
    this.isReady = true;
    const vol = this.volumeEl ? Number(this.volumeEl.value) : 70;
    event.target.setVolume(vol);
    this._updateTrackInfo();
    this._startProgressTimer();
    // autoplay: 0，不呼叫 playVideo()，靜默等待使用者操作
  }

  _onStateChange(event) {
    // 非播放清單模式才需要自己處理「播完接下一首」；
    // 播放清單模式下 YouTube 會依清單順序自動接播。
    if (!this.usePlaylistNav && event.data === YT.PlayerState.ENDED) {
      this.skip(1);
    }
    // CUED／PLAYING 代表新的一首歌資料已就緒，趁機刷新曲名顯示。
    if (event.data === YT.PlayerState.PLAYING || event.data === YT.PlayerState.CUED) {
      this._updateTrackInfo();
    }
    this.updatePlayIcon();
  }

  // ── 播放控制 ────────────────────────────────────────────
  togglePlay() {
    if (!this.isReady) return;
    const playing = this.ytPlayer.getPlayerState() === YT.PlayerState.PLAYING;
    playing ? this.ytPlayer.pauseVideo() : this.ytPlayer.playVideo();
    setTimeout(() => this.updatePlayIcon(), 100);
  }

  skip(direction) {
    if (!this.isReady) return;

    if (this.usePlaylistNav) {
      direction > 0 ? this.ytPlayer.nextVideo() : this.ytPlayer.previousVideo();
      return;
    }

    const total = this.playlist.length;
    this.index  = ((this.index + direction) % total + total) % total;
    this.ytPlayer.loadVideoById(this.playlist[this.index].youtubeId);
    this._updateTrackInfo();
  }

  // ── UI 更新 ─────────────────────────────────────────────
  /**
   * 更新曲名／演出者顯示。
   *
   * 播放清單模式下，清單裡實際有哪些歌、目前播到第幾首都由 YouTube
   * 端決定，music.json 不可能預先知道，因此優先呼叫 getVideoData()
   * 向播放器本身取得「目前這首」的真實標題與頻道名稱；只有在資料
   * 尚未載入完成（title 是空字串）時才退回 music.json 的靜態文字。
   */
  _updateTrackInfo() {
    const fallback = this.playlist[this.index];
    const live = this.ytPlayer?.getVideoData?.();

    const title  = live?.title  || fallback.title  || '';
    const artist = live?.author || fallback.artist || '';

    if (this.titleEl)  this.titleEl.textContent  = title;
    if (this.artistEl) this.artistEl.textContent = artist;
  }

  updatePlayIcon() {
    if (!this.playBtn || !this.isReady) return;
    const icon = this.playBtn.querySelector('i');
    if (!icon) return;
    const playing = this.ytPlayer?.getPlayerState?.() === YT.PlayerState.PLAYING;
    icon.className = playing ? 'fa-solid fa-circle-pause' : 'fa-solid fa-circle-play';
  }

  _startProgressTimer() {
    clearInterval(this.progressTimer);
    this.progressTimer = setInterval(() => this._updateProgress(), 500);
  }

  _updateProgress() {
    if (!this.isReady || !this.ytPlayer?.getDuration) return;
    const current  = this.ytPlayer.getCurrentTime() ?? 0;
    const duration = this.ytPlayer.getDuration()    ?? 0;
    if (!duration) return;

    const pct = (current / duration) * 100;
    if (this.progressEl) {
      this.progressEl.value = pct;
      this.progressEl.style.setProperty('--progress', `${pct}%`);
    }
    if (this.currentEl)  this.currentEl.textContent  = _fmt(current);
    if (this.durationEl) this.durationEl.textContent = _fmt(duration);
    this.updatePlayIcon();
  }

  // ── 事件綁定 ────────────────────────────────────────────
  _bindButtons() {
    this.playBtn?.addEventListener('click', () => this.togglePlay());
    this.prevBtn?.addEventListener('click', () => this.skip(-1));
    this.nextBtn?.addEventListener('click', () => this.skip(1));

    this.progressEl?.addEventListener('input', () => {
      if (!this.isReady || !this.ytPlayer?.getDuration?.()) return;
      const ratio = Number(this.progressEl.value) / 100;
      this.ytPlayer.seekTo(ratio * this.ytPlayer.getDuration(), true);
    });

    this.volumeEl?.addEventListener('input', () => {
      if (this.isReady) this.ytPlayer.setVolume(Number(this.volumeEl.value));
    });
  }
}

function _fmt(sec) {
  if (!Number.isFinite(sec) || sec < 0) return '00:00';
  const m = Math.floor(sec / 60).toString().padStart(2, '0');
  const s = Math.floor(sec % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
}
