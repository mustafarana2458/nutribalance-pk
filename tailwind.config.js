/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        forest: {
          50: '#F0F7F3',
          100: '#DCEDE4',
          200: '#B6D9C6',
          300: '#86BFA1',
          400: '#54A37C',
          500: '#2E8B5E',
          600: '#1F6F4A',
          700: '#124A31',
          800: '#0D3624',
          900: '#082318',
        },
        sage: {
          50: '#F6FBF8',
          100: '#EEF7F1',
          200: '#DDEFE3',
          300: '#C6E2D0',
          400: '#A9D0B8',
        },
        apricot: {
          50: '#FEF5EC',
          100: '#FDE8D3',
          200: '#FAD2AB',
          300: '#F7BC84',
          400: '#F6AF70',
          500: '#F4A261',
          600: '#E08840',
          700: '#9E561C', // darkened for AA text contrast on white and light apricot
        },
        cream: {
          50: '#FAF8F3',
          100: '#F4F0E7',
          200: '#EAE3D5',
        },
        ink: {
          400: '#767066', // AA on cream-50 (4.6:1)
          500: '#726C63',
          600: '#5B564E',
          700: '#403C36',
          800: '#2F2C27',
          900: '#22201C',
        },
      },
      fontFamily: {
        display: ['Fraunces', 'Georgia', 'serif'],
        sans: ['"DM Sans"', 'system-ui', '-apple-system', 'sans-serif'],
      },
      fontSize: {
        'display-xl': ['clamp(2.75rem, 6vw, 4.5rem)', { lineHeight: '1.05', letterSpacing: '-0.02em' }],
        'display-lg': ['clamp(2.25rem, 4.5vw, 3.5rem)', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'display-md': ['clamp(1.75rem, 3vw, 2.5rem)', { lineHeight: '1.15', letterSpacing: '-0.01em' }],
        'display-sm': ['clamp(1.375rem, 2vw, 1.75rem)', { lineHeight: '1.25' }],
      },
      borderRadius: {
        xl: '0.875rem',
        '2xl': '1.25rem',
        '3xl': '1.75rem',
        '4xl': '2.5rem',
        blob: '58% 42% 46% 54% / 52% 48% 52% 48%',
      },
      boxShadow: {
        soft: '0 1px 2px rgba(18, 74, 49, 0.04), 0 8px 24px -12px rgba(18, 74, 49, 0.14)',
        lift: '0 2px 4px rgba(18, 74, 49, 0.05), 0 18px 40px -16px rgba(18, 74, 49, 0.22)',
        glow: '0 18px 44px -18px rgba(244, 162, 97, 0.65)',
      },
      maxWidth: {
        container: '1200px',
        prose: '68ch',
      },
      spacing: {
        section: 'clamp(3.5rem, 8vw, 7rem)',
        4.5: '1.125rem',
      },
      transitionTimingFunction: {
        soft: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
      keyframes: {
        'fade-up': {
          from: { opacity: '0', transform: 'translateY(16px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          from: { opacity: '0', transform: 'translateY(-6px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-14px)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.5s cubic-bezier(0.22, 1, 0.36, 1) both',
        'fade-in': 'fade-in 0.25s cubic-bezier(0.22, 1, 0.36, 1) both',
        float: 'float 9s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
