<template>
  <div class="layout_logo" v-show="true" @click="pushHome">
    <img :src="basic.logo" alt="" />
    <view class="title" v-show="!flag">{{ basic.title }}</view>
  </div>
</template>

<script setup lang="ts">
import { basic } from "@/config/settings"
import { useRouter } from "vue-router"
import { useSettingStore } from "@/store/index"
import { storeToRefs } from "pinia"

const settings = useSettingStore()
const { flag } = storeToRefs(settings)

const router = useRouter()
const pushHome = () => {
  router.push({
    path: "/",
  })
}
</script>

<style scoped lang="scss">
.layout_logo {
  display: flex;
  align-items: center;
  justify-content: center;
  height: $layout-Logo-height;
  border-bottom: 1px solid #302f2f;
  img {
    width: $layout-logo_width;
    height: $layout-logo_height;
  }
  .title {
    font-size: $layout-title_size;
    // font-weight: bold;
    color: $layout-title_color;
    overflow: hidden;
    white-space: nowrap;
    margin-left: 5px;
    text-overflow: ellipsis;
  }
}
</style>
