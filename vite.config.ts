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
    // 主题定制（主题覆盖）
    css: {
      preprocessorOptions: {
        scss: {
          javascriptEnabled: true,
          api: "modern-compiler", // 修改api调用方式
          // 自动导入定制化样式文件进行样式覆盖
          additionalData: `@use "@/config/public.scss" as *;`,
        },
      },
    },
    // 配置代理跨域
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
