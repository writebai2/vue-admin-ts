<template>
  <div class="layout-container">
    <div class="layout-container-form">
      <ExportExcel />
    </div>
    <div class="layout-container-table">数据</div>
  </div>
</template>

<script setup lang="ts">
import ExportExcel from "./Header/exportExcel.vue"
</script>

<style lang="scss" coped>
.layout-container {
  background: #fff;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  &-form {
    display: flex;
    justify-content: space-between;
    height: 50px;
    padding: 0px 15px 0;
    &-handle {
      display: flex;
      justify-content: flex-start;
    }
    &-search {
      display: flex;
      justify-content: flex-end;
      .search-btn {
        margin-left: 15px;
      }
    }
    .el-form-item {
      margin-bottom: 0;
    }
  }
  &-table {
    flex: 1;
    height: 100%;
    padding: 15px;
    overflow: auto;
  }
}
</style>
