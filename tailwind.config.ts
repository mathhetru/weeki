import type { Config } from 'tailwindcss'

export default <Partial<Config>>{
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f5f3ff',
          100: '#ede9fe',
          200: '#ddd6fe',
          300: '#c4b5fd',
          400: '#a78bfa',
          500: '#624e88', // Votre couleur principale
          600: '#7c3aed',
          700: '#6d28d9',
          800: '#5b21b6',
          900: '#4c1d95',
          950: '#2e1065',
        },
        secondary: {
          500: '#7b7bf7',
        },
        accent: {
          500: '#ff7444',
        },
      },
      fontFamily: {
        main: ['Montserrat', 'sans-serif'],
        heading: ['Birthstone Bounce', 'sans-serif'],
      },
    },
  },
}
