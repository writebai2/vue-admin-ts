<template>
  <div class="system-table-box">
    <el-table
      v-bind="$attrs"
      ref="table"
      class="system-table"
      border
      height="100%"
      :data="data"
      table-layout="auto">
      <el-table-column label="序号" width="60" align="center" v-if="showIndex">
        <template #default="scope">
          {{ scope.$index + 1 }}
        </template>
      </el-table-column>
      <slot></slot>
    </el-table>
  </div>
</template>

<script setup lang="ts">
import { onActivated, PropType, ref } from "vue"

interface Data {
  name: string
  value: string
}

defineProps({
  // 数据源
  data: {
    type: Array as PropType<Data[]>,
    default: () => [],
  },
  // 已选择的数据，与selection结合使用
  select: { type: Array, default: () => [] },
  //   是否展示index，默认否
  showIndex: {
    type: Boolean,
    default: false,
  },
  //   是否展示选择框，默认否
  showSelection: {
    type: Boolean,
    default: false,
  },
})

const table: any = ref(null)

onActivated(() => {
  table.value.doLayout()
})
</script>

<style scoped>
.system-table-box {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  height: 100%;
  .system-table {
    flex: 1;
    height: 100%;
  }
}
</style>
