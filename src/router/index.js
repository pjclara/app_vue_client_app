import { createRouter, createWebHistory } from "vue-router";
import MainLayout from "../layouts/MainLayout.vue";
import HomeView from "../views/HomeView.vue";
import LoginView from "../views/LoginView.vue";
import { useUserStore } from "@/stores/user.js";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      component: MainLayout,
      children: [
        {
          path: "",
          name: "home",
          component: HomeView,
        },
        {
          path: "about",
          name: "about",
          component: () => import("../views/AboutView.vue"),
        },
      ],
    },
    {
      path: "/login",
      name: "login",
      component: LoginView,
    },
  ],
});

let handlingFirstRoute = true;

router.beforeEach(async (to, from, next) => {
  const userStore = useUserStore();
  if (handlingFirstRoute) {
    handlingFirstRoute = false;
    await userStore.restoreToken();
  }
  if (to.name == "login") {
    next();
    return;
  }
  if (to.name != "login") {
    if (!userStore.user) {
      next({ name: "login" });
      return;
    }
  }
  next();
});
export default router;
