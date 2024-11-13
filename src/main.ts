import { createApp } from "vue"
import App from "./App.vue"
import router from "./router"
import component from "@/components/index"
import store from "@/store/index"
// main.js
import "virtual:uno.css"
import "@/styles/index.scss"
// 导入mock数据
import "./mock/index"
// 导入路由鉴权
import "./permission"

const app = createApp(App)
app.use(store)
app.use(component)
app.use(router)
router.isReady().then(() => {
  app.mount("#app")
})
