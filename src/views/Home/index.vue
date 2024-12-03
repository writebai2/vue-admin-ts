<template>
  <div>
    <ExportExcel v-model:title="fileName" v-model:description="description" />
    <el-button type="primary" @click="updatefileName">fileName</el-button>
    <el-button type="primary" @click="updatedescription">fileName</el-button>
    <p>父组件中的 fileName: {{ fileName }}</p>
    <p>父组件中的 description: {{ description }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue"
import ExportExcel from "./test.vue"

function generateRandomLetters(length: number): string {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
  let result = ""
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length)
    result += characters[randomIndex]
  }
  return result
}

// 创建响应式的 fileName
const fileName = ref("originalFileName.xlsx1")
const description = ref("This is a file description.1")

const updatefileName = () => {
  fileName.value = generateRandomLetters(12)
}

const updatedescription = () => {
  description.value = generateRandomLetters(12)
}
</script>
