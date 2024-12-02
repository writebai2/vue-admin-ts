<template>
  <div class="layout-container">
    <div class="layout-container-form">
      <ExportExcel
        :data="tableOptions.data"
        :header="tableOptions.columns"
        :engines="engines"
        :engine="engine"
        :fileName="fileName"
        @handleSelect="handleClick"
        @handleFileName="ChangeFileName" />
    </div>
    <div class="layout-container-sql">
      <InputSql />
    </div>
    <div class="layout-container-table">
      <!-- <Table
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
      </Table> -->
      <Table :tableOptions="tableOptions" :loading="loading" />
    </div>
  </div>
</template>

<script setup lang="ts">
import ExportExcel from "./components/exportExcel.vue"
import InputSql from "./components/inputSql.vue"
import Table from "@/components/vxeTable/index.vue"
import { getVxeTableData } from "@/api/mock/index"
import { inject, onMounted, ref, watch } from "vue"
import type { VxeGridProps } from "vxe-table"
import { useSettingStore, useUserStore } from "@/store/index"
import { storeToRefs } from "pinia"

const useStore = useUserStore()
const tableOptions = ref<VxeGridProps>({})
// 是否显示加载中
const loading = ref(true)
const settingStore = useSettingStore()

const { engines } = storeToRefs(settingStore)
const engine = ref("")

// 导出文件名
const fileName = ref()
const ChangeFileName = (val: any) => {
  fileName.value = val
  console.log(fileName.value)
}

const active: any = inject("active")

const handleClick = (val: any) => {
  engine.value = val
}

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
  loading.value = true
  const token = useStore.token
  if (token) {
    if (engines.value.length === 0) {
      settingStore.setEngines(token)
    }
    await getVxeTableData(token)
      .then(({ data }: any) => {
        tableOptions.value = data[0]
      })
      .catch(() => {
        tableOptions.value = {}
      })
      .finally(() => {
        loading.value = false
      })
  }
}

watch(
  () => active.value,
  () => {
    fileName.value = active.value.label
  }
)

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
