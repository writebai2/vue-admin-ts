export interface LayerInterface {
  show: boolean
  title: string
  showButton?: boolean
  width?: number
  draggable?: boolean
  [propName: string]: any
}

export interface LayerType {
  close: Function
}
