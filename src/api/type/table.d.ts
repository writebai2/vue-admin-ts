export interface tableHeader {
  label: string
  width: number
  prop: string
}

export interface tableDataResult {
  header: tableHeader[]
  data: []
}

export interface vxeTableDataResult {
  columns: []
  data: []
}

// 单个卡片详情
export interface TableTextBox {
  id: number
  card_id: number
  engine_id: number
  query_statement: string
}

// 定义树形列表
interface TableTreeBase {
  id: number
  label: string
  is_parent: boolean
}

interface TableTreeChild extends TableTreeBase {
  write: boolean
  read: boolean
}

interface TableTree extends TableTreeBase {
  children: null | TableTreeChild[]
}

export interface TableTreeResult {
  data: null | TableTree[]
  count: number
}
