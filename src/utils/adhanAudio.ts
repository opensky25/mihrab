/**
 * Synthesizes a dignified, soft harmonic chime cadence using Web Audio API
 * when Adhan alert sound is enabled in the browser.
 */
export class AdhanTonePlayer {
  private ctx: AudioContext | null = null;
  private timeouts: number[] = [];

  playGentleChime(): void {
    this.stop();
    if (typeof window === 'undefined') return;
    const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtx) return;

    try {
      this.ctx = new AudioCtx();
      // Hijaz-inspired gentle harmonic intervals (D4, F4, F#4, A4, D5)
      const notes = [293.66, 369.99, 392.0, 440.0, 392.0, 369.99, 293.66];
      const stepMs = 480;

      notes.forEach((freq, idx) => {
        const timer = window.setTimeout(() => {
          if (!this.ctx) return;
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

          gain.gain.setValueAtTime(0.001, this.ctx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.08, this.ctx.currentTime + 0.08);
          gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.85);

          osc.connect(gain);
          gain.connect(this.ctx.destination);
          osc.start();
          osc.stop(this.ctx.currentTime + 0.9);
        }, idx * stepMs);

        this.timeouts.push(timer);
      });
    } catch {
      // Ignore audio restriction errors gracefully
    }
  }

  stop(): void {
    this.timeouts.forEach((id) => window.clearTimeout(id));
    this.timeouts = [];
    if (this.ctx) {
      this.ctx.close().catch(() => {});
      this.ctx = null;
    }
  }
}
