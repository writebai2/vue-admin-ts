<template>
  <div class="full">
    <div class="left">
      <Category />
    </div>
    <el-divider direction="vertical" />
    <div class="right">
      <TableData />
    </div>
  </div>
</template>

<script setup lang="ts">
import { provide, ref } from "vue"
import Category from "./components/Left/tree.vue"
import TableData from "./components/Right/index.vue"

let active: any = ref({})
provide("active", active)
</script>

<style scoped lang="scss">
.full {
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  display: flex;
  .left {
    width: 250px;
  }
  .right {
    flex: 1;
    width: calc(100% - 250px);
    height: 100%;
  }

  .el-divider--vertical {
    height: 100%;
    margin: 0;
    padding: 0;
  }
}
</style>
