import { defineStore } from "pinia"
import { ref } from "vue"

export const useSettingStore = defineStore(
  "setting",
  () => {
    const flag = ref(false)

    /***
     * @侧边栏折叠
     */
    const changeFlag = () => {
      flag.value = !flag.value
    }
    return {
      flag,
      changeFlag,
    }
  },
  {
    persist: {
      key: "settings",
    },
  }
)
