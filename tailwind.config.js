/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        surface: {
          DEFAULT: '#fff8f8',
          dim: '#e6d6d9',
          bright: '#fff8f8',
          lowest: '#ffffff',
          low: '#fff0f2',
          container: '#fbeaec',
          high: '#f5e4e7',
          highest: '#efdfe1',
          dark: '#131012',
          'dark-container': '#1c171a',
          'dark-high': '#2b1f24',
          'dark-card': '#231b1e',
        },
        primary: {
          DEFAULT: '#4c0d1d',
          container: '#682332',
          light: '#e88a99',
          fixed: '#ffd9dd',
        },
        secondary: {
          DEFAULT: '#865046',
          container: '#feb8ab',
          light: '#e8a598',
        },
        tertiary: {
          DEFAULT: '#735c00',
          gold: '#d4af37',
          light: '#e9c349',
        },
        ink: {
          DEFAULT: '#22191b',
          muted: '#534344',
          subtle: '#867274',
          dark: '#f7ede8',
          'dark-muted': '#c4828e',
        }
      },
      fontFamily: {
        serif: ['Playfair Display', 'serif'],
        sans: ['Plus Jakarta Sans', 'sans-serif'],
        hand: ['Caveat', 'cursive'],
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(104, 35, 50, 0.05), 0 2px 6px -1px rgba(45, 36, 38, 0.03)',
        'elevated': '0 12px 32px -4px rgba(104, 35, 50, 0.09), 0 4px 12px -2px rgba(45, 36, 38, 0.04)',
        'glow': '0 0 25px rgba(232, 138, 153, 0.25)',
        'dark-glow': '0 0 30px rgba(104, 35, 50, 0.4)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 4s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' },
        }
      }
    },
  },
  plugins: [],
}
