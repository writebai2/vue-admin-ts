<template>
  <div class="bread_crumbs" v-if="defaultSettings.isShowMenu">
    <div class="toggle" @click="changeFlag">
      <el-icon size="16">
        <component :is="settings.flag ? 'Expand' : 'Fold'" />
      </el-icon>
    </div>

    <el-breadcrumb separator="/">
      <el-breadcrumb-item
        v-for="(item, index) in routeComputed"
        :key="index"
        :to="{ path: item.path }"
        v-show="item.meta.title">
        {{ item.meta.title }}
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script setup lang="ts">
import { defaultSettings } from "@/config/settings"
import { useSettingStore } from "@/store/modules/settings"
import { useRoute } from "vue-router"
import { computed } from "vue"
import { constRouter } from "@/router/route"

const settings = useSettingStore()
const { changeFlag } = settings

const route = useRoute()

// 计算面包屑
const routeComputed = computed(() => {
  let isHasHome = route.matched.find((route) => {
    return route.path === "/"
  })

  let breadcrumbRoute = [] as any
  if (isHasHome) {
    breadcrumbRoute = route.matched
  } else {
    let homeArr = constRouter.find((route) => {
      return route.path === "/"
    })?.children
    breadcrumbRoute = homeArr!.concat(route.matched as any)
  }
  return breadcrumbRoute
})
console.log(routeComputed.value)
</script>

<style scoped lang="scss">
.bread_crumbs {
  display: flex;
  align-items: center;
  height: $layout-header_height;
  .toggle {
    height: 100%;
    display: flex;
    align-items: center;
    width: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .el-breadcrumb {
    margin-left: 10px;
    font-size: 12px;
  }
}
</style>
