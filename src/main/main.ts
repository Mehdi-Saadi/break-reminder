import ui from '@nuxt/ui/vue-plugin'
import { createApp } from 'vue'
import App from '@/main/App.vue'
import router from '@/main/router'
import store from '@/main/stores'
import i18n from '@/shared/i18n'
import '@/assets/styles/main.css'

const app = createApp(App)

// modules
app.use(router)
app.use(ui)
app.use(store)
app.use(i18n)

app.mount('#app')
