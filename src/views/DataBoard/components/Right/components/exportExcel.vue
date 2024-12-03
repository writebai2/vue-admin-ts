<template>
  <div class="layout-container-form-handle">
    <el-input
      size="small"
      v-model="downFileName"
      placeholder="请输入导出文件名" />

    <el-button
      size="small"
      @click="handleExportExcel"
      type="primary"
      icon="Download">
      导出Excel
    </el-button>
  </div>
  <div class="layout-container-form-menu">
    <!-- 开始按钮 -->
    <el-button size="small" @click="runStart" v-if="!runStatus">
      <i class="el-icon-start" />
    </el-button>
    <el-button size="small" @click="runStop" v-else>
      <i class="el-icon-stop" />
    </el-button>

    <!-- 数据引擎 -->
    <el-select
      size="small"
      v-model="selectValue"
      filterable
      placeholder="数据引擎">
      <el-option
        v-for="item in engines"
        :key="item.value"
        :label="item.label"
        :value="item.value" />
    </el-select>

    <!-- 权限管理 -->
    <el-button class="permission-btn" size="small" @click="addRole">
      <i class="permission-svg" />
    </el-button>
    <Layer :layer="layer"></Layer>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, toRef, unref, watch } from "vue"
import { aoaToSheetXlsx } from "./ExportExcel"
import { dayjs } from "element-plus"
import Layer from "../role/layer.vue"
import { LayerInterface } from "@/components/layer/type"

// const startUrl = new URL("@/assets/select/start.svg",import.meta.url).href

const props = defineProps({
  data: {
    type: Array,
    default: [],
  },
  header: {
    type: Array<any>,
    default: [],
  },
  engines: {
    type: Array<any>,
    default: [],
  },
  engine: {
    type: String,
    default: "",
  },
  fileName: {
    type: String,
    default: "",
  },
})

/***
 * @双向绑定
 */
const fileName = toRef(props, "fileName")
const engine = toRef(props, "engine")
const selectValue = ref(engine.value)
const downFileName = ref(fileName.value)

const emit = defineEmits(["update:fileName", "update:engine"])

// 双向更新
watch([selectValue, downFileName], ([newengine, newfileName]) => {
  emit("update:engine", newengine)
  emit("update:fileName", newfileName)
})

watch([engine, fileName], ([newengine, newfileName]) => {
  selectValue.value = newengine
  downFileName.value = newfileName
})

const layer: LayerInterface = reactive({
  show: false,
  title: "权限管理",
  showButton: true,
})

const runStatus = ref(false)

const runStart = () => {
  runStatus.value = !runStatus.value
}

const runStop = () => {
  runStatus.value = !runStatus.value
}

const addRole = () => {
  layer.show = true
}

// 导出 Excel 表格
const handleExportExcel = () => {
  try {
    if (!unref(downFileName).trim()) {
      const newFileName =
        "new_excel_" + dayjs().locale("zh-cn").format("YYYY-MM-DD")

      aoaToSheetXlsx(props.header, props.data, `${newFileName}.xlsx`)
      return
    }
    aoaToSheetXlsx(props.header, props.data, `${unref(downFileName)}.xlsx`)
  } catch (error) {
    ElMessage.error({
      message: "文件导出异常",
      duration: 1000,
      showClose: false,
    })
  }
}
</script>

<style lang="scss" scoped>
.layout-container-form-handle {
  height: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;

  .el-input {
    height: 25px;
  }

  .el-button {
    height: 25px;
    margin-left: 15px;
  }
}
.layout-container-form-menu {
  height: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;

  .el-button {
    width: 25px;
    height: 25px;
    margin: 0;
    padding: 0;
    // border: 0px;
  }

  .el-select--small {
    margin-left: 5px;
    width: 100px;
    height: 25px;
  }

  :deep(.el-select--small .el-select__wrapper) {
    height: 25px;
  }

  .permission-btn {
    width: 25px;
    height: 25px;
    margin-left: 5px;
    .permission-svg {
      display: inline-block;
      width: 13px;
      height: 13px;
      background: url("@/assets/select/permission.svg") center no-repeat;
      background-size: contain;
      align-items: center;
      vertical-align: middle;
    }
  }

  .el-icon-start {
    display: inline-block;
    width: 13px;
    height: 13px;
    background: url("@/assets/select/start.svg") center no-repeat;
    background-size: contain;
    align-items: center;
    vertical-align: middle;
  }
  .el-icon-stop {
    display: inline-block;
    width: 13px;
    height: 13px;
    background: url("@/assets/select/stop.svg") center no-repeat;
    background-size: contain;
    align-items: center;
    vertical-align: middle;
  }
}
</style>
