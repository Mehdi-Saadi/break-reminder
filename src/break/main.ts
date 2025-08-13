import '@/assets/styles/main.css';

import App from '@/break/App.vue';
import i18n from '@/break/i18n';
import ui from '@nuxt/ui/vue-plugin';
import { createApp } from 'vue';

const app = createApp(App);

// modules
app.use(ui);
app.use(i18n);

app.mount('#app');
