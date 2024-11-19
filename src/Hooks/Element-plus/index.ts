import { ElMessage, ElMessageBox, ElNotification } from "element-plus"
// 提示
export const message = (type: string, message: string) => {
  ElMessage({
    // @ts-expect-error 禁止飘红
    message,
    type,
    plain: true, // 设置文本、类型是否为纯文本
    duration: 1000, // 消息显示的持续时间
  })
}

// 通知
export const notification = (title: string, message: string, type: string) => {
  ElNotification({
    // @ts-expect-error 禁止飘红
    title,
    message,
    type,
    duration: 1000, // 消息显示的持续时间
    showClose: false, // 是否显示关闭按钮
  })
}

// 确认弹窗
/* 
messageBox 函数接受三个参数：title、content 和 type。
title 参数是确认弹窗的标题。
content 参数是要显示的弹窗内容。
type 参数用于指定弹窗的类型。
函数使用 ElMessageBox.confirm 方法显示一个确认弹窗，用户可以选择“确定”或“取消”。
如果用户点击“确定”，则 resolve("ok") 被调用，表示确认操作。
如果用户点击“取消”，则 reject("用户点击取消！") 被调用，表示用户取消了操作。
*/
export const messageBox = async (
  title: string,
  content: string,
  type: string = "primary"
) => {
  await new Promise((resolve, reject) => {
    //@ts-expect-error 禁止飘红
    ElMessageBox.confirm(content, title, {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type,
    })
      .then(() => {
        resolve("true")
      })
      .catch(() => {
        return
      })
  })
}
