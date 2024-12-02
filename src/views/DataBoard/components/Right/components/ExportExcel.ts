import XLSXS from "xlsx-js-style"

export interface Header {
  field: string
  title: string
  width?: number
}

export const aoaToSheetXlsx = (
  header: Header[],
  data: any[],
  bookName: string
) => {
  const tableHeader = header.map((item) => {
    return item.title ? item.title : item.field
  })
  const fields = header.map((item) => {
    return item.field
  })

  const tableData = data.map((item) => {
    return fields.map((field) => {
      return item[field]
    })
  })

  if (tableHeader.length > 0) {
    tableData.unshift(tableHeader)
  }

  // 创建工作表
  const sheet = XLSXS.utils.aoa_to_sheet(tableData)
  // 创建工作簿
  const book = XLSXS.utils.book_new()
  // 添加工作表
  XLSXS.utils.book_append_sheet(book, sheet)
  // 导出 Excel 文件
  XLSXS.writeFile(book, bookName)
}
