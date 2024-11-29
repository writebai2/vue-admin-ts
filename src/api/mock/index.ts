import request from "@/utils/request"
import type { loginResult, loginParams } from "../type/user"
import { tableDataResult, vxeTableDataResult } from "../type/table"

/***
 * @mockjs模拟数据
 */
export const loginApi = (loginParams: loginParams) => {
  return request<loginResult>("/login", "POST", loginParams)
}
export const getUserInfoApi = (token: string) => {
  return request<any>("/user", "POST", { token: token })
}
// 获取tableTree
export const getTableTree = (token: string) => {
  return request<any>("/table/tree", "POST", { token: token })
}
// 获取tableData
export const getTableData = (token: string) => {
  return request<tableDataResult>("/table/data", "POST", { token: token })
}
// 获取vxeTableData
export const getVxeTableData = (token: string) => {
  return request<vxeTableDataResult>("/vxe/table", "POST", { token: token })
}
