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
          :props="treeProps"
          :expand-on-click-node="false"
          highlight-current
          :filter-node-method="filterData"
          @current-change="handleClick" />
      </el-scrollbar>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, nextTick, onMounted, inject } from "vue"
import { getTableTree } from "@/api/tables/index"
import { ElTree } from "element-plus"
import { isNull } from "lodash"

interface Tree {
  [key: string]: any
}

const treeRef = ref<InstanceType<typeof ElTree>>()
const data: any = ref([])
const active: any = inject("active")
const input = ref("")

const treeProps = {
  label: "label",
  children: "children",
  disabled: "is_parent",
}

const filterTree = (treeData: any) => {
  for (const item of treeData) {
    if (item.is_parent && !isNull(item.children) && item.children.length > 0) {
      return filterTree(item.children)
    } else if (!item.is_parent) {
      return item
    }
  }
}

// 数据异步加载
const getTreeData = () => {
  getTableTree().then((res) => {
    data.value = res.data.data
    active.value = filterTree(res.data.data)

    let selectOption_id = active.value.id

    nextTick(() => {
      treeRef.value && treeRef.value.setCurrentKey(selectOption_id)
    })
  })
}

// 筛选数据
const filterData = (value: string, data: Tree) => {
  if (!value) return true
  return data.label.includes(value)
}

// 选择节点
const handleClick = (data: Tree) => {
  const is_parent = data.is_parent
  if (is_parent) return
  active.value = data
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
