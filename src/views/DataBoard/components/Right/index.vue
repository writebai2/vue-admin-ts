<template>
  <div class="layout-container">
    <div class="layout-container-form">
      <ExportExcel
        :data="vxeGridData.data"
        :header="vxeGridData.columns"
        :engines="engines" />
    </div>
    <div class="layout-container-sql">
      <InputSql />
    </div>
    <div class="layout-container-table">
      <Table :tableOptions="vxeGridData" :loading="loading" />
    </div>
  </div>
</template>

<script setup lang="ts">
import ExportExcel from "./components/exportExcel.vue"
import InputSql from "./components/inputSql.vue"
import Table from "@/components/vxeTable/index.vue"
import { onMounted } from "vue"
import { useSettingStore, useUserStore, useBoardStore } from "@/store/index"
import { storeToRefs } from "pinia"

const useStore = useUserStore()
const boardStore = useBoardStore()
const settingStore = useSettingStore()

const { engines } = storeToRefs(settingStore)
const { loading, vxeGridData } = storeToRefs(boardStore)

// const initTableData = () => {
//   loading.value = true
//   const token = useStore.token
//   if (token) {
//     getTableData(token)
//       .then(({ data }: any) => {
//         dataHeader.value = data.header
//         tableData.value = data.data.data
//       })
//       .catch(() => {
//         dataHeader.value = []
//         tableData.value = []
//       })
//       .finally(() => {
//         loading.value = false
//       })
//   }
// }

const initTableData = async () => {
  const token = useStore.token
  if (token) {
    if (engines.value.length === 0) {
      settingStore.setEngines()
    }
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
