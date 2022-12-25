import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";
import axios from "axios";
import Toaster from "@meforma/vue-toaster";

import ContentHeader from "./components/ContentHeader.vue";
import Content from "./components/Content.vue";

//import './assets/main.css'

const serverBaseUrl = "http://127.0.0.1:8000";

const app = createApp(App);

app.provide(
  "axios",
  axios.create({
    baseURL: serverBaseUrl + "/api",
    headers: {
      "Content-type": "application/json",
    },
  })
);

app.use(Toaster, {
    // Global/Default options
    position: 'top',
    timeout: 3000,
    pauseOnHover: true
})

app.provide('toast', app.config.globalProperties.$toast);

app.provide("serverBaseUrl", serverBaseUrl);

app.component("content-header", ContentHeader).component("content", Content);
app.use(createPinia());
app.use(router);

app.mount("#app");
