// Sound effects manager for Marvel Multiverse experience
// This module provides ambient sound management for the cosmic environment

class SoundManager {
  constructor() {
    this.sounds = {};
    this.isEnabled = false;
    this.audioContext = null;
    this.masterVolume = 0.3;
  }

  initialize() {
    try {
      this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
      console.log('🎵 Sound system initialized');
    } catch (error) {
      console.warn('Audio context not supported:', error);
    }
  }

  // Play cosmic ambient hum
  playAmbientSpace() {
    if (!this.isEnabled || !this.audioContext) return;
    
    // Create oscillator for deep space hum
    const oscillator = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();
    
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(60, this.audioContext.currentTime);
    gainNode.gain.setValueAtTime(this.masterVolume * 0.1, this.audioContext.currentTime);
    
    oscillator.connect(gainNode);
    gainNode.connect(this.audioContext.destination);
    
    oscillator.start();
    
    this.sounds.ambient = oscillator;
  }

  // Portal swirl sound effect
  playPortalSwirl() {
    if (!this.isEnabled || !this.audioContext) return;
    
    const oscillator = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();
    
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(200, this.audioContext.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(
      800,
      this.audioContext.currentTime + 0.5
    );
    
    gainNode.gain.setValueAtTime(this.masterVolume * 0.2, this.audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(
      0.001,
      this.audioContext.currentTime + 0.5
    );
    
    oscillator.connect(gainNode);
    gainNode.connect(this.audioContext.destination);
    
    oscillator.start();
    oscillator.stop(this.audioContext.currentTime + 0.5);
  }

  // Energy burst sound
  playEnergyBurst() {
    if (!this.isEnabled || !this.audioContext) return;
    
    const oscillator = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();
    
    oscillator.type = 'sawtooth';
    oscillator.frequency.setValueAtTime(150, this.audioContext.currentTime);
    
    gainNode.gain.setValueAtTime(this.masterVolume * 0.15, this.audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(
      0.001,
      this.audioContext.currentTime + 0.3
    );
    
    oscillator.connect(gainNode);
    gainNode.connect(this.audioContext.destination);
    
    oscillator.start();
    oscillator.stop(this.audioContext.currentTime + 0.3);
  }

  // Button hover sound
  playButtonHover() {
    if (!this.isEnabled || !this.audioContext) return;
    
    const oscillator = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();
    
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(600, this.audioContext.currentTime);
    
    gainNode.gain.setValueAtTime(this.masterVolume * 0.05, this.audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(
      0.001,
      this.audioContext.currentTime + 0.1
    );
    
    oscillator.connect(gainNode);
    gainNode.connect(this.audioContext.destination);
    
    oscillator.start();
    oscillator.stop(this.audioContext.currentTime + 0.1);
  }

  enable() {
    this.isEnabled = true;
    if (!this.audioContext) {
      this.initialize();
    }
    this.playAmbientSpace();
    console.log('🔊 Sound enabled');
  }

  disable() {
    this.isEnabled = false;
    if (this.sounds.ambient) {
      this.sounds.ambient.stop();
    }
    console.log('🔇 Sound disabled');
  }

  toggle() {
    if (this.isEnabled) {
      this.disable();
    } else {
      this.enable();
    }
    return this.isEnabled;
  }

  setVolume(volume) {
    this.masterVolume = Math.max(0, Math.min(1, volume));
  }
}

// Export singleton instance
const soundManager = new SoundManager();
export default soundManager;
