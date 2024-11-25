<template>
  <div class="category">
    <div class="header-box">
      <h2>数据列表</h2>
      <el-input size="small" v-model="filterText" placeholder="请输入内容" />
    </div>
    <div class="list">
      <el-scrollbar
        style="
          max-height: 100%;
          --scrollbar-color: rgba(0, 0, 0, 0.45);
          --scrollbar-color-hover: rgba(0, 0, 0, 0.65);
          --scrollbar-rail-vertical-right: 2px 6px 2px auto;
        ">
        <el-tree
          ref="treeRef"
          class="my-tree"
          node-key="id"
          :data="data"
          :props="defaultProps"
          :expand-on-click-node="false"
          default-expand-all
          highlight-current
          :filter-node-method="filterNode" />
        <el-button @click="getTreeData">Default</el-button>
      </el-scrollbar>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, nextTick } from "vue"
import { getTableTree } from "@/api/mock/index"
import { useUserStore } from "@/store/modules/user"
import { ElTree } from "element-plus"

const useStore = useUserStore()

interface Tree {
  [key: string]: any
}

const filterText = ref("")
const active = ref("active")
const treeRef = ref<InstanceType<typeof ElTree>>()
const data = ref([])

const defaultProps = {
  children: "children",
  label: "label",
}

const getTreeData = () => {
  const params = useStore.token
  if (params) {
    getTableTree(params).then((res) => {
      data.value = res.data
      active.value = res.data[0]
      console.log(active.value)

      nextTick(() => {
        treeRef.value && treeRef.value.setCurrentKey(active.value.id)
      })
    })
  }
}

watch(filterText, (val) => {
  treeRef.value!.filter(val)
})

const filterNode = (value: string, data: Tree) => {
  if (!value) return true
  return data.label.includes(value)
}
</script>

<style scoped lang="scss">
.category {
  background: #fff;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  .header-box {
    padding: 10px;
    display: flex;
    align-items: center;
    border-bottom: 1px solid #eee;
    h2 {
      padding: 0;
      margin: 0;
      font-size: 14px;
      display: -webkit-box;
      -webkit-line-clamp: 1;
      line-clamp: 1;
      -webkit-box-orient: vertical;
      overflow: hidden;
      height: 30px;
      line-height: 30px;
    }
    .el-input {
      margin-left: 15px;
      flex: 1;
    }
  }
  .list {
    flex: 1;
    overflow: auto;
    .el-scrollbar {
      height: 100%;
    }
  }
  .my-tree {
    :deep(.el-tree-node__content) {
      height: 36px;
    }
    :deep(.el-tree-node.is-current > .el-tree-node__content) {
      background-color: rgba(64, 158, 255, 0.4);
    }
    :deep(.el-tree-node > .el-tree-node__content) {
      transition: 0.2s;
    }
  }
}
</style>
