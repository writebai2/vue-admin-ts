<template>
  <div>
    <el-dialog
      v-model="layer.show"
      :title="layer.title"
      :width="layer.width"
      center
      :draggable="draggable">
      <slot></slot>
      <template #footer v-if="layer.showButton">
        <div>
          <el-button type="primary" @click="confirm">确认</el-button>
          <el-button @click="close">取消</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { LayerInterface } from "./type"

const props = defineProps({
  layer: {
    type: Object as () => LayerInterface,
    default: () => {
      return {
        show: false,
        title: "",
        showButton: false,
        draggable: true,
      }
    },
    required: true,
  },
  draggable: {
    type: Boolean,
    default: true,
  },
})

// 定义 emits
const emit = defineEmits(["confirm"])

const confirm = () => {
  emit("confirm")
}

const close = () => {
  props.layer.show = false
}
</script>

<style scoped></style>
