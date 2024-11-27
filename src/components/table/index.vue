<template>
  <div class="system-table-box">
    <el-table
      ref="table"
      :data="data"
      border
      class="system-table"
      table-layout="auto">
      <el-table-column label="序号" width="60" align="center" v-if="showIndex">
        <template #default="scope">
          {{ scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column
        v-for="(item, index) in dataHeader"
        :key="index"
        :prop="item.prop"
        :width="item.width"
        :label="item.label ? item.label : item.prop" />
    </el-table>
  </div>
</template>

<script setup lang="ts">
import { tableHeader } from "@/api/type/table"

defineProps({
  // 数据源
  data: {
    type: Array,
    default: [],
  },
  // 表头
  dataHeader: {
    type: Array<tableHeader>,
    default: [],
  },
  // 已选择的数据，与selection结合使用
  select: {
    type: Array,
    default: [],
  },
  // 是否展示index选择，默认否
  showIndex: {
    type: Boolean,
    default: false,
  },
  // 是否展示选择框，默认否
  showSelection: {
    type: Boolean,
    default: false,
  },
})
</script>

<style lang="scss" scoped>
.system-table-box {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  .system-table {
    flex: 1;
    height: 100%;
  }
}
</style>
