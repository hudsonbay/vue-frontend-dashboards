import Vue from "vue";
import Router from "vue-router";
import Index from "./views/Index.vue";
import IndexHome from "./views/sub/IndexHome.vue";
import IndexController from "./views/sub/IndexController.vue";
import Profile from "./views/sub/Profile.vue";
import Notes from "./views/sub/Notes.vue";
import Links from "./views/sub/Links.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "index",
      component: Index,
      children: [
        {
          path: "",
          component: IndexHome,
          meta: {
            showTitle: true,
            title: "Home",
            showBreadcrumb: false,
            breadcrumb: [],
          },
        },
        {
          path: "my-profile",
          component: Profile,
          meta: {
            showTitle: true,
            title: "My Profile",
            showBreadcrumb: true,
            breadcrumb: [{ name: "Home", link: "/" }, { name: "My Profile" }],
          },
        },
        {
          path: "notes",
          component: Notes,
          meta: {
            showTitle: true,
            title: "Notes",
            showBreadcrumb: true,
            breadcrumb: [{ name: "Home", link: "/" }, { name: "Notes" }],
          },
        },
        {
          path: "links",
          component: Links,
          meta: {
            showTitle: true,
            title: "Links",
            showBreadcrumb: true,
            breadcrumb: [{ name: "Home", link: "/" }, { name: "Links" }],
          },
        },
      ],
    },
    {
      path: "/signin",
      name: "signin",
    },
    {
      path: "/signup",
      name: "signup",
    },
  ],
});
