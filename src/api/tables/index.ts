import request from "@/utils/request"
import {
  tableDataResult,
  vxeTableDataResult,
  TableTextBox,
  TableTreeResult,
} from "../type/table"

// 获取tableTree
export const getTableTree = () => {
  return request<TableTreeResult>("/table/tree", "GET")
}
// 获取tableData
export const getTableData = (token: string) => {
  return request<tableDataResult>("/table/data", "POST", { token: token })
}
// 获取vxeTableData
export const getVxeTableData = (card_id: number, statement: string) => {
  return request<vxeTableDataResult>("/query/general", "POST", {
    card_id: card_id,
    statement: statement,
  })
}
// 获取查询引擎列表
export const getEngines = () => {
  return request<String[]>("/table/engines", "GET")
}
// 获取每个查询的配套信息
export const getTextbox = (textbox_id: number) => {
  return request<TableTextBox>(`/table/textbox/${textbox_id}`, "GET")
}

// textbox信息更新
export const updateTextBox = (
  textbox_id: number,
  engine_id: number,
  statement: string
) => {
  return request<TableTextBox>(`/table/textbox/${textbox_id}`, "POST", {
    engine_id: engine_id,
    statement: statement,
  })
}
