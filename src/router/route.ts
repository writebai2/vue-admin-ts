/***
 * @常用路由
 */
import { type RouteRecordRaw } from "vue-router"

export const Layout = () => import("@/layout/index.vue")

export const constRouter: Array<RouteRecordRaw> = [
  {
    path: "/login",
    meta: { title: "登录", icon: "", isShow: false },
    component: () => import("@/views/Login/index.vue"),
  },
  {
    path: "/",
    name: "/home",
    meta: { title: "", icon: "", isShow: false },
    redirect: "/home",
    component: Layout,
    children: [
      {
        path: "/home",
        name: "home",
        meta: { title: "首页", icon: "HomeFilled", isShow: true },
        component: () => import("@/views/Home/index.vue"),
      },
    ],
  },
  {
    path: "/404",
    meta: { title: "404", isShow: false },
    component: () => import("@/views/404/index.vue"),
  },
]

/***
 * @异步路由也叫权限路由
 */
export const asyncRouter: Array<RouteRecordRaw> = [
  {
    path: "/moremenu",
    name: "moremenu",
    meta: { title: "多级菜单", icon: "Operation", isShow: true },
    component: Layout,
    children: [
      {
        path: "/moremenu/menu-one",
        name: "menu-one",
        meta: { title: "一级菜单 ", icon: "DArrowRight", isShow: true },
        component: () => import("@/views/MoreMenu/MenuOne/index.vue"),
        children: [
          {
            path: "/moremenu/menu-one/menu-two",
            name: "menu-two",
            meta: { title: "二级菜单 ", icon: "DArrowRight", isShow: true },
            component: () =>
              import("@/views/MoreMenu/MenuOne/MenuTwo/index.vue"),
            children: [
              {
                path: "/moremenu/menu-one/menu-two/menu-three-1",
                name: "menu-three-1",
                meta: {
                  title: "三级菜单-1",
                  icon: "DArrowRight",
                  isShow: true,
                },
                component: () =>
                  import(
                    "@/views/MoreMenu/MenuOne/MenuTwo/MenuThree/index-1.vue"
                  ),
              },
              {
                path: "/moremenu/menu-one/menu-two/menu-three-2",
                name: "menu-three-2",
                meta: {
                  title: "三级菜单-2",
                  icon: "DArrowRight",
                  isShow: true,
                },
                component: () =>
                  import(
                    "@/views/MoreMenu/MenuOne/MenuTwo/MenuThree/index-2.vue"
                  ),
              },
            ],
          },
        ],
      },
    ],
  },
  {
    path: "/databoard",
    name: "databoard",
    redirect: "/databoard",
    meta: { title: "", icon: "", isShow: false },
    component: Layout,
    children: [
      {
        path: "/databoard",
        name: "data-select",
        meta: { title: "数据面板", icon: "Histogram", isShow: true },
        component: () => import("@/views/DataBoard/index.vue"),
      },
    ],
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
