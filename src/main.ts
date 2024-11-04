import { registerPlugins } from "@/plugins";

import { createApp } from 'vue';
import App from './App.vue';

import "@/styles/settings.scss";
import "element-plus/es/components/message/style/css";
import "element-plus/es/components/message-box/style/css";

const app = createApp(App);

registerPlugins(app);

app.mount('#app');
