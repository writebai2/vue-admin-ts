<template>
  <el-row class="login-container">
    <el-card style="max-width: 480px">
      <template #header>
        <div class="card-header">
          <img :src="imgUrl" />
        </div>
      </template>

      <div class="jump-link">
        <div class="link-1">
          <el-link type="primary" @click="handleChange">
            {{ formType ? "返回登录" : "注册账号" }}
          </el-link>
        </div>
        <!-- 登录 / 注册表单 -->
        <el-form
          ref="formRef"
          :model="loginFormData"
          label-width="auto"
          status-icon>
          <el-form-item prop="username">
            <el-input
              size="large"
              v-model="loginFormData.username"
              placeholder="请输入用户名"
              prefix-icon="UserFilled" />
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              size="large"
              v-model="loginFormData.password"
              type="password"
              placeholder="请输入密码"
              show-password
              prefix-icon="Lock" />
          </el-form-item>
          <el-form-item v-if="formType" prop="code">
            <el-input
              size="large"
              v-model="loginFormData.code"
              placeholder="请输入邀请码"
              prefix-icon="Lock"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button
              size="large"
              type="primary"
              :style="{ width: '100%' }"
              @click="">
              {{ formType ? "注册账号" : "登录" }}
            </el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
  </el-row>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue"
import { type LoginRequestData } from "@/api/login/types/login"

const imgUrl = new URL("@/assets/login/login-head.png", import.meta.url).href
const formType = ref(false)
const handleChange = () => {
  formType.value = !formType.value
}

// 登录表单
const loginFormData: LoginRequestData = reactive({
  username: "",
  password: "",
  code: "",
})
</script>

<style lang="less" scoped>
:deep(.el-card__header) {
  padding: 0;
}
.login-container {
  height: 100%;
  align-items: center;
  justify-content: center;
  .card-header {
    background-color: #899fe1;
    img {
      width: 430px;
    }
  }
  .jump-link {
    text-align: right;
    margin-bottom: 10px;
    .link-1 {
      margin-bottom: 18px;
    }
  }
}
</style>
