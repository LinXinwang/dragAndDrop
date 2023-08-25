import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import dragresize from 'v-dragresize';

Vue.config.productionTip = false;
Vue.prototype.$axios = axios;
Vue.use(dragresize);

new Vue({
  render: h => h(App),
}).$mount('#app')