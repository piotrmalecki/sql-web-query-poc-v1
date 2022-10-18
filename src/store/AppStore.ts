import { defineStore } from 'pinia'
import { usePreferredColorScheme } from '@vueuse/core'

const applyScheme = (isDarkMode: boolean) => {
  if (isDarkMode) {
  }
  document.documentElement.classList.add('my-awesome-class')
}

export const useAppStore = defineStore('appStore', {
  state: () => ({
    darkMode: false
  }),
  getters: {},
  actions: {
    async init() {
      const prefferedMode = usePreferredColorScheme()
      const storedMode = localStorage.getItem('darkmode')

      if (storedMode === 'true') {
        this.darkMode = true
      } else if (storedMode === 'false') {
        this.darkMode = false
      } else {
        localStorage.removeItem('darkmode')

        const prefferedMode = usePreferredColorScheme()
        this.darkMode = prefferedMode.value !== 'light'
      }

      this.applyScheme()
    },
    toggleDarkMode() {
      this.darkMode = !this.darkMode

      localStorage.setItem('darkmode', this.darkMode ? 'true' : 'false')
      this.applyScheme()
    },
    applyScheme() {
      if (this.darkMode) {
        document.documentElement.classList.add('dark')
      } else {
        document.documentElement.classList.remove('dark')
      }
    }
  }
})
