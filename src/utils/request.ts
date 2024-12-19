import { message } from "@/Hooks/Element-plus"
import { useUserStore, useBoardStore } from "@/store/index"

import axios, {
  type Method,
  AxiosRequestConfig,
  InternalAxiosRequestConfig,
  AxiosResponse,
} from "axios"
// 错误代码
import { error_code } from "./error-code"
import { GETTOKEN } from "./local"

const service = axios.create({
  baseURL:
    process.env.NODE_ENV === "development"
      ? import.meta.env.VITE_BASE_URL
      : `${import.meta.env.VITE_URL}${import.meta.env.VITE_BASE_URL}`,
  timeout: 5000 * 1000,
})
// 请求拦截器
service.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    if (GETTOKEN()) {
      config.headers.Authorization = GETTOKEN()
    }
    return config
  },
  (error: any) => {
    return Promise.reject(error)
  }
)

// 必须先拦截一下
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
    const user = useUserStore()
    const boardStore = useBoardStore()

    // 如果没有 code，则返回异常
    if (code === undefined) {
      message("error", "非本系统接口")
      return Promise.reject(new Error("非本系统接口"))
    }
    switch (code) {
      case 200:
        return apiData
      case 401:
        // Token 过期时
        boardStore.logout()
        user.loginOut()
        return
      default:
        // 不是正确的 code
        message("error", apiData.message || "Error")
        return Promise.reject(new Error("Error"))
    }
  },
  (error) => {
    let error_text = ""
    if (error.response) {
      error_text = error_code(error.response.code) || "网络问题"
    }
    error_text = error_code(error.code) || "网络问题"
    message("error", error_text)
    return Promise.reject(new Error(error))
  }
)

type Data<T> = {
  code: number
  message: string
  data: T
}
const request = <T>(
  url: string,
  method: Method = "get",
  data?: object | string,
  config?: AxiosRequestConfig
) => {
  return service.request<T, Data<T>>({
    url,
    method,
    [method.toLowerCase() === "get" ? "params" : "data"]: data,
    ...config,
  })
}
export default request
