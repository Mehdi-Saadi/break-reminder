import App from '@/App.vue';
import router from '@/router';
import { createApp } from 'vue';

const app = createApp(App);

// modules
app.use(router);

app.mount('#app');
