import { defineStore } from "pinia"
import { ref } from "vue"
import { getEngines } from "@/api/mock/index"
import { store } from "../index"

export const useSettingStore = defineStore(
  "setting",
  () => {
    const flag = ref(false)
    const engines = ref<any[]>([])

    /***
     * @侧边栏折叠
     */
    const changeFlag = () => {
      flag.value = !flag.value
    }

    const setEngines = async (token: string) => {
      const res = await getEngines(token)
      if (res.code === 200) {
        engines.value = res.data
        return
      } else {
        return Promise.reject(new Error(res.message))
      }
    }

    return {
      flag,
      engines,
      changeFlag,
      setEngines,
    }
  },
  {
    persist: {
      key: "settings",
    },
  }
)

/** 在 setup 外使用 */
export function useSettingStoreHook() {
  return useSettingStore(store)
}
