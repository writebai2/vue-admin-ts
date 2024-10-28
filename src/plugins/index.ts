import { type App } from "vue"
import { loadElementPlusIcon } from "./element-pus-icon"

export function loadPlugins(app: App) {
  loadElementPlusIcon(app)
}
