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
import { getVxeTableData, getTextbox } from "@/api/mock/index"
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
const engine = ref<string>("")
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

const getTextBox = async (id: number, textBoxName: string) => {
  const token = useStore.token
  if (token) {
    await getTextbox(token, id)
      .then(({ data }) => {
        engine.value = data.engine
        sqlText.value = data.sqlText
        fileName.value = textBoxName
      })
      .catch(() => {
        engine.value = ""
        sqlText.value = ""
        fileName.value = ""
      })
  }
}

watch(
  () => active.value,
  (newActive) => {
    let runNext = true
    if (newActive.disabled === undefined) {
      runNext = true
    } else {
      runNext = Object.keys(newActive).length === 0 && !newActive.disabled
    }

    if (runNext) return
    getTextBox(newActive.id, newActive.label)
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
