import Vue from "vue";
import Router from "vue-router";
import store from "./store";
import Index from "./views/Index.vue";
import IndexHome from "./views/sub/IndexHome.vue";
import Profile from "./views/sub/Profile.vue";
import Notes from "./views/sub/Notes.vue";
import Links from "./views/sub/Links.vue";
import Signup from "./views/Signup.vue";
import Signin from "./views/Signin.vue";
import { isLoggedIn } from "./utils/auth";

Vue.use(Router);

const router = new Router({
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
            allowAnonymous: true,
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
      name: "Signin",
      component: Signin,
      meta: { guest: true, allowAnonymous: true },
    },
    {
      path: "/signup",
      name: "Signup",
      component: Signup,
      meta: { guest: true, allowAnonymous: true },
    },
  ],
});

router.beforeEach((to, from, next) => {
  if (!to.meta.allowAnonymous && !isLoggedIn()) {
    next("/signin");
  } else {
    next();
  }
});

export default router;
