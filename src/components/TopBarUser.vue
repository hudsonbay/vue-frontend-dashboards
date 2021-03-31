<template>
  <!-- User component to insert into top bar slot -->
  <div class="top-bar-user">
    <!-- text part would hold -->
    <!-- username, and or role of user -->
    <div class="text">
      <!-- <p class="lower">Moderator</p> -->
      <span v-if="isLoggedIn">
        <p class="upper">{{ user.email }}email</p>
        <a @click="logout">Logout</a>
      </span>
      <span v-else>
        <router-link to="/signup">Register</router-link> |
        <router-link to="/signin">Login</router-link>
      </span>
    </div>

    <!-- avatar part would hold -->
    <!-- user profile image -->
    <div class="avatar"></div>
  </div>
</template>

<script>
export default {
  name: "top-bar-user",
  props: {
    user: Object,
  },
  computed: {
    isLoggedIn: function() {
      return this.$store.getters.isAuthenticated;
    },
  },
  methods: {
    async logout() {
      await this.$store.dispatch("LogOut");
      this.$router.push("/signin");
    },
  },
};
</script>

<style scoped lang="scss">
.top-bar-user {
  padding: 0px;
  margin-right: 15px;
}

.top-bar-user {
  display: flex;
}

.top-bar-user .text {
  text-align: right;
  margin-right: 15px;
}

.top-bar-user .text .upper {
  font-size: 17px;
  font-weight: 600;
  margin-top: -5px;
}

.top-bar-user .text .lower {
  font-size: 12px;
  margin-top: -5px;
}

.top-bar-user .avatar {
  width: 32px;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 20px;
}

// Darkmode adaptions
.is-darkmode .top-bar-user .text .upper {
  color: #c1c1c1;
}
.is-darkmode .top-bar-user .text .lower {
  color: orange;
}
.is-lightmode .top-bar-user .text .upper {
  color: #999999;
}
.is-lightmode .top-bar-user .text .lower {
  color: orange;
}
</style>
