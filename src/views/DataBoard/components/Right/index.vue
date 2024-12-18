<template>
  <div class="layout-container">
    <div class="layout-container-form">
      <ExportExcel
        :data="tableOptions.data"
        :header="tableOptions.columns"
        :engines="engines"
        v-model:engine="engine"
        v-model:fileName="fileName" />
    </div>
    <div class="layout-container-sql">
      <InputSql v-model:sqlText="sqlText" />
    </div>
    <div class="layout-container-table">
      <Table :tableOptions="tableOptions" :loading="loading" />
    </div>
  </div>
</template>

<script setup lang="ts">
import ExportExcel from "./components/exportExcel.vue"
import InputSql from "./components/inputSql.vue"
import Table from "@/components/vxeTable/index.vue"
import { getVxeTableData, getTextbox } from "@/api/tables/index"
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
const engine = ref<number>()
const sqlText = ref<string>("")

// 导出文件名
const fileName = ref()

const active: any = inject("active")

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

const watchTextBox = async (id: number, textBoxName: string) => {
  await getTextbox(id)
    .then(({ data }) => {
      engine.value = data.engine_id
      sqlText.value = data.query_statement
      fileName.value = textBoxName
      loading.value = true
      // 出事加载数据
      getVxeTableData(active.value.id, sqlText.value)
        .then(({ data }: any) => {
          tableOptions.value = data
        })
        .catch((error) => {
          console.log(error)

          tableOptions.value = {}
        })
        .finally(() => {
          loading.value = false
        })
    })
    .catch(() => {
      engine.value = 0
      sqlText.value = ""
      fileName.value = ""
    })
}

watch(
  () => active.value,
  (newActive) => {
    let runNext = true
    if (newActive.is_parent === undefined) {
      runNext = true
    } else {
      runNext = Object.keys(newActive).length === 0 && !newActive.is_parent
    }

    if (runNext) return
    watchTextBox(newActive.id, newActive.label)
  },
  { immediate: true }
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
