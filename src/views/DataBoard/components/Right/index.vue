<template>
  <div class="layout-container">
    <div class="layout-container-form">
      <ExportExcel :data="tableData" :header="dataHeader" />
    </div>
    <div class="layout-container-sql">
      <InputSql />
    </div>
    <div class="layout-container-table">
      <Table
        v-loading="loading"
        :showIndex="false"
        :showSelection="false"
        :data="tableData">
        <el-table-column
          v-for="(item, index) in dataHeader"
          :key="index"
          :prop="item.prop"
          :width="item.width"
          :label="item.label ? item.label : item.prop" />
      </Table>
    </div>
  </div>
</template>

<script setup lang="ts">
import ExportExcel from "./Header/exportExcel.vue"
import InputSql from "./Header/inputSql.vue"
import Table from "@/components/table/index.vue"
import { getTableData } from "@/api/mock/index"
import { useUserStore } from "@/store/modules/user"
import { onMounted, ref } from "vue"
import { tableHeader } from "@/api/type/table"

const useStore = useUserStore()
const dataHeader = ref<tableHeader[]>([])
const tableData = ref<any[]>([])
// 是否显示加载中
const loading = ref(true)

const initTableData = () => {
  loading.value = true
  const token = useStore.token
  if (token) {
    getTableData(token)
      .then(({ data }: any) => {
        dataHeader.value = data.header
        tableData.value = data.data.data
      })
      .catch((error) => {
        dataHeader.value = []
        tableData.value = []
      })
      .finally(() => {
        loading.value = false
      })
  }
}

onMounted(() => {
  initTableData()
})
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
  }
  &-sql {
    display: flex;
    height: 150px;
    padding: 0px 15px;
  }
  &-table {
    flex: 1;
    height: calc(100% - 50px - 150px);
    padding: 0px 15px;
    overflow: auto;
  }
}
</style>
