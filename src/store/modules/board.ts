import { defineStore } from "pinia"
import { ref, reactive } from "vue"
import { TableTreeChild, TableTextBox } from "@/api/type/table"
import { getVxeTableData, getTextbox } from "@/api/tables/index"
import type { VxeGridProps } from "vxe-table"

import localforage from "localforage"

export const useBoardStore = defineStore(
  "board",
  () => {
    const activeCard = reactive<TableTreeChild>({
      write: false,
      read: false,
      id: 0,
      label: "",
      is_parent: false,
    })
    const lastIndex = ref(null)
    const loading = ref(false)
    const vxeGridData = ref<VxeGridProps>({})
    const textbox = reactive<TableTextBox>({
      id: 0,
      card_id: 0,
      engine_id: 0,
      statement: "",
    })

    const cacheCard = localforage.createInstance({
      name: "CACHECARD",
    })

    /***
     * @变更card
     */
    const setCard = async (tree: any) => {
      if (activeCard.id === tree.id && textbox.card_id === tree.id) {
        await getCacheCard(textbox.statement)
        return
      }
      Object.assign(activeCard, tree)

      let res = await getTextbox(activeCard.id)
      if (res.code === 200) {
        const data = res.data
        Object.assign(textbox, data)
        await getCacheCard(textbox.statement)
      } else {
        Object.assign(textbox, {
          id: 0,
          card_id: 0,
          engine_id: 0,
          statement: "",
        })
      }
    }

    /***
     * @card 初始化
     */
    const getCacheCard = async (statement: string) => {
      loading.value = true
      const localData = await GETLOCALDATA(activeCard.id)
      if (localData === null) {
        await getVxeTableData(activeCard.id, statement)
          .then(({ data }: any) => {
            vxeGridData.value = data
            if (data.data.length === 0) {
              DELETELOCALDATA(activeCard.id)
              return
            }
            SETLOCALDATA(activeCard.id, data)
          })
          .catch((err) => {
            vxeGridData.value = {}
          })
          .finally(() => {
            loading.value = false
          })
        return
      }
      vxeGridData.value = localData ? localData : {}
      loading.value = false
    }

    /***
     * @查询
     */
    const handleSelect = async (statement: string) => {
      loading.value = true

      await getVxeTableData(activeCard.id, statement)
        .then(({ data }: any) => {
          vxeGridData.value = data
          if (data.data.length === 0) {
            DELETELOCALDATA(activeCard.id)
            return
          }
          SETLOCALDATA(activeCard.id, data)
        })
        .catch((err) => {
          vxeGridData.value = {}
        })
        .finally(() => {
          loading.value = false
        })
    }

    /***
     * @退出登录
     */
    const logout = () => {
      REMOVELOCALDATA()
      loading.value = false
      vxeGridData.value = {}
      lastIndex.value = null
      Object.assign(activeCard, {
        write: false,
        read: false,
        id: 0,
        label: "",
        is_parent: false,
      })
      Object.assign(textbox, {
        id: 0,
        card_id: 0,
        engine_id: 0,
        statement: "",
      })
    }

    /***
     * @本地存储相关
     */
    // 存储
    const SETLOCALDATA = async (id: number, data: any) => {
      cacheCard.setItem(String(id), data)
    }
    // 获取
    const GETLOCALDATA = async (id: number) => {
      try {
        const value = await cacheCard.getItem(String(id))
        return value
      } catch (err) {
        console.log(err)
        return null
      }
    }
    // 删除
    const DELETELOCALDATA = async (id: number) => {
      cacheCard.removeItem(String(id))
    }
    // 清除
    const REMOVELOCALDATA = async () => {
      cacheCard.clear()
    }

    return {
      activeCard,
      loading,
      vxeGridData,
      textbox,
      lastIndex,
      setCard,
      getCacheCard,
      logout,
      handleSelect,
    }
  },
  {
    persist: {
      // 持久化
      // pick:[],
      omit: ["vxeGridData"],
    },
  }
)
