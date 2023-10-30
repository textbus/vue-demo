import { Commander, ContentType, Selection, defineComponent, onBreak, Slot, useContext, useSelf } from '@textbus/core'

// 创建 Textbus 段落组件
export const paragraphComponent = defineComponent({
  name: 'ParagraphComponent',
  type: ContentType.BlockComponent,
  validate (initData) {
    return {
      slots: [
        initData?.slots?.[0] || new Slot([
          ContentType.Text,
          ContentType.InlineComponent
        ])
      ]
    }
  },
  setup () {
    const context = useContext()
    const commander = useContext(Commander)
    const selection = useContext(Selection)
    const self = useSelf()

    onBreak(ev => {
      ev.preventDefault()
      const nextContent = ev.target.cut(ev.data.index)
      const p = paragraphComponent.createInstance(context, {
        slots: [nextContent]
      })
      commander.insertAfter(p, self)
      selection.selectFirstPosition(p)
    })
  }
})
