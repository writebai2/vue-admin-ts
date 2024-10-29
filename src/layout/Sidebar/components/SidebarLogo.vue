<template>
  <div class="logo-container">
    <router-link class="wh-full flex-center" to="/" :key="+collapse">
      <span class="logo-title" v-if="!collapse">数据查询平台</span>
      <span class="logo-title" v-else>SELECT-DATA</span>
    </router-link>
  </div>
</template>

<script setup lang="ts">
defineProps({
  collapse: {
    type: Boolean,
    required: true,
  },
})
</script>

<style lang="less" scoped>
.logo-container {
  width: 100%;
  height: 50px;
  background-color: #2d3748;

  .wh-full {
    width: 100%;
    height: 100%;
  }

  .flex-center {
    display: flex;
    align-items: center;
    // justify-content: center;
  }

  .logo-title {
    flex-shrink: 0; /* 防止容器在空间不足时缩小 */
    margin-left: 45px;
    font-size: 18px;
    font-weight: bold;
    color: white;
  }
}
</style>
