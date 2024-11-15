import request from "@/utils/request"
import type { loginResult, loginParams } from "../type/user"

/***
 * @mockjs模拟数据
 */
export const loginApi = (loginParams: loginParams) => {
  return request<loginResult>("/login", "POST", loginParams)
}
export const getUserInfoApi = (token: string) => {
  return request<any>("/user", "POST", { token: token })
}
