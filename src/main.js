import { createApp } from 'vue';
import axios from 'axios';

import App from './App.vue';
import router from './router';

import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import 'vuetify/dist/vuetify.css';


const vuetify = createVuetify({
  components,
  directives,
})

const app = createApp(App);

axios.defaults.baseURL = 'https://localhost:44360';


app.use(router);
app.use(vuetify);

app.mount('#app');