<template>
  <el-container>
    <SidebarMenu />
    <el-container>
      <el-header>Header</el-header>
      <el-main>Main</el-main>
    </el-container>
  </el-container>
</template>

<script setup lang="ts">
import SidebarMenu from "@/layout/Sidebar/index.vue"
</script>

<style lang="less" scoped>
.el-container {
  height: 100%;
}
</style>
