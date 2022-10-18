import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
// Pinia
import { createPinia } from 'pinia'
// WindiCSS
import 'virtual:windi.css'
import './assets/global.css'
import { importComponents } from './components/autoimport'
import { useAppStore } from './store/AppStore'



const app = createApp(App)//.mount('#app')
 importComponents(app)

// // Pinia store
 const pinia = createPinia()
 pinia.use(() => ({ router }))
 app.use(pinia)

 const AppStore = useAppStore()

// // Router
 app.use(router)

// // Mount app
 const init = async () => {
   AppStore.init()
   app.mount('#app')
 }

 
init().catch((e) => {
  })

