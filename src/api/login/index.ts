import request from "@/utils/request"
import type * as Login from "./types/login"

/* 登录并返回 Token */
export function loginApi(data: Login.LoginRequestData) {
  return request<Login.LoginResponseData>({
    url: "users/login",
    method: "post",
    data,
  })
}
