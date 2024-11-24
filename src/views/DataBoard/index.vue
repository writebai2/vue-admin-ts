<template>
  <div class="full">
    <div class="left">左侧</div>
    <div class="right">右侧</div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.full {
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  display: flex;
  .left {
    width: 250px;
    background-color: red;
  }
  .right {
    flex: 1;
    width: calc(100% - 250px);
    background-color: blue;
  }
}
</style>
