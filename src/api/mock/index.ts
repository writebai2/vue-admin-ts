import request from "@/utils/request"
import type { loginResult, loginParams } from "../type/user"
import {
  tableDataResult,
  vxeTableDataResult,
  TableTextBox,
} from "../type/table"

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
// 获取查询引擎列表
export const getEngines = (token: string) => {
  return request<String[]>("/table/engines", "POST", { token: token })
}

// 获取每个查询的配套信息
export const getTextbox = (token: string, textbox_id: number) => {
  return request<TableTextBox>("/table/textbox", "POST", {
    token: token,
    textbox_id: textbox_id,
  })
}
