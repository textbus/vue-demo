<script lang="ts" setup>
import { useReflectiveInjector } from '@tanbo/vue-di-plugin';
import { Commander, Renderer, Selection } from '@textbus/core';
import { reactive } from 'vue';

const injector = useReflectiveInjector()

console.log(injector)

const renderer = injector.get(Renderer)
const selection = injector.get(Selection)
const commander = injector.get(Commander)

const viewModel = reactive({
  paths: {}
})

selection.onChange.subscribe(() => {
  viewModel.paths = selection.getPaths()
})

setInterval(() => {
  commander.insert(Math.random().toString())
}, 1000)


</script>
<template>
  <div>
    <div>{{ viewModel.paths }}</div>
  </div>
</template>
