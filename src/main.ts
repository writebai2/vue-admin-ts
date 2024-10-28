import { createApp } from "vue"
import "./style.css"
import App from "./App.vue"
import store from "@/store"
import router from "@/router"
// load
import { loadPlugins } from "@/plugins"

const app = createApp(App)

loadPlugins(app)

app.use(store).use(router)
router.isReady().then(() => {
  app.mount("#app")
})
