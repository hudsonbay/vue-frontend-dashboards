//store/modules/auth.js

import axios from "axios";
const state = {
  user: null,
  links: null,
  notes: null,
};
const getters = {
  isAuthenticated: (state) => !!state.user,
  StateNotes: (state) => state.notes,
  StateLinks: (state) => state.links,
  StateUser: (state) => state.user,
};
const actions = {
  async Register({ dispatch }, form) {
    await axios.post("/users/register", form);
    let UserForm = new FormData();
    UserForm.append("email", form.email);
    UserForm.append("password", form.password);
    await dispatch("LogIn", UserForm);
  },

  async LogIn({ commit }, User) {
    await axios.post("/users/login", User);
    await commit("setUser", User.get("email"));
  },

  async LogOut({ commit }) {
    let user = null;
    commit("logout", user);
  },

  // Notes
  async CreateNote({ dispatch }, note) {
    await axios.post("note", note);
    await dispatch("GetNotes");
  },

  async GetNotes({ commit }) {
    let response = await axios.get("notes");
    commit("setNotes", response.data);
  },

  // Links
  async CreateLink({ dispatch }, links) {
    await axios.post("links", links);
    await dispatch("GetLinks");
  },

  async GetLinks({ commit }) {
    let response = await axios.get("links");
    commit("setLinks", response.data);
  },
};
const mutations = {
  setUser(state, email) {
    state.user = email;
  },
  setNotes(state, notes) {
    state.notes = notes;
  },
  setLinks(state, links) {
    state.links = links;
  },
  LogOut(state) {
    state.user = null;
    state.posts = null;
  },
};
export default {
  state,
  getters,
  actions,
  mutations,
};
