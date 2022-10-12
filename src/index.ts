import { createApp } from 'vue';
import App from './app.vue';
import store from './store';
import key from './store/index';

createApp(App).use(store, key).mount('#app');