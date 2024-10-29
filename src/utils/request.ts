import axios, { type InternalAxiosRequestConfig, AxiosResponse } from "axios"
import qs from "qs"

const service = axios.create({
  baseURL: "/api",
  timeout: 50000,
  headers: { "Content-Type": "application/json;charset=utf-8" },
  paramsSerializer: (params) => {
    return qs.stringify(params)
  },
})

// 请求拦截器
service.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    return config
  },
  (error: any) => {
    return Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  (response: AxiosResponse) => {
    // apiData 为后端返回数据
    const apiData = response.data
    // 二进制数据直接返回
    const responseType = response.request?.responseType
    if (responseType === "blob" || responseType === "arraybuffer")
      return apiData
    // 获取后端 code
    const code = apiData.code
    // 如果没有 code，则返回异常
    if (code === undefined) {
      ElMessage.error("非本系统接口")
      return Promise.reject(new Error("非本系统接口"))
    }
    switch (code) {
      case 200:
        return apiData
      // case 401:
      //   // Token 过期时
      //   return logout()
      default:
        // 不是正确的 code
        ElMessage.error(apiData.message || "Error")
        return Promise.reject(new Error("Error"))
    }
  },
  (error: any) => {
    // status 是 HTTP 状态码
    if (error.response) {
      const code = error.response.status
      switch (code) {
        case 400:
          error.message = "请求错误"
          break
        case 401:
          // Token 过期时
          // logout()
          break
        case 403:
          error.message = "拒绝访问"
          break
        case 404:
          error.message = "请求地址出错"
          break
        case 408:
          error.message = "请求超时"
          break
        case 500:
          error.message = "服务器内部错误"
          break
        case 501:
          error.message = "服务未实现"
          break
        case 502:
          error.message = "网关错误"
          break
        case 503:
          error.message = "服务不可用"
          break
        case 504:
          error.message = "网关超时"
          break
        case 505:
          error.message = "HTTP 版本不受支持"
          break
        default:
          break
      }
      ElMessage.error(error.message)
      return Promise.reject(error)
    }
  }
)

// 导出 axios 实例
export default service
