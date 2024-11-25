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
     * @关闭tag
     */
    const closeTab = (path: string) => {
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
     * @清空其他tag
     */
    const delOtherTag = (path: string) => {
      visitedViews.value = visitedViews.value.filter((v) => {
        return v.path === path || v?.affix === true
      })
    }

    return {
      visitedViews,
      addVisitedView,
      closeTab,
      isActive,
      delOtherTag,
    }
  },
  {
    persist: {
      key: "tagsView",
    },
  }
)
