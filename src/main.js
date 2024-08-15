import { createApp } from 'vue';
import App from './App.vue';
import store from './store'; // This is correct as long as the path is accurate and points to a directory with an index.js

const app = createApp(App).use(store).mount('#app');
