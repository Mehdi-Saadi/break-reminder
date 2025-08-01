import '@/assets/styles/main.css';

import App from '@/App.vue';
import router from '@/router';
import store from '@/stores';
import ui from '@nuxt/ui/vue-plugin';
import { createApp } from 'vue';

const app = createApp(App);

// modules
app.use(router);
app.use(ui);
app.use(store);

app.mount('#app');
