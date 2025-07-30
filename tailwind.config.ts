import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#34893F',
          green: '#34893F',
        },
        accent: {
          DEFAULT: '#C49B38',
          gold: '#C49B38',
        },
        secondary: {
          DEFAULT: '#FDF5EF',
          beige: '#FDF5EF',
        },
        'pure-white': '#FFFFFF',
        'text-dark': '#2A2A2A',
      },
      fontFamily: {
        'serif': ['Montaga', 'serif'],
        'sans': ['Lato', 'sans-serif'],
        'heading': ['Montaga', 'serif'],
        'body': ['Lato', 'sans-serif'],
      },
      fontSize: {
        'h1': ['2.5rem', '1.2'],
        'h2': ['2rem', '1.3'],
        'h3': ['1.5rem', '1.4'],
        'body': ['1rem', '1.6'],
        'small': ['0.875rem', '1.4'],
      },
      spacing: {
        'grid': '8px',
        'section': '80px',
        'element': '16px',
        'page-mobile': '24px',
        'page-desktop': '96px',
      },
      borderRadius: {
        '2xl': '1rem',
        'xl': '0.75rem',
      },
      boxShadow: {
        'soft': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'small': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}

export default config
