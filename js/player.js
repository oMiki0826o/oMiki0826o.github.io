/*
js/player.js

Modification():

- Changed autoplay 由開啟改為關閉（playerVars.autoplay: 0）
- Removed _showAutoplayHint：自動播放停用後此功能不再需要
- Removed onReady 中的 playVideo() 呼叫
- Kept    _startProgressTimer、updatePlayIcon 等其餘功能不變

Description:

YouTube IFrame API 播放器，讀取 config/music.json 的播放清單。
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
    this.ytPlayer = new YT.Player('yt-hidden-player', {
      videoId: track.youtubeId,
      playerVars: {
        autoplay:       0,  // 關閉自動播放，等待使用者主動按播放
        controls:       0,
        disablekb:      1,
        iv_load_policy: 3,
        modestbranding: 1,
        playsinline:    1,
        rel:            0,
      },
      events: {
        onReady:       (e) => this._onReady(e),
        onStateChange: (e) => this._onStateChange(e),
      },
    });
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
    if (event.data === YT.PlayerState.ENDED) this.skip(1);
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
    const total = this.playlist.length;
    this.index  = ((this.index + direction) % total + total) % total;
    this._loadTrack();
  }

  _loadTrack() {
    if (!this.isReady) return;
    this.ytPlayer.loadVideoById(this.playlist[this.index].youtubeId);
    this._updateTrackInfo();
  }

  // ── UI 更新 ─────────────────────────────────────────────
  _updateTrackInfo() {
    const track = this.playlist[this.index];
    if (this.titleEl)  this.titleEl.textContent  = track.title  ?? '';
    if (this.artistEl) this.artistEl.textContent = track.artist ?? '';
  }

  updatePlayIcon() {
    if (!this.playBtn || !this.isReady) return;
    const icon    = this.playBtn.querySelector('i');
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
