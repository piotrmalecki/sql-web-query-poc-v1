import { defineConfig } from 'windicss/helpers'

export default defineConfig({
  darkMode: 'class',
  //   safelist: 'p-3 p-4 p-5',
  theme: {
    extend: {
      colors: {
        primary: '#ffd300',
        'primary-alt': '#ffe140',
        blue: '#a1c0de',
        purple: '#431587'
      }
    }
  },
  plugins: [
    require('@windicss/plugin-animations')
  ]
})
