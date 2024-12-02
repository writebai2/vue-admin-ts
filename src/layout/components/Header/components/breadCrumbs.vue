<template>
  <div class="bread_crumbs" v-if="defaultSettings.isShowMenu">
    <div class="toggle" @click="changeFlag">
      <el-icon size="16">
        <component :is="settings.flag ? 'Expand' : 'Fold'" />
      </el-icon>
    </div>

    <el-breadcrumb class="app-breadcrumb" separator="/">
      <transition-group appear name="breadcrumb">
        <el-breadcrumb-item
          v-for="(item, index) in getBreadcrumb"
          :key="item.path">
          <span
            v-if="
              item.redirect === 'noRedirect' ||
              index == getBreadcrumb.length - 1
            "
            class="no-redirect">
            {{ item.meta.title }}
          </span>
          <a v-else @click.prevent="handleLink(item)">
            {{ item.meta.title }}
          </a>
        </el-breadcrumb-item>
      </transition-group>
    </el-breadcrumb>
  </div>
</template>

<script setup lang="ts">
import { defaultSettings } from "@/config/settings"
import { useSettingStore } from "@/store/index"
import { useRoute, useRouter, type RouteLocationMatched } from "vue-router"
import { computed } from "vue"
import { constRouter } from "@/router/route"

const settings = useSettingStore()
const { changeFlag } = settings

const route = useRoute()
const router = useRouter()

// 计算面包屑
const getBreadcrumb = computed(() => {
  let levelList: RouteLocationMatched[] = []
  levelList = route.matched.filter((item) => item.meta && item.meta.title)
  if (!levelList.some((v) => v.path === "/home")) {
    let homeArr: RouteLocationMatched[] = (constRouter.find((route) => {
      return route.path === "/"
    })?.children ?? []) as RouteLocationMatched[]
    return homeArr!.concat(levelList)
  }
  return levelList
})

// const routeComputed = computed(() => {
//   let isHasHome = route.matched.find((route) => {
//     return route.path === "/"
//   })

//   let breadcrumbRoute = [] as any
//   if (isHasHome) {
//     breadcrumbRoute = route.matched
//   } else {
//     let homeArr = constRouter.find((route) => {
//       return route.path === "/"
//     })?.children

//     breadcrumbRoute = homeArr!.concat(route.matched as any)
//   }
//   return breadcrumbRoute
// })

const handleLink = (item: RouteLocationMatched) => {
  const { redirect, path } = item
  if (redirect) {
    router.push(redirect.toString())
    return
  }
  router.push(path)
}
</script>

<style scoped lang="scss">
.bread_crumbs {
  display: flex;
  align-items: center;
  height: $layout-header_height;
  .toggle {
    display: flex;
    width: 50px;
    justify-content: center;
  }

  .app-breadcrumb {
    margin-left: 10px;
    display: inline-block;
    font-size: 12px;
    .no-redirect {
      color: #606266;
      cursor: text;
    }
    a {
      color: #303133;
    }
  }
}
</style>
