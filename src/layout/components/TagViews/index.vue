<template>
  <div class="tabs">
    <el-scrollbar class="scroll-container tags-view-container">
      <template v-for="item in visitedViews" :key="item.title">
        <div
          class="tags-view-item"
          :class="isActive(item.path) ? 'active' : ''">
          <router-link :to="{ path: item.path }" v-if="item.title">
            {{ item.title }}
          </router-link>
          <el-icon @click.stop="closeTab(item.path)" v-if="isAffix(item)">
            <Close />
          </el-icon>
        </div>
      </template>
    </el-scrollbar>
  </div>
</template>

<script setup lang="ts">
import { useTagsViewStore } from "@/store/index"
import { useRoute } from "vue-router"
import { watch } from "vue"
import { storeToRefs } from "pinia"

const route = useRoute()
const tagsViewStore = useTagsViewStore()

const { visitedViews } = storeToRefs(tagsViewStore)
const { closeTab, isActive } = tagsViewStore

const isAffix = (tag: TagView) => {
  return !tag?.affix
}

watch(
  () => route.path,
  () => {
    addTage()
  },
  {
    immediate: true, //初始化立即执行
  }
)

function addTage() {
  if (route.meta.title) {
    tagsViewStore.addVisitedView({
      name: route.name as string,
      title: route.meta.title as string,
      path: route.path,
      icon: route.meta?.icon as string | undefined,
    })
  }
}
</script>

<style scoped lang="scss">
.tabs {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 40px;
  background: #fff;
  border-bottom: 1px solid #d8dce5;
  .scroll-container {
    white-space: nowrap;
    position: relative;
    overflow: hidden;
    width: 100%;
    :deep(.el-scrollbar__bar) {
      bottom: 0px;
    }
    :deep(.el-scrollbar__wrap) {
      height: 49px;
    }
  }
  .tags-view-container {
    height: 34px;
    flex: 1;
    width: 100%;
    display: flex;
  }
  .tags-view-item {
    display: inline-flex;
    align-items: center;
    position: relative;
    cursor: pointer;
    height: 26px;
    line-height: 26px;
    border: 1px solid #d8dce5;
    color: #303133;
    background: #fff;
    padding: 0 8px;
    font-size: 12px;
    margin-left: 5px;
    margin-top: 4px;
    border-radius: 2px;
    a {
      height: 26px;
      display: inline-block;
      padding-left: 8px;
      padding-right: 8px;
      color: #303133;
    }
    .el-icon-close {
      display: inline-block;
      height: 26px;
    }
    &:first-of-type {
      margin-left: 15px;
    }
    &:last-of-type {
      margin-right: 15px;
    }
    &.active {
      background: #409eff;
      border-color: #409eff;
      color: #fff;
      a {
        color: #fff;
      }
      &:hover {
        background: #409eff;
      }
    }
    &:hover {
      background-color: rgba(0, 0, 0, 0.06);
    }
  }
}
</style>
