<template>
  <div class="layout">
    <div class="layout-menu" :class="{ 'layout-min-menu': flag }">
      <!-- 标题与logo -->
      <MenuLogo />
      <el-menu
        router
        :default-active="$route.path"
        :collapse="flag"
        :background-color="variables['menu-background']"
        text-color="#fff"
        :active-text-color="variables['menu-active-text']">
        <MenuItem :menuRouteList="routerMenuList" />
      </el-menu>
    </div>
    <!-- 主体部分 -->
    <view
      class="layout-main"
      :class="{
        'layout-max-main': flag,
      }">
      <!-- 头部 -->
      <div class="layout-header">
        <Header />
      </div>
      <!-- 导航栏 -->
      <TagViews />
      <!-- 主体部分 -->
      <div
        class="main-content"
        :style="{
          backgroundColor: '#f0f2f5',
          transition: 'all 0.2s',
        }">
        <router-view />
      </div>
    </view>
  </div>
</template>

<script setup lang="ts">
import variables from "@/styles/variables.module.scss"
import MenuLogo from "./Menu/components/MenuLogo.vue"
import MenuItem from "./Menu/components/MenuItem.vue"
import TagViews from "./components/TagViews/index.vue"
import Header from "./components/Header/index.vue"
import { useUserStore, useSettingStore } from "@/store/index"
import { storeToRefs } from "pinia"

const userStore = useUserStore()
const { routerMenuList } = storeToRefs(userStore)

// 设置
const settings = useSettingStore()
const { flag } = storeToRefs(settings)
</script>

<style scoped lang="scss">
@use "./index.scss";
</style>
