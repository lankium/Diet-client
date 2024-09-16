import { createRouter, createWebHistory } from "vue-router"
import type { RouteRecordRaw } from "vue-router"

const rootRoutes: RouteRecordRaw[] = [
  {
    path: "home",
    name: "Home",
    component: () => import("@/views/HomePage/HomPage.vue"),
  },
  {
    path: "fridge",
    name: "Fridge",
    component: () => import("@/views/Fridge/Fridge.vue"),
  },
  {
    path: "foodSelection",
    name: "FoodSelection",
    component: () => import("@/views/FoodSelection/FoodSelection.vue"),
  },
  {
    path: "collections",
    name: "Collections",
    component: () => import("@/views/Collections/Collections.vue"),
  },
  {
    path: "account",
    name: "Account",
    component: () => import("@/views/Account/Account.vue"),
  },

]

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "App",
    component: () => import("@/views/TheRoot.vue"),
    redirect: "/home",
    children: rootRoutes,
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("@/views/TheLogin.vue"),
  },
  {
    path: "/register",
    name: "Register",
    component: () => import("@/views/TheRegister.vue"),
  },
  {
    path: "/searchPage",
    name: "searchPage",
    component: () => import("@/views/SearchPage/SearchPage.vue"),
  },
  {
    path: "/recipeDetail",
    name: "RecipeDetail",
    component: () => import("@/views/RecipeDetail/RecipeDetail.vue"),
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, _from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title as string
  }
  next()
})

export default router