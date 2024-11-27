<template>
  <codemirror
    v-model="sqlCode"
    placeholder="请输入sql语句"
    :autofocus="true"
    :indent-with-tab="true"
    :tab-size="2"
    :style="{ width: '100%', height: '100%' }"
    :extensions="extensions"
    :scrollbarStyle="null" />
</template>

<script setup lang="ts">
import { Codemirror } from "vue-codemirror"
import { sql } from "@codemirror/lang-sql"
import { ref } from "vue"
import { oneDark } from "@codemirror/theme-one-dark"

const sqlCode = ref()
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
