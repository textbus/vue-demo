<script lang="ts" setup>
import { useRootReflectiveInjector } from '@tanbo/vue-di-plugin';
import { Editor } from '@/editor';
import Child from '@/child.vue';
import { onMounted, ref } from 'vue';

const editor = new Editor()
const injector = useRootReflectiveInjector()
injector.parentInjector = editor
const editorRef = ref()

onMounted(() => {
  editor.mount(editorRef.value)
})

</script>
<template>
  <div>
    <div>page</div>
    <div ref="editorRef">

    </div>
    <Child/>
  </div>
</template>
