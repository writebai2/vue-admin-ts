// element-plus图标
import * as ElementPlusIconsVue from "@element-plus/icons-vue"
import type { App } from "vue"

export function setupElIcons(app: App<Element>) {
  // 全局注册图标
  for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
  }
}
