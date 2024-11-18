<template>
  <div
    class="tagView"
    :style="{
      backgroundColor: 'white',
      transition: 'all 0.2s',
    }">
    <el-scrollbar>
      <div class="tags">
        <template v-for="item in visitedViews" :key="item.title">
          <el-tag
            :closable="isAffix(item)"
            @close="delVisitedView(item.path)"
            @click="changeTag(item.path)"
            :class="{ tagItem: true, activeTag: isActive(item.path) }">
            <div class="tagContent">
              <div class="dot" v-show="isActive(item.path)"></div>
              <text>{{ item.title }}</text>
            </div>
          </el-tag>
        </template>
      </div>
    </el-scrollbar>
  </div>
</template>

<script setup lang="ts">
import { useTagsViewStore } from "@/store/modules/tagsView"
import { useRoute } from "vue-router"
import { watch } from "vue"
import { storeToRefs } from "pinia"

const route = useRoute()
const tagsViewStore = useTagsViewStore()

const { visitedViews } = storeToRefs(tagsViewStore)
const { delVisitedView, changeTag, isActive } = tagsViewStore

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
.tagView {
  border-bottom: 1px var(--el-border-color-dark) solid;
  .tags {
    display: flex;
  }
  .tagItem {
    flex-shrink: 0;
    display: flex;
    margin: 5px;
    align-items: center;
    justify-content: space-between;
    padding: 5px 10px 5px 10px;
    border: 1px var(--el-color-primary) solid;
    color: var(--el-color-primary);
    font-size: 10px;
    border-radius: 3px;
    .tagContent {
      display: flex;
      align-items: center;
      justify-content: space-around;
      .dot {
        width: 6px;
        height: 6px;
        background-color: #fff;
        border-radius: 50%;
        margin-right: 5px;
      }
    }

    &:hover {
      cursor: pointer;
    }
    &.activeTag {
      flex-shrink: 0;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 5px 10px 5px 10px;
      font-size: 10px;
      margin: 5px;
      text-align: center;
      color: #fff !important;
      background: #0f5197;
      :deep(.el-tag__close) {
        color: #fff;
      }
      :deep(.el-tag__close):hover {
        background-color: #fff;
        color: #0f5197;
      }
    }
  }
}
</style>
