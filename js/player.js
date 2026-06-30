/**
 * js/player.js
 *
 * Modification():
 *
 * - Added 自製音樂播放器（標題 + 進度條 + 音量，不使用 APlayer）
 *
 * Description:
 *
 * 讀取 music.json 播放清單，提供播放/暫停、上一首/下一首、
 * 拖曳進度條 Seek、音量調整等基本功能。
 */

class MusicPlayer {
  /**
   * @param {HTMLElement} root - 播放器容器，需包含對應的 data-player-* 子元素。
   * @param {Array<object>} playlist - 歌曲清單。
   */
  constructor(root, playlist) {
    this.root = root;
    this.playlist = playlist;
    this.index = 0;
    this.audio = new Audio();
    this.audio.preload = 'metadata';

    this.titleEl = root.querySelector('[data-player-title]');
    this.artistEl = root.querySelector('[data-player-artist]');
    this.progressEl = root.querySelector('[data-player-progress]');
    this.currentTimeEl = root.querySelector('[data-player-current]');
    this.durationEl = root.querySelector('[data-player-duration]');
    this.playBtn = root.querySelector('[data-player-play]');
    this.prevBtn = root.querySelector('[data-player-prev]');
    this.nextBtn = root.querySelector('[data-player-next]');
    this.volumeEl = root.querySelector('[data-player-volume]');

    this.bindEvents();
    this.loadTrack(this.index, { autoplay: false });
  }

  bindEvents() {
    this.playBtn?.addEventListener('click', () => this.togglePlay());
    this.prevBtn?.addEventListener('click', () => this.skip(-1));
    this.nextBtn?.addEventListener('click', () => this.skip(1));

    this.progressEl?.addEventListener('input', () => {
      if (!this.audio.duration) return;
      const ratio = Number(this.progressEl.value) / 100;
      this.audio.currentTime = ratio * this.audio.duration;
    });

    this.volumeEl?.addEventListener('input', () => {
      this.audio.volume = Number(this.volumeEl.value) / 100;
    });

    this.audio.addEventListener('timeupdate', () => this.updateProgress());
    this.audio.addEventListener('loadedmetadata', () => this.updateProgress());
    this.audio.addEventListener('ended', () => this.skip(1));
  }

  loadTrack(index, { autoplay = true } = {}) {
    const total = this.playlist.length;
    this.index = ((index % total) + total) % total;
    const track = this.playlist[this.index];

    this.audio.src = track.audio;
    if (this.titleEl) this.titleEl.textContent = track.title;
    if (this.artistEl) this.artistEl.textContent = track.artist || '';
    this.audio.volume = this.volumeEl ? Number(this.volumeEl.value) / 100 : 0.7;

    if (autoplay) {
      this.audio.play().catch(() => {
        /* 瀏覽器可能阻擋自動播放，靜默處理即可 */
      });
    }
    this.updatePlayIcon();
  }

  togglePlay() {
    if (this.audio.paused) {
      this.audio.play().catch(() => {});
    } else {
      this.audio.pause();
    }
    this.updatePlayIcon();
  }

  skip(direction) {
    this.loadTrack(this.index + direction, { autoplay: true });
  }

  updatePlayIcon() {
    if (!this.playBtn) return;
    const icon = this.playBtn.querySelector('i');
    if (!icon) return;
    icon.className = this.audio.paused ? 'fa-solid fa-circle-play' : 'fa-solid fa-circle-pause';
  }

  updateProgress() {
    const { currentTime, duration } = this.audio;
    if (this.progressEl && duration) {
      const percent = (currentTime / duration) * 100;
      this.progressEl.value = percent;
      this.progressEl.style.setProperty('--progress', `${percent}%`);
    }
    if (this.currentTimeEl) this.currentTimeEl.textContent = formatTime(currentTime);
    if (this.durationEl) this.durationEl.textContent = formatTime(duration);
  }
}

/** 將秒數格式化為 mm:ss，無效數值時回傳 00:00。 */
function formatTime(seconds) {
  if (!Number.isFinite(seconds)) return '00:00';
  const m = Math.floor(seconds / 60)
    .toString()
    .padStart(2, '0');
  const s = Math.floor(seconds % 60)
    .toString()
    .padStart(2, '0');
  return `${m}:${s}`;
}
