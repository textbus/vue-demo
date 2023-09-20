import { ContentType, defineComponent, onContentInsert, Selection, Slot, useContext } from '@textbus/core';
import { paragraphComponent } from '@/components/paragraph/paragraph.component';

// 创建 Textbus 根组件
export const rootComponent = defineComponent({
  name: 'RootComponent',
  type: ContentType.BlockComponent,
  validate(initData) {
    return {
      slots: [
        initData?.slots?.[0] || new Slot([
          ContentType.Text,
          ContentType.InlineComponent,
          ContentType.BlockComponent
        ])
      ]
    }
  },

  setup() {
    const selection = useContext(Selection)
    const textbus = useContext()
    // 监听内容插入事件

    onContentInsert(ev => {
      // 当插入的内容是一个字符串或行内组件时，我们将创建新的段落
      if (typeof ev.data.content === 'string' || ev.data.content.type !== ContentType.BlockComponent) {
        // 创建新的插槽，并把内容插入在新插槽内
        const slot = new Slot([
          ContentType.Text,
          ContentType.InlineComponent
        ])
        slot.insert(ev.data.content)

        // 创建新的段落组件，并把插槽传给段落组件
        const p = paragraphComponent.createInstance(textbus, {
          slots: [slot]
        })
        // 在 rootComponent 的插槽内插入新段落
        ev.target.insert(p)
        // 设置光标为段落组件插槽的索引位置
        selection.setPosition(slot, slot.index)
        // 阻止默认的插入事件
        ev.preventDefault()
      }
    })
  }
})
