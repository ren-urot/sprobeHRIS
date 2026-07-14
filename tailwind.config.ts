import type { Config } from 'tailwindcss'
import animate from 'tailwindcss-animate'

export default {
  darkMode: ['class'],
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'brand-orange': '#8B2F31',
        'brand-blue':   '#1565C0',
        'brand-bg':     '#F0F1F3',
        'brand-teal':   '#00C8D5',
        'brand-red':    '#E53935',
        'brand-th':     '#4D4D4D',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      borderRadius: {
        card: '14px',
      },
      boxShadow: {
        card: '0 2px 10px rgba(0,0,0,0.08)',
      },
    },
  },
  plugins: [animate],
} satisfies Config
