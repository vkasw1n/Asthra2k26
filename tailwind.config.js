module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'neon-cyan': '#00d4ff',
        'neon-purple': '#b026ff',
        'neon-green': '#00ff88',
        'dark-space': '#0a0e27',
        'dark-blue': '#1a1550',
      },
      fontFamily: {
        'futuristic': ['Orbitron', 'sans-serif'],
        'mono': ['Space Mono', 'monospace'],
        'audio': ['Audiowide', 'sans-serif'],
      },
      animation: {
        'glow': 'glow 2s ease-in-out infinite',
        'float': 'float 3s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
      },
      keyframes: {
        glow: {
          '0%, 100%': { 'text-shadow': '0 0 10px rgba(0, 212, 255, 0.6)' },
          '50%': { 'text-shadow': '0 0 20px rgba(0, 212, 255, 1)' },
        },
        float: {
          '0%, 100%': { 'transform': 'translateY(0px)' },
          '50%': { 'transform': 'translateY(-20px)' },
        },
        'pulse-glow': {
          '0%, 100%': { 'opacity': '0.8' },
          '50%': { 'opacity': '1' },
        },
      },
    },
  },
  plugins: [],
}
