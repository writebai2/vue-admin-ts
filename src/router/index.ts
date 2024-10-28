import {
  createRouter,
  createWebHashHistory,
  type RouteRecordRaw,
} from "vue-router"

const routes: Array<RouteRecordRaw> = [
  {
    path: "/login",
    component: () => import("@/views/login/index.vue"),
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes: routes,
})

// router.beforeEach((to, _from) => {
//   const token = localStorage.getItem("pz_token")
//   // 非登录页面token不存在
//   if (!token && to.path !== "/login") {
//     return { path: "/login" }
//   } else if (token && to.path === "/login") {
//     return { path: "/" }
//   } else {
//     return true
//   }
// })

export default router
