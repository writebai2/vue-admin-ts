<script setup lang="ts">
import pageError from "@/assets/svgs/404.svg"
import { useRouter } from "vue-router"

const { push } = useRouter()

const errorClick = () => {
  push("/")
}
</script>

<template>
  <div class="flex justify-center items-center h-full">
    <div class="text-center">
      <img width="350" :src="pageError" alt="" />
      <div class="text-14px text-[var(--el-color-info)]">
        <span>页面不存在!</span>
      </div>
      <div class="mt-20px">
        <el-button type="primary" @click="errorClick">返回主页</el-button>
      </div>
    </div>
  </div>
</template>
