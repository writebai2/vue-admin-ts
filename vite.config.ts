import { defineConfig, loadEnv } from "vite"
import vue from "@vitejs/plugin-vue"
// UnoCSS
import UnoCSS from "unocss/vite"
// element-plus
import AutoImport from "unplugin-auto-import/vite"
import Components from "unplugin-vue-components/vite"
import { ElementPlusResolver } from "unplugin-vue-components/resolvers"
// 别名
import { resolve } from "path"
// 导入vux-table
import { lazyImport, VxeResolver } from "vite-plugin-lazy-import"

const pathType = resolve(__dirname, "./types")

export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd())

  console.log(env)
  console.log(process.env.NODE_ENV)

  return {
    base: "./",
    plugins: [
      vue(),
      UnoCSS(),
      // element
      AutoImport({
        resolvers: [ElementPlusResolver()],
        dts: resolve(pathType, "auto-imports.d.ts"),
      }),
      Components({
        resolvers: [ElementPlusResolver({ importStyle: "sass" })],
        dts: resolve(pathType, "components.d.ts"),
      }),
      // vxe-table
      lazyImport({
        resolvers: [
          VxeResolver({
            libraryName: "vxe-table",
          }),
        ],
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
          additionalData: `  
          @use "@/styles/element/index.scss" as *;
          @use "@/config/public.scss" as *;
          `,
        },
      },
    },
    // 配置代理跨域
    server: {
      port: Number(env.VITE_PORT),
      host: env.VITE_HOST,
      proxy: {
        [env.VITE_BASE_URL]: {
          target: env.VITE_URL,
          changeOrigin: true,
          // rewrite: (path) => path.replace(/^\/api/, ""),
        },
      },
    },
    build: {
      // 配置是否输出警告
      minify: "terser",
      terserOptions: {
        compress: {
          // 关闭vue生产环境中的警告
          drop_console: true, // 移除 console.log
          drop_debugger: true, // 移除 debugger
          warnings: false, // 关闭警告
        },
      },
    },
    // 控制是否输出 warnings
    esbuild: {
      // 关闭 esbuild 警告
      logLevel: "silent", // 生产环境中不输出警告
    },
  }
})
