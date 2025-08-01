import '@/assets/styles/main.css';

import App from '@/App.vue';
import router from '@/router';
import ui from '@nuxt/ui/vue-plugin';
import { createApp } from 'vue';
import { createPinia } from 'pinia';

const app = createApp(App);
const pinia = createPinia();

// modules
app.use(router);
app.use(ui);
app.use(pinia);

app.mount('#app');
