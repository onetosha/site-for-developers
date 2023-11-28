import { createApp } from 'vue';
import axios from 'axios';

import App from './App.vue';
import router from './router';

const app = createApp(App);

axios.defaults.baseURL = 'https://localhost:44360';


app.use(router);

app.mount('#app');