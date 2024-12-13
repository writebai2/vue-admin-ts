<template>
  <codemirror
    v-model="sqlCode"
    placeholder="请输入sql语句"
    :autofocus="true"
    :indent-with-tab="true"
    :tab-size="2"
    :style="{ width: '100%', height: '100%' }"
    :extensions="extensions"
    :scrollbarStyle="null"
    @blur="formatSql" />
</template>

<script setup lang="ts">
import { Codemirror } from "vue-codemirror"
import { sql } from "@codemirror/lang-sql"
import { ref, toRef, watch } from "vue"
import { oneDark } from "@codemirror/theme-one-dark"
import { format } from "sql-formatter"

const props = defineProps({
  sqlText: {
    type: String,
    default: "",
  },
})

// 格式化sql
const formatSql = () => {
  sqlCode.value = format(sqlCode.value)
}

// 双向绑定
const sqlText = toRef(props, "sqlText")
const sqlCode = ref(sqlText.value)

const emit = defineEmits(["update:sqlText"])
// @ts-ignore
const extensions = ref([sql(), oneDark])

watch(sqlCode, (newValue) => {
  emit("update:sqlText", newValue)
})

watch(sqlText, (newValue) => {
  sqlCode.value = format(newValue)
})
</script>

<style lang="scss" scoped>
:deep(.cm-editor) {
  border-radius: 0px;
  outline: none;
  border: 1px solid #fff;
  .cm-scroller {
    border-radius: 0px;
  }
}
:deep(.cm-focused) {
  border: 1px solid #fff;
}
</style>
