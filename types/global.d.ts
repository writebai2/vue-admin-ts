/***
 * @页签对象
 */
interface TagView {
  /** 页签名称 */
  name: string
  /** 页签标题 */
  title: string
  /** 页签路由路径 */
  path: string
  /** 页签路由完整路径 */
  // fullPath: string
  /** 页签图标 */
  icon?: string
  /** 是否固定页签 */
  affix?: boolean
}
