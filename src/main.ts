import { createApp } from "vue"
import App from "./App.vue"
import router from "./router"
// main.js
import "virtual:uno.css"
import "@/styles/index.scss"
// 导入mock数据
import "./mock/index"

const app = createApp(App)
app.use(router)
app.mount("#app")
