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
