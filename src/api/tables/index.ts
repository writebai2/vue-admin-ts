import request from "@/utils/request"
import { tableDataResult, vxeTableDataResult } from "../type/table"

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
