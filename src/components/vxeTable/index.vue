<template>
  <vxe-grid v-bind="tableData"></vxe-grid>
</template>

<script setup lang="ts">
import { ref } from "vue"
import type { VxeGridProps } from "vxe-table"
import { getVxeTableData } from "@/api/mock/index"
import { useUserStore } from "@/store/modules/user"

const tableData = ref(null)
const useSotre = useUserStore()

getVxeTableData(useSotre.token).then(({ data }: any) => {
  tableData.value = data[0]
})
</script>

<style scoped lang="scss"></style>
