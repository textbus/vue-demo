<script lang="ts" setup>
import { useReflectiveInjector } from '@tanbo/vue-di-plugin';
import { LeftToolbarService } from '@/services/left-toolbar.service';
import { onUnmounted, reactive } from 'vue';
import { Renderer } from '@textbus/core';

const injector = useReflectiveInjector()

const leftToolbarService = injector.get(LeftToolbarService)
const renderer = injector.get(Renderer)

const position = reactive({
  left: 0,
  top: 0,
  show: false
})

const subscription = leftToolbarService.onComponentActive.subscribe(component => {
  if (!component) {
    position.show = false
    return
  }
  const vNode = renderer.getVNodeByComponent(component)
  const nativeNode = renderer.getNativeNodeByVNode(vNode)
  position.show = true
  position.left = nativeNode.offsetLeft
  position.top = nativeNode.offsetTop
})

onUnmounted(() => {
  subscription.unsubscribe()
})

</script>
<template>
  <div class="left-toolbar">
    <button type="button" :style="{
      left: position.left + 'px',
      top: position.top + 'px',
      // display: position.show ? 'block' : 'none'
    }">+
    </button>
  </div>
</template>
<style lang="scss" scoped>
button {
  position: absolute;
}

.left-toolbar {
  position: absolute;
  left: -30px;
  top: 0;
}
</style>
