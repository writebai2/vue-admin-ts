<template>
  <!-- 中文 -->
  <el-config-provider :locale="zhCn">
    <router-view></router-view>
  </el-config-provider>
</template>

<script setup lang="ts">
import zhCn from "element-plus/es/locale/lang/zh-cn"
import { useUserStoreHook } from "@/store/modules/user"
import { onMounted } from "vue"
import { useRouter } from "vue-router"

onMounted(async () => {
  const userStore = useUserStoreHook()
  const router = useRouter()

  if (Object.keys(userStore.userinfo).length !== 0) {
    userStore.loadRoutes(userStore.userinfo.routes)
    router.replace(router.options.history.location)
  }
})
</script>

<style scoped></style>
