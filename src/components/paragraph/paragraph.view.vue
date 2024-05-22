<template>
  <div :ref="rootRef" data-component="paragraph">
    <component :is="slotRender()"/>
  </div>
</template>
<script lang="ts">
// 创建视图 Vue 段落组件
import { defineComponent, inject } from 'vue'
import { ViewComponentProps } from '@textbus/adapter-vue'
import { createVNode } from '@textbus/core'
import { AdapterInjectToken } from '@/tokens'
import { ParagraphComponent } from '@/components/paragraph/paragraph.component'

export default defineComponent({
  props: ['component', 'rootRef'],
  setup (props: ViewComponentProps<ParagraphComponent>) {
    const adapter = inject(AdapterInjectToken)!
    return {
      slotRender () {
        const slot = props.component.state.slot
        return (
          adapter.slotRender(slot, children => {
            return createVNode('p', null, children)
          })
        )
      }
    }
  }
})
</script>
