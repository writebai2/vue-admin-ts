<template>
  <div class="layout-container">
    <div class="layout-container-form">
      <ExportExcel :data="tableData" :header="dataHeader" />
    </div>
    <div class="layout-container-sql">
      <InputSql />
    </div>
    <div class="layout-container-table">
      <Table :data="tableData" :dataHeader="dataHeader" />
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

const initTableData = () => {
  const token = useStore.token
  if (token) {
    getTableData(token).then(({ data }) => {
      dataHeader.value = data.header
      tableData.value = data.data
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
    padding: 0px 15px 1px;
  }
  &-table {
    flex: 1;
    height: calc(100% - 50px - 150px);
    padding: 0px 15px;
    overflow: auto;
  }
}
</style>
