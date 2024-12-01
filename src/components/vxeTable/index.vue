<template>
  <vxe-grid class="vxe-table" v-bind="tableData" height="auto"></vxe-grid>
</template>

<script setup lang="ts">
import { ref } from "vue"
import { getVxeTableData } from "@/api/mock/index"
import { useUserStore } from "@/store/modules/user"
import type { VxeGridInstance } from "vxe-table"

const tableData = ref(null)
const useSotre = useUserStore()
const gridRef = ref<VxeGridInstance>()
const loading = ref(false)

getVxeTableData(useSotre.token).then(({ data }: any) => {
  tableData.value = data[0]
  tableData.value["loading"] = loading.value
  // tableData.value["height"] = 300
  console.log(tableData.value)
})
</script>

<style scoped lang="scss">
// 滚动条样式
.vxe-table {
  ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }
  ::-webkit-scrollbar-thumb {
    border-radius: 4px;
  }
}

/** 默认模式 */
[data-vxe-ui-theme="light"] {
  .vxe-table {
    ::-webkit-scrollbar-track,
    ::-webkit-scrollbar-corner {
      background-color: #ffffff;
    }
    ::-webkit-scrollbar-thumb {
      background-color: #bfbfbf;
    }
    ::-webkit-scrollbar-thumb:hover,
    ::-webkit-scrollbar-thumb:active {
      background-color: #787878;
    }
  }
}
</style>
