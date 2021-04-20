<template>
  <!-- App Content Container -->
  <!-- Will automatically expand to fullwidth depending on main menu status -->

  <div class="app-content" :class="{ 'full-width': !mainMenuIsPinned }">
    <!-- App Content Top Bar -->
    <!-- Includes various hotlinks, account avatar, language, notes, ...  -->
    <!-- Can depend on current route -->
    <app-content-top-bar v-bind:mainMenuIsPinned="mainMenuIsPinned">
      <!-- Slot : Top Bar Hotlinks -->
      <top-bar-hotlinks
        v-bind:isDarkmode="isDarkmode"
        v-bind:hotlinks="hotlinks"
      />

      <!-- Slot : Darkmode toggle - TEMP -->
      <b-field style="margin: 0">
        <b-switch
          v-model="isDarkmode"
          :rounded="false"
          size="is-small"
        ></b-switch>
      </b-field>

      <b-button
        icon-left="plus-box"
        type="is-link"
        label="New dashboard"
        @click="openModal"
      />

      <b-select
        style="marginleft: 8px"
        v-show="this.$store.state.user.dashboards.length != 0"
        placeholder="Select a dashboard"
        v-model="selectedDashboard"
        @input="filterDashboard"
      >
        <option
          v-for="dashboard in this.$store.state.user.dashboards"
          :value="dashboard.id"
          :key="dashboard.id"
        >
          {{ dashboard.title }}
        </option>
      </b-select>

      <!-- Above content will be pushed left, below content will be pushed right -->
      <div class="middle-seperator"></div>

      <top-bar-user v-bind:user="{}" />
    </app-content-top-bar>

    <!-- App Content Breadcrumbs -->
    <!-- Shows Title and Breadcrumbs of current active route -->
    <!-- Depends on route if shown or not -->
    <app-content-breadcrumbs />

    <!-- Sub Router View -->
    <!-- App Content Board -->
    <app-content-board />
  </div>
</template>

<script>
import AppContentTopBar from "@/components/AppContentTopBar";
import TopBarHotlinks from "@/components/TopBarHotlinks";
import TopBarUser from "@/components/TopBarUser";
import AppContentBreadcrumbs from "@/components/AppContentBreadcrumbs";
import AppContentBoard from "@/components/AppContentBoard";
import ModalNewDashboard from "./ModalNewDashboard";

export default {
  name: "container-app-content",
  components: {
    ModalNewDashboard,
    AppContentTopBar,
    TopBarHotlinks,
    TopBarUser,
    AppContentBreadcrumbs,
    AppContentBoard,
  },
  props: {
    msg: String,
  },
  data() {
    return {
      user: this.$store.state.user,
      account: {},
      dashboardName: "",
      isActive: true,
      selectedDashboard: 0,
    };
  },
  methods: {
    openModal() {
      this.$buefy.modal.open({
        parent: this,
        component: ModalNewDashboard,
        hasModalCard: true,
        customClass: "custom-class",
        trapFocus: true,
      });
    },
  },
  computed: {
    mainMenuIsPinned() {
      return this.$store.state.mainmenu.isPinned;
    },
    hotlinks() {
      return this.$store.state.topbar.hotlinks;
    },
    footerGroups() {
      return this.$store.state.footer.groups;
    },
    getLoggedUserDashboards() {
      return this.user.dashboards.map((d) => d.title);
    },
    isDarkmode: {
      get() {
        return this.$store.state.dashboard.isDarkmode;
      },
      set(newvalue) {
        this.$store.dispatch("dashboard/SET_DARK_MODE", newvalue);
      },
    },
    filterDashboard() {
      this.$store.commit("setSelectedDashboard", this.selectedDashboard);
    },
  },
};
</script>

<style scoped lang="scss">
.app-content {
  padding: 110px 30px;
  margin-left: 260px;
  box-sizing: border-box;
  min-height: 250px;
}

.app-content.full-width {
  margin-left: 85px;
}

.middle-seperator {
  flex: 1;
}
</style>
