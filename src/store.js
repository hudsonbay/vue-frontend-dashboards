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
      state.user.dashboards.push({
        id: payload.id,
        title: payload.title,
        notes: payload.notes,
        links: payload.links,
      });
    },
    addNote(state, payload) {
      state.user.dashboards
        .filter((d) => d.id == state.selectedDashboardID)[0]
        .notes.push({
          id: payload.id,
          text: payload.text,
          title: payload.title,
        });
    },
    addLink(state, payload) {
      state.user.dashboards
        .filter((d) => d.id == state.selectedDashboardID)[0]
        .links.push({
          id: payload.id,
          title: payload.title,
          url: payload.url,
        });
    },
    deleteNote(state, payload) {
      const i = state.user.dashboards
        .filter((d) => d.id == state.selectedDashboardID)[0]
        .notes.map((item) => item.id)
        .indexOf(payload.id);

      state.user.dashboards
        .filter((d) => d.id == state.selectedDashboardID)[0]
        .notes.splice(i, 1);
    },
    deleteLink(state, payload) {
      const i = state.user.dashboards
        .filter((d) => d.id == state.selectedDashboardID)[0]
        .links.map((item) => item.id)
        .indexOf(payload.id);

      state.user.dashboards
        .filter((d) => d.id == state.selectedDashboardID)[0]
        .links.splice(i, 1);
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
