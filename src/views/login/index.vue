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
          ref="loginFormRef"
          :model="loginFormData"
          :rules="loginFormRules"
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
              prefix-icon="Lock" />
          </el-form-item>
          <el-form-item>
            <el-button
              size="large"
              type="primary"
              :loading="loading"
              :style="{ width: '100%' }"
              @click="handleLogin">
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
import { loginApi } from "@/api/login/index"
import { type FormInstance, type FormRules } from "element-plus"
import router from "@/router"

const imgUrl = new URL("@/assets/login/login-head.png", import.meta.url).href
const formType = ref(false)
const handleChange = () => {
  formType.value = !formType.value
}

/** 登录表单元素的引用 */
const loginFormRef = ref<FormInstance | null>(null)
/** 登录表单校验规则 */
const loginFormRules: FormRules = {
  username: [{ required: true, message: "请输入用户名", trigger: "blur" }],
  password: [
    { required: true, message: "请输入密码", trigger: "blur" },
    { min: 8, max: 16, message: "长度在 8 到 16 个字符", trigger: "blur" },
  ],
  code: [{ required: true, message: "请输入邀请码", trigger: "blur" }],
}

// 登录表单
const loginFormData: LoginRequestData = reactive({
  username: "",
  password: "",
  code: "",
})
/** 登录按钮 Loading */
const loading = ref(false)

// 登录
const handleLogin = () => {
  loginFormRef.value?.validate((valid: boolean, fields) => {
    if (valid) {
      loading.value = true
      loginApi(loginFormData)
        .then(({ data }) => {
          router.push({ path: "/" })
        })
        .catch(() => {
          loginFormData.password = ""
        })
        .finally(() => {
          loading.value = false
        })
    } else {
      console.error("表单验证不通过", fields)
    }
  })
}
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
