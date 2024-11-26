<template>
  <div class="category">
    <div class="header-box">
      <h2>数据列表</h2>
      <el-input size="small" v-model="input" placeholder="请输入内容" />
    </div>
    <div class="list">
      <el-scrollbar>
        <el-tree
          ref="treeRef"
          class="my-tree"
          node-key="id"
          :data="data"
          :props="defaultProps"
          :expand-on-click-node="false"
          default-expand-all
          highlight-current
          :filter-node-method="filterData" />
      </el-scrollbar>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, nextTick, onMounted } from "vue"
import { getTableTree } from "@/api/mock/index"
import { useUserStore } from "@/store/modules/user"
import { ElTree } from "element-plus"

interface Tree {
  [key: string]: any
}

const useStore = useUserStore()
const treeRef = ref<InstanceType<typeof ElTree>>()
const data = ref([])
const active: any = ref("active")
const input = ref("")

const defaultProps = {
  children: "children",
  label: "label",
}

// 数据异步加载
const getTreeData = () => {
  const params = useStore.token
  if (params) {
    getTableTree(params).then((res) => {
      data.value = res.data
      active.value = res.data[0]
      nextTick(() => {
        treeRef.value && treeRef.value.setCurrentKey(active.value.id)
      })
    })
  }
}

// 筛选数据
const filterData = (value: string, data: Tree) => {
  if (!value) return true
  return data.label.includes(value)
}

watch(
  () => input.value,
  (val) => {
    treeRef.value!.filter(val)
  }
)

onMounted(() => {
  getTreeData()
})
</script>

<style scoped lang="scss">
.category {
  background: #fff;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  .header-box {
    height: 50px;
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
    // 行高
    :deep(.el-tree-node__content) {
      height: 36px;
    }
    // 高亮颜色
    :deep(.el-tree-node.is-current > .el-tree-node__content) {
      background-color: rgba(64, 158, 255, 0.4);
    }
    // 过场动画
    :deep(.el-tree-node > .el-tree-node__content) {
      transition: 0.2s;
    }
  }
}
</style>
