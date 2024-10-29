import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"
import path, { resolve } from "path"
// ElementUi 引入
import AutoImport from "unplugin-auto-import/vite"
import Components from "unplugin-vue-components/vite"
import { ElementPlusResolver } from "unplugin-vue-components/resolvers"
// mock 模拟数据
import { viteMockServe } from "vite-plugin-mock"

const pathSrc = path.resolve(__dirname, "./types")

export default defineConfig(({ command }) => {
  return {
    plugins: [
      vue(),
      viteMockServe({
        // mock 文件路径
        mockPath: "src/mock",
        // 只有开发环境才开启mock
        enable: command === "serve",
      }),
      AutoImport({
        resolvers: [ElementPlusResolver()],
        dts: resolve(pathSrc, "auto-imports.d.ts"),
      }),
      Components({
        resolvers: [ElementPlusResolver()],
        dts: resolve(pathSrc, "components.d.ts"),
      }),
    ],
    resolve: {
      alias: {
        "@": resolve(__dirname, "./src"),
      },
    },
    server: {
      port: 3000,
    },
  }
})
