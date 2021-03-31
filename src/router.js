import Vue from "vue";
import Router from "vue-router";
import store from "./store";
import Index from "./views/Index.vue";
import IndexHome from "./views/sub/IndexHome.vue";
import IndexController from "./views/sub/IndexController.vue";
import Profile from "./views/sub/Profile.vue";
import Notes from "./views/sub/Notes.vue";
import Links from "./views/sub/Links.vue";
import Signup from "./views/Signup.vue";
import Signin from "./views/Signin.vue";

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
            requiresAuth: true,
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
            requiresAuth: true,
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
            requiresAuth: true,
          },
        },
      ],
    },
    {
      path: "/signin",
      name: "Signin",
      component: Signin,
      meta: { guest: true },
    },
    {
      path: "/signup",
      name: "Signup",
      component: Signup,
      meta: { guest: true },
    },
  ],
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (store.getters.isAuthenticated) {
      next();
      return;
    }
    next("/signin");
  } else {
    next();
  }
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.guest)) {
    if (store.getters.isAuthenticated) {
      next("/notes");
      return;
    }
    next();
  } else {
    next();
  }
});

export default router;
