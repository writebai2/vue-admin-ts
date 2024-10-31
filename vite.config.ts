import { defineConfig, loadEnv } from "vite"
import vue from "@vitejs/plugin-vue"
// UnoCSS
import UnoCSS from "unocss/vite"
// element-plus
import AutoImport from "unplugin-auto-import/vite"
import Components from "unplugin-vue-components/vite"
import { ElementPlusResolver } from "unplugin-vue-components/resolvers"
// Mock
import { viteMockServe } from "vite-plugin-mock"
// 别名
import { resolve } from "path"

const pathType = resolve(__dirname, "./types")

export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd())
  return {
    base: "./",
    plugins: [
      vue(),
      UnoCSS(),
      // mock
      viteMockServe({
        // mock 文件路径
        mockPath: "./src/mock",
        // 只有开发环境才开启mock
        enable: command === "serve",
      }),
      // element
      AutoImport({
        resolvers: [ElementPlusResolver()],
        dts: resolve(pathType, "auto-imports.d.ts"),
      }),
      Components({
        resolvers: [ElementPlusResolver({ importStyle: "sass" })],
        dts: resolve(pathType, "components.d.ts"),
      }),
    ],
    resolve: {
      alias: {
        "@": resolve(__dirname, "./src"),
      },
    },
    server: {
      port: 3000,
      proxy: {
        [env.VITE_BASE_URL]: {
          target: env.VITE_URL,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ""),
        },
      },
    },
  }
})
