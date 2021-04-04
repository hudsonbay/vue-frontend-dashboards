import Vue from "vue";
import Vuex from "vuex";

import { mainmenu } from "@/store/mainmenu.module";
import { dashboard } from "@/store/dashboard.module";
import { topbar } from "@/store/topbar.module";
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    mainmenu,
    dashboard,
    topbar,
  },
  plugins: [createPersistedState()],
  state: { user: {}, selectedDashboardID: 0 },
  getters: {
    getSelectedDashboard: (state) => {
      return state.user.dashboards.filter(
        (d) => d.id == state.selectedDashboardID
      )[0];
    },
    getSelectedDashboardID: (state) => {
      return state.selectedDashboardID;
    },
  },
  mutations: {
    storeUserInfo(state, payload) {
      state.user = payload;
    },
    storeUserDashboards(state, payload) {
      state.user.dashboards.push(payload);
    },
    addDashboard(state, payload) {
      state.user.dashboards.push({ id: payload.id, title: payload.title });
    },
    setSelectedDashboard(state, payload) {
      state.selectedDashboardID = payload;
    },
    clearUser(state) {
      state.user = {};
      state.selectedDashboardID = 0;
    },
  },
  actions: {},
});
