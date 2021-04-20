import Vue from "vue";
import Buefy from "buefy";
import App from "./App.vue";

/* vue-router & vuex store */
import router from "./router";
import store from "./store";

/* import own styles & buefy */
import "./assets/styles.scss";
import "buefy/dist/buefy.css";
Vue.use(Buefy);

/* Add axios as Vue prototype */
// Vue.prototype.$http = ... ;
import axios from "axios";

axios.defaults.withCredentials = true; // because my routes are protected by Phoenix
axios.defaults.baseURL = "http://localhost:4000/api"; // the Phoenix Framework default endpoint

Vue.config.productionTip = false;

new Vue({
  /* bind router to vue instance this.$router */
  router,

  /* bind store to vue instance this.$store */
  store,

  /* ... */
  render: (h) => h(App),
}).$mount("#app");
