import { createRouter, createWebHashHistory } from "vue-router"
import { constRouter } from "./route"
import type { App } from "vue"

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: constRouter,
  // 刷新时，滚动条位置还原
  scrollBehavior: () => ({ left: 0, top: 0 }),
})

// 全局注册router
export function setupRouter(app: App<Element>) {
  app.use(router)
}

export default router
