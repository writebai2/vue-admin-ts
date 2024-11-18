import { defineStore } from "pinia"
import { ref } from "vue"
import { useRoute, useRouter } from "vue-router"

export const useTagsViewStore = defineStore(
  "tagsView",
  () => {
    /***
     * @用户标签
     */
    const router = useRouter()
    const route = useRoute()
    const visitedViews = ref<TagView[]>([
      {
        path: "/home",
        title: "首页",
        name: "",
        affix: true,
      },
    ])

    /***
     * @添加tag
     */
    const addVisitedView = (view: TagView) => {
      if (visitedViews.value.some((v) => v.path === view.path)) {
        return
      }
      visitedViews.value.push(view)
    }

    /***
     * @切换tag
     */
    const changeTag = (path: string) => {
      router.push({ path: path })
    }

    /***
     * @删除tag
     */
    const delVisitedView = (path: string) => {
      // 找到点击数据的索引
      for (const [i, v] of visitedViews.value.entries()) {
        if (v.path === path) {
          visitedViews.value.splice(i, 1)
          if (path === route.path) {
            router.push(visitedViews.value[visitedViews.value.length - 1].path)
          }
          break
        }
      }
    }

    /***
     * @激活tag
     */
    const isActive = (path: string) => {
      return path === route.path
    }

    /***
     * @清空tag
     */
    const delAllTag = () => {
      visitedViews.value = []
    }

    return {
      visitedViews,
      addVisitedView,
      changeTag,
      delVisitedView,
      isActive,
      delAllTag,
    }
  },
  {
    persist: {
      key: "tagsView",
    },
  }
)
