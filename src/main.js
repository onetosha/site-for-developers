import { createApp } from 'vue';
import axios from 'axios';

import App from './App.vue';
import router from './router';

import store from './stores/store';

import './assets/base.css';

import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import 'vuetify/dist/vuetify.css';
import '@mdi/font/css/materialdesignicons.css' 


const vuetify = createVuetify({
  icons: {
    defaultSet: 'mdi',
  },
  components,
  directives,
})

const app = createApp(App);

axios.defaults.withCredentials = true;
axios.defaults.baseURL = 'https://localhost:44360';

app.use(store);
app.use(router);
app.use(vuetify);

app.mount('#app');