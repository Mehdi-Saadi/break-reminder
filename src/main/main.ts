import '@/assets/styles/main.css';

import App from '@/main/App.vue';
import i18n from '@/main/i18n';
import router from '@/main/router';
import store from '@/main/stores';
import ui from '@nuxt/ui/vue-plugin';
import { createApp } from 'vue';

const app = createApp(App);

// modules
app.use(router);
app.use(ui);
app.use(store);
app.use(i18n);

app.mount('#app');
