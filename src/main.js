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

// For handling Expired Token (Forbidden Requests) and logouts
// axios.interceptors.response.use(undefined, function(error) {
//   if (error) {
//     const originalRequest = error.config;
//     if (error.response.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;
//       store.dispatch("logout");
//       return router.push("/signin");
//     }
//   }
// });

Vue.config.productionTip = false;

new Vue({
  /* bind router to vue instance this.$router */
  router,

  /* bind store to vue instance this.$store */
  store,

  /* ... */
  render: (h) => h(App),
}).$mount("#app");
