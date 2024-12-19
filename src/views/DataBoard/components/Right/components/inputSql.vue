<template>
  <codemirror
    v-model="boardStore.textbox.statement"
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
import { ref } from "vue"
import { oneDark } from "@codemirror/theme-one-dark"
import { format } from "sql-formatter"
import { useBoardStore } from "@/store/modules/board"

const boardStore = useBoardStore()
// 格式化sql
const formatSql = () => {
  boardStore.textbox.statement = format(boardStore.textbox.statement)
}
// @ts-ignore
const extensions = ref([sql(), oneDark])
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
