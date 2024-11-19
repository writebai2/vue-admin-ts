<template>
  <view class="setting">
    <!-- 全屏 -->
    <div
      class="full_Screen"
      @click="toggle"
      v-show="defaultSettings.isFullScreen">
      <img v-if="!isFullscreen" src="@/assets/config/fullScreen.svg" />
      <img v-else src="@/assets/config/nofullScreen.svg" />
    </div>

    <!-- 用户 -->
    <div class="setting-user">
      <el-dropdown trigger="click">
        <div class="user">
          <el-avatar
            :size="35"
            :src="userStore.userinfo.avatar"
            @error="() => true">
            <img src="@/assets/avatar/user.svg" />
          </el-avatar>
          <div class="nickname">{{ userStore.userinfo.username }}</div>
        </div>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="loginOut">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </view>
</template>

<script setup lang="ts">
import { defaultSettings } from "@/config/settings"
import { useFullscreen } from "@vueuse/core"
import { useUserStore } from "@/store/modules/user"
import { messageBox } from "@/Hooks/Element-plus"
import { useRouter, useRoute } from "vue-router"
import { useTagsViewStore } from "@/store/modules/tagsView"

const { isFullscreen, toggle } = useFullscreen()
const userStore = useUserStore()
const router = useRouter()
const route = useRoute()
const tagViewStore = useTagsViewStore()

// 退出登录
const loginOut = async () => {
  await messageBox("提示", "您确定要退出登录吗？")
  userStore.loginOut()
  router.push({
    path: "/login",
    query: {
      url: route.path,
    },
  })
}
</script>

<style scoped lang="scss">
.setting {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  height: $layout-header_height;
  .refresh {
    height: 100%;
    padding: 0px 15px 0px 15px;
    display: flex;
    align-items: center;
    justify-content: center;
    .refreshContent {
      display: flex;
      align-items: center;
      justify-content: center;
    }
    &:hover {
      background-color: $layout-header_hoverbgColor;
    }
  }
  .full_Screen {
    height: 100%;
    padding: 0px 15px 0px 15px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.4s;
    img {
      width: 15px;
      height: 15px;
    }
    &:hover {
      background-color: $layout-header_hoverbgColor;
    }
  }
  .topic {
    height: 100%;
    padding: 0px 15px 0px 15px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.4s;
    img {
      width: 20px;
      height: 20px;
    }
    &:hover {
      background-color: $layout-header_hoverbgColor;
    }
  }
  .setting-user {
    height: 100%;
    padding: 0px 10px 0px 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.4s;
    .user {
      display: flex;
      align-items: center;
      .nickname {
        margin-left: 10px;
        font-size: 14px;
      }
    }
    &:hover {
      .nickname {
        color: black;
      }
      background-color: $layout-header_hoverbgColor;
    }
  }
  .set {
    height: 100%;
    padding: 0px 20px 0px 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.4s;
    position: relative;
    &:hover {
      background-color: $layout-header_hoverbgColor;
    }
  }
}
</style>
