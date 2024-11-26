<template>
  <div class="layout-container-form-handle">
    <el-input size="small" v-model="fileName" placeholder="请输入导出文件名" />

    <el-button
      size="small"
      type="primary"
      icon="Download"
      class="export-excel-btn">
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
    <el-select size="small" v-model="value" filterable placeholder="数据引擎">
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value" />
    </el-select>

    <!-- 权限管理 -->
    <el-button class="permission-btn" size="small" @click="runStart">
      <i class="permission-svg" />
    </el-button>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue"
import { dayjs } from "element-plus"

// const startUrl = new URL("@/assets/select/start.svg",import.meta.url).href
const defaultName = dayjs().locale("zh-cn").format("YYYY-MM-DD")
const fileName = ref("")

const runStatus = ref(false)

const runStart = () => {
  runStatus.value = !runStatus.value
}

const runStop = () => {
  runStatus.value = !runStatus.value
}

const value = ref("")
const options = [
  {
    value: "mysql",
    label: "mysql",
  },
  {
    value: "vipon_log",
    label: "vipon_log",
  },
]
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
