/***
 * @路由鉴权
 */
import NProgress from "@/utils/nprogress"
import { basic } from "@/config/settings"
import router from "@/router"
import { useUserStoreHook } from "@/store/modules/user"
import { GETTOKEN, REMOVETOKEN } from "@/utils/local"

export function setupPermission() {
  // 白名单路由
  const whiteList = ["/login"]

  // 全局前置守卫
  router.beforeEach(async (to, from, next) => {
    NProgress.start()

    document.title = `${basic.title}-${to.meta.title}`
    const hasToken = GETTOKEN()

    if (hasToken) {
      if (to.path === "login") {
        // 如果已经登录，跳转首页
        next({ path: "/" })
        NProgress.done()
      } else {
        const userStore = useUserStoreHook()
        const hasRoles =
          userStore.userinfo.routes && userStore.userinfo.routes.length > 0

        if (hasRoles) {
          // 如果未匹配到任何路由，跳转到404页面
          if (to.matched.length === 0) {
            next(from.name ? { name: from.name } : "/404")
          } else {
            // 如果路由参数中有title，覆盖路由元信息中的title
            const title =
              (to.params.title as string) || (to.query.title as string)
            if (title) {
              to.meta.title = title
            }
            next()
          }
        } else {
          try {
            await userStore.getUserInfo(hasToken)
            next({ ...to, replace: true })
          } catch (error: any) {
            REMOVETOKEN()
            next({ path: "/login", query: { url: to.path } })
            NProgress.done()
          }
          // 判断有没有用户信息
          //   if (Object.keys(userStore.userinfo).length === 0) {
          //     try {
          //       await userStore.getUserInfo(hasToken)
          //       next({ ...to, replace: true })
          //     } catch (error: any) {
          //       message("error", error.message)
          //       userStore.loginOut()
          //       next({ path: "/login", query: { url: to.path } })
          //       NProgress.done()
          //     }
          //   } else {
          //     next()
          //   }
        }
      }
    } else {
      // 未登录
      if (whiteList.includes(to.path)) {
        // 在白名单，直接进入
        next()
      } else {
        // 不在白名单，重定向到登录页
        next({ path: "/login", query: { url: to.path } })
        NProgress.done()
      }
    }
  })
}

// //全局前置守卫
// router.beforeEach(async (to, from, next) => {
//   //在其他文件拿pinia数据，需要传入pinia实例
//   const userStore = useUserStoreHook()

//   nprogress.start()
//   document.title = `${basic.title}-${to.meta.title}`
//   //用户信息
//   const userInfo = userStore.userinfo
//   if (GETTOKEN()) {
//     if (to.path !== "/login") {
//       //判断有没有用户信息
//       if (Object.keys(userInfo).length === 0) {
//         try {
//           await userStore.getUserInfo(GETTOKEN()!)
//           next({ ...to })
//         } catch (error: any) {
//           message("error", error.message)
//           userStore.loginOut()
//           next({ path: "/login", query: { url: to.path } })
//         }
//       } else {
//         next()
//       }
//     } else {
//       next({ path: "/" })
//     }
//   } else {
//     if (to.path !== "/login") {
//       next({ path: "/login", query: { url: to.path } })
//     } else {
//       next()
//     }
//   }
// })

//全局后置守卫
router.afterEach((to, from, next) => {
  NProgress.done()
})
