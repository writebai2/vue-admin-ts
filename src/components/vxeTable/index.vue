<template>
  <vxe-grid
    class="vxe-table"
    v-bind="tableOptions"
    height="auto"
    :loading="loading"
    ref="gridRef"
    :scroll-y="{ enabled: true, gt: 0, mode: 'wheel' }"
    :scroll-x="{ enabled: true, gt: 0 }" />
</template>

<script setup lang="ts">
import { onActivated, ref, watch } from "vue"
import type { VxeGridInstance, VxeGridProps } from "vxe-table"
import { PropType } from "vue"

const props = defineProps({
  tableOptions: {
    type: Object as PropType<VxeGridProps>,
    default: () => {},
  },
  loading: {
    type: Boolean,
    default: false,
  },
  showIndex: {
    type: Boolean,
    default: true,
  },
  showSelection: {
    type: Boolean,
    default: false,
  },
})

const gridRef = ref<VxeGridInstance>()

watch(
  () => props.tableOptions,
  () => {
    if (props.showIndex) {
      props.tableOptions.columns?.unshift({
        type: "seq",
        width: 70,
        fixed: "left",
      })
    }
    if (props.showSelection) {
      props.tableOptions.columns?.unshift({ type: "checkbox", width: 60 })
    }
  },
  { immediate: true }
)

onActivated(() => {
  gridRef.value?.reloadData
})
</script>

<style scoped lang="scss">
// 修改滚动条样式
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
