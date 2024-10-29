<template>
  <!-- 如果菜单项没有隐藏则显示 -->
  <template v-for="item in menuData">
    <!-- 没有子菜单的情况 -->
    <el-menu-item
      @click="handleClick(item, `${index}-${item.meta.id}`)"
      v-if="!item.children || item.children.length == 0"
      :index="`${index}-${item.meta.id}`"
      :key="`${index}-${item.meta.id}`">
      <el-icon size="20">
        <!-- 动态组件 -->
        <component :is="item.meta.icon" />
      </el-icon>
      <span>{{ item.meta.name }}</span>
    </el-menu-item>

    <!-- 有子菜单情况 -->
    <el-sub-menu v-else :index="`${index}-${item.meta.id}`">
      <template #title>
        <el-icon size="20">
          <component :is="item.meta.icon" />
        </el-icon>
        <span>{{ item.meta.name }}</span>
      </template>
      <SidebarMenuItem
        :index="`${index}-${item.meta.id}`"
        :menuData="item.children" />
    </el-sub-menu>
  </template>
</template>

<script setup lang="ts">
import { PropType } from "vue"
import { MenuItem } from "../types/index"
import router from "@/router"

defineOptions({
  name: "SidebarMenuItem",
  //   控制组件的属性是否应该被继承
  inheritAttrs: false,
})

defineProps({
  /**
   * 当前路由项对象
   */
  menuData: {
    // 使用自定义类型
    type: Object as PropType<MenuItem[]>,
    required: true,
  },
  index: {
    type: String,
    required: true,
  },
})

const handleClick = (item: any, active: String) => {
  router.push({ path: item.meta.path })
}
</script>

<style lang="less" scoped></style>
