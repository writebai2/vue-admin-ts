<template>
  <Table :tableOptions="tableOptions" :loading="loading" />
</template>

<script setup lang="ts">
import Table from "@/components/vxeTable/index.vue"
import { useUserStore } from "@/store/index"
import { ref, onMounted } from "vue"
import type { VxeGridProps } from "vxe-table"
import { getVxeTableData } from "@/api/mock/index"

const useStore = useUserStore()
const tableOptions = ref<VxeGridProps>()
// 是否显示加载中
const loading = ref(true)

const initTableData = () => {
  loading.value = true
  const token = useStore.token
  if (token) {
    getVxeTableData(token)
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

onMounted(() => {
  initTableData()
})
</script>

<style scoped></style>
