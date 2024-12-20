import request from "@/utils/request"
import type { loginResult, loginParams } from "../type/user"

export const loginApi = (loginParams: loginParams) => {
  return request<loginResult>("/login/oauth", "POST", loginParams, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  })
}
export const getUserInfoApi = () => {
  return request<any>("/users/me", "GET")
}

export const getCookie = () => {
  return request<any>("/query/cookie", "GET")
}
