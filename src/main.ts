import { createApp } from "vue"
import App from "./App.vue"
import router from "./router"
// main.js
import "virtual:uno.css"
import "@/styles/index.scss"
// 导入mock数据
// import "./mock/index"
// 导入自定义插件
import setupPlugins from "@/plugins"

const app = createApp(App)
app.use(setupPlugins)
router.isReady().then(() => {
  app.mount("#app")
})
