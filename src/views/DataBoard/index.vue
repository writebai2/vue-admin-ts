<template>
  <div class="full">
    <div class="left">
      <Category />
    </div>
    <div class="right">右侧</div>
  </div>
</template>

<script setup lang="ts">
import Category from "./components/tree.vue"
import { getTableTree } from "@/api/mock/index"
import { useUserStore } from "@/store/modules/user"

const useSotre = useUserStore()
</script>

<style scoped lang="scss">
.full {
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  display: flex;
  .left {
    width: 250px;
  }
  .right {
    flex: 1;
    width: calc(100% - 250px);
    background-color: blue;
  }
}
</style>
