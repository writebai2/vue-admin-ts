<template>
  <Layer :layer="layer" @confirm="submit">
    <el-form
      ref="form"
      :rules="rules"
      :model="ruleForm"
      label-width="120px"
      style="margin-right: 30px">
      <el-form-item label="Activity name" prop="name">A</el-form-item>
      <el-form-item label="Activity zone" prop="zone">B</el-form-item>
      <el-form-item label="Activity time" prop="time">C</el-form-item>
    </el-form>
  </Layer>
</template>

<script setup lang="ts">
import Layer from "@/components/layer/index.vue"
import { PropType, reactive } from "vue"
import { LayerInterface } from "@/components/layer/type"

defineProps({
  layer: {
    type: Object as PropType<LayerInterface>,
    default: () => {
      return {
        show: false,
        title: "",
        showButton: true,
      }
    },
  },
})

const submit = () => {
  console.log("确认")
}

const rules = reactive({
  field1: [{ required: true, message: "请输入", trigger: "blur" }],
  field2: [{ required: true, message: "请选择", trigger: "change" }],
})
const ruleForm = reactive({
  name: "",
})
</script>

<style scoped></style>
