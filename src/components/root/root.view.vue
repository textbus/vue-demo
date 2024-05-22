<template>
  <div data-component="root" :ref="rootRef">
    <component :is="slotRender()"/>
  </div>
</template>
<script lang="ts">
// 创建视图 Vue 根组件
import { defineComponent, inject } from 'vue'
import { ViewComponentProps } from '@textbus/adapter-vue'
import { createVNode } from '@textbus/core'
import { AdapterInjectToken } from '@/tokens'
import { RootComponent } from '@/components/root/root.component'

export default defineComponent({
  props: ['component', 'rootRef'],
  setup (props: ViewComponentProps<RootComponent>) {
    const adapter = inject(AdapterInjectToken)!
    return {
      slotRender () {
        const slot = props.component.state.slot
        return adapter.slotRender(slot, children => {
          return createVNode('div', null, children)
        })
      }
    }
  }
})
</script>
