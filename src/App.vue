<template>
  <div>
    <div ref="editorRef"></div>
  </div>
</template>

<script lang="ts" setup>
import { onBeforeUnmount, onMounted, ref } from 'vue';
import { Editor } from '@textbus/editor';
import { createTextbusEditor } from '@/textbus/editor';
const editorRef = ref<HTMLElement>()
let editor: Editor
onMounted(() => {
  editor = createTextbusEditor(editorRef.value!)
})
onBeforeUnmount(() => {
  editor.destroy()
})
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
