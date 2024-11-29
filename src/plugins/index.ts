import { type App } from "vue"
import { setupRouter } from "@/router"
import { setupElIcons } from "./icons"
import { setupPermission } from "./permission"
import { setupStore } from "@/store"
import { setupVxeTable } from "./vxe-table"

export default {
  install(app: App<Element>) {
    // 状态管理(store)
    setupStore(app)
    // 路由(router)
    setupRouter(app)
    // Element-plus图标
    setupElIcons(app)
    // vxe-table表格
    setupVxeTable(app)
    // 路由守卫
    setupPermission()
  },
}
