<template>
  <div>
    <span>输入框1：</span>
    <el-input v-model="localTitle" placeholder="请输入" />
  </div>
  <div>
    <span>输入框2：</span>
    <el-input v-model="localDescription" placeholder="请输入" />
  </div>
</template>

<script setup lang="ts">
import { watch, defineProps, defineEmits, toRef, ref } from "vue"

// 使用 defineProps 来接收 modelValue
const props = defineProps({
  title: {
    type: String,
    default: "",
  },
  description: {
    type: String,
    default: "",
  },
})

// 使用 defineEmits 来发射更新事件
const emit = defineEmits(["update:title", "update:description"])

const localTitle = ref(props.title)
const localDescription = ref(props.description)

const title = toRef(props, "title")
const description = toRef(props, "description")

watch([title, description], ([newtitle, newdescription]) => {
  localTitle.value = newtitle
  localDescription.value = newdescription
})

watch(
  [localTitle, localDescription],
  ([newlocalTitle, newlocalDescription]) => {
    emit("update:title", newlocalTitle)
    emit("update:description", newlocalDescription)
  }
)
</script>
