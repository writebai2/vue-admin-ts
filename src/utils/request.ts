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
service.interceptors.response.use((response: AxiosResponse) => {
  // 检查配置的响应类型是否为二进制类型（'blob' 或 'arraybuffer'）, 如果是，直接返回响应对象
  if (
    response.config.responseType === "blob" ||
    response.config.responseType === "arraybuffer"
  ) {
    return response
  }

  const { code, data, msg } = response.data
  if (code === ResultEnum.SUCCESS) {
    return data
  }

  ElMessage.error(msg || "系统出错")
  return Promise.reject(new Error(msg || "Error"))
})
