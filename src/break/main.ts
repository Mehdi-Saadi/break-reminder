import ui from '@nuxt/ui/vue-plugin'
import { createApp } from 'vue'
import App from '@/break/App.vue'
import i18n from '@/shared/i18n'
import '@/assets/styles/main.css'

const app = createApp(App)

// modules
app.use(ui)
app.use(i18n)

app.mount('#app')
