<template>
  <div class="layout">
    <div class="layout-menu" :class="{ 'layout-min-menu': flag }">
      <!-- 标题与logo -->
      <MenuLogo />
      <el-menu
        router
        :default-active="$route.path"
        :collapse="flag"
        :background-color="
          dark
            ? variables['menu-background-dark']
            : variables['menu-background']
        "
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
      <!-- 导航栏 -->
      <!-- 主体部分 -->
      <div
        class="main-content"
        :style="{
          backgroundColor: dark ? '#1D1E1F' : '#fff',
          transition: 'all 0.2s',
        }">
        <router-view />
      </div>
    </view>
  </div>
</template>

<script setup lang="ts">
import variables from "@/styles/variables.module.scss"
import { ref } from "vue"
import MenuLogo from "./Menu/components/MenuLogo.vue"
import MenuItem from "./Menu/components/MenuItem.vue"
import { useUserStore } from "@/store/modules/user"
import { storeToRefs } from "pinia"

const userStore = useUserStore()
const { routerMenuList } = storeToRefs(userStore)

const flag = ref(false)
const dark = ref(false)
let isflag = ref(true)
</script>

<style scoped lang="scss">
@use "./index.scss";
</style>
