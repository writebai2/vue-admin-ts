/***
 * @常用路由
 */
import { type RouteRecordRaw } from "vue-router"

export const constRouter: Array<RouteRecordRaw> = [
  {
    path: "/login",
    meta: { title: "登录", icon: "", isShow: false },
    component: () => import("@/views/Login/index.vue"),
  },
  {
    path: "/404",
    meta: { title: "404", isShow: false },
    component: () => import("@/views/404/index.vue"),
  },
]

/***
 * @任意路由
 */
export const anyRouter: Array<RouteRecordRaw> = [
  //任意路由
  {
    path: "/:pathMatch(.*)*",
    // name: 'Any',
    meta: { title: "任意路由", isShow: false },
    redirect: "/404",
  },
]
