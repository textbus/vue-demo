<template>
  <div data-component="root" ref="rootRef">
    <component :is="slotRender()"/>
  </div>
</template>
<script lang="ts">
// 创建视图 Vue 根组件
import { defineComponent, inject } from 'vue';
import { ViewComponentProps } from '@textbus/adapter-vue';
import { createVNode } from '@textbus/core';
import { AdapterInjectToken } from '@/tokens';

export default defineComponent({
  props: ['component', 'rootRef'],
  setup(props: ViewComponentProps) {
    const adapter = inject(AdapterInjectToken)!
    return {
      slotRender() {
        const slot = props.component.slots.first
        return adapter.slotRender(slot, children => {
          return createVNode('div', null, children)
        })
      }
    }
  }
})
</script>
