export interface MenuItem {
  path: String
  name?: String
  meta: {
    id: String
    name: String
    icon: String
    path?: String
  }
  children?: MenuItem[]
  component?: Object
}
