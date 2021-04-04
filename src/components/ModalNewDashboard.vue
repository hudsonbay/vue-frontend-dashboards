<template>
  <div class="modal-card" style="width: auto">
    <header class="modal-card-head">
      <p class="modal-card-title">New dashboard</p>
      <button type="button" class="delete" @click="$emit('close')" />
    </header>
    <section class="modal-card-body">
      <b-field label="Name">
        <b-input
          type="text"
          v-model="dashboardName"
          :value="dashboardName"
          placeholder="Your dashboard name"
          required
        ></b-input>
      </b-field>
    </section>
    <footer class="modal-card-foot">
      <button
        v-bind:disabled="inputIsEmpty"
        class="button is-primary"
        @click="newDashboard(dashboardName)"
      >
        Add
      </button>
      <button class="button" type="button" @click="$emit('close')">
        Close
      </button>
    </footer>
  </div>
</template>
<script>
import { insertDashboardOnDB } from "../actions/Dashboards";

import { getLoggedUserInfo } from "../utils/auth";
export default {
  name: "ModalNewDashboard",
  data() {
    return {
      dashboardName: "",
      user: getLoggedUserInfo(),
    };
  },
  methods: {
    newDashboard: function(dashboardName) {
      this.$emit("close");
      insertDashboardOnDB(this.user.id, dashboardName);
    },
  },
  computed: {
    inputIsEmpty() {
      return this.dashboardName.length == 0;
    },
  },
};
</script>
