import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{vue,ts}'],
  theme: {
    extend: {
      colors: {
        date: {
          pink: '#ff5fa2',
          light: '#ffd6e8',
          rose: '#ff8fab',
          cream: '#fff7fb',
          text: '#3b2c35',
        },
      },
      boxShadow: {
        soft: '0 24px 80px rgba(255, 95, 162, 0.22)',
        glass: '0 18px 50px rgba(255, 143, 171, 0.26)',
      },
      animation: {
        float: 'float 8s ease-in-out infinite',
        pop: 'pop 0.55s cubic-bezier(.2,1.25,.35,1)',
        shimmer: 'shimmer 2.6s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0) rotate(0deg)' },
          '50%': { transform: 'translateY(-24px) rotate(8deg)' },
        },
        pop: {
          '0%': { transform: 'scale(.86)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        shimmer: {
          '0%': { backgroundPosition: '200% 0' },
          '100%': { backgroundPosition: '-200% 0' },
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
