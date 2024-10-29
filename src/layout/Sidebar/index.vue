<template>
  <el-menu
    :style="{ width: !isCollapse ? '230px' : '64px' }"
    active-text-color="#4080FF"
    background-color="#304156"
    class="aside-container"
    text-color="#c6c8ccea"
    @open="handleOpen"
    @close="handleClose"
    :collapse="isCollapse"
    :default-active="active">
    <SidebarLogo :collapse="false" />
    <SidebarMenuItem index="1" :menuData="menuData" />
  </el-menu>
</template>

<script setup lang="ts">
import { ref } from "vue"
import SidebarMenuItem from "./components/SidebarMenuItem.vue"
import SidebarLogo from "@/layout/Sidebar/components/SidebarLogo.vue"
import { useRouter } from "vue-router"

const router = useRouter()

const menuData = router.options.routes[0].children
// 菜单展开
const isCollapse = ref(false)
const active = ref("1-1")

const handleOpen = () => {}
const handleClose = () => {}
</script>

<style lang="less" scoped>
.aside-container {
  height: 100%;
  .logo-lg {
    font-size: 20px;
    text-align: center;
    height: 50px;
    line-height: 50px;
    color: #fff;
  }
}
</style>
