<template>
  <div class="index" :class="[isDarkmode ? 'is-darkmode' : 'is-lightmode']">
    <container-main-menu />
    <container-app-content />
  </div>
</template>

<script>
// @ is an alias to /src
import ContainerAppContent from "@/components/ContainerAppContent";
import ContainerMainMenu from "@/components/ContainerMainMenu";

export default {
  name: "index",
  components: {
    ContainerAppContent,
    ContainerMainMenu,
  },
  computed: {
    isDarkmode() {
      return this.$store.state.dashboard.isDarkmode;
    },
  },
};
</script>

<style lang="scss">
.index {
  min-height: 100vh;
}

.index.is-darkmode {
  background: #2a2a2a;
}

.index.is-lightmode {
  background: #f8f8f8;
}
</style>
