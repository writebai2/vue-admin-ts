<template>
  <div class="layout">
    <div class="layout-menu" :class="{ 'layout-min-menu': flag }">
      <!-- 标题与logo -->
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue"

const flag = ref(true)
const dark = ref(true)
let isflag = ref(true)
</script>

<style scoped></style>
