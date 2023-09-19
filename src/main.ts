import { BrowserModule } from '@textbus/platform-browser'
import {
  Commander,
  ContentType,
  createVNode,
  defineComponent,
  onBreak, onContentInsert,
  Selection,
  Slot,
  Textbus,
  useContext,
  useSelf,
} from '@textbus/core'
import { createApp, defineComponent as defineVue } from 'vue'
import { Adapter, ViewComponentProps } from '@textbus/adapter-vue'

// 创建视图 Vue 根组件
const rootComponentView = defineVue({
  props: ['component', 'rootRef'],
  setup(props: ViewComponentProps) {
    return () => {
      const slot = props.component.slots.first
      return (
        adapter.slotRender(slot, children => {
          return createVNode('div', {
            'textbus-document': 'true',
            ref: props.rootRef
          }, children)
        })
      )
    }
  }
})

// 创建视图 Vue 段落组件
const paragraphView = defineVue({
  props: ['component', 'rootRef'],
  setup(props: ViewComponentProps) {
    return () => {
      const slot = props.component.slots.first
      return (
        adapter.slotRender(slot, children => {
          return createVNode('p', { ref: props.rootRef }, children)
        })
      )
    }
  }
})

// 创建 Textbus 根组件
const rootComponent = defineComponent({
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

// 创建 Textbus 段落组件
const paragraphComponent = defineComponent({
  name: 'ParagraphComponent',
  type: ContentType.BlockComponent,
  validate(initData) {
    return {
      slots: [
        initData?.slots?.[0] || new Slot([
          ContentType.Text,
          ContentType.InlineComponent
        ])
      ]
    }
  },
  setup() {
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

// 实例化 Vue 适配器
const adapter = new Adapter({
  // 添加渲染组件映射关系
  [rootComponent.name]: rootComponentView,
  [paragraphComponent.name]: paragraphView
}, (host, root) => {
  // 使用 Vue 渲染 Textbus 视图
  const app = createApp(root).provide('textbus', textbus)
  app.mount(host)
  return () => {
    app.unmount()
  }
})
// 实例化浏览器模块
const browserModule = new BrowserModule(document.getElementById('app')!, {
  adapter, // 添加 Vue 适配器
})
// 实例化 Textbus
const textbus = new Textbus({
  imports: [
    browserModule
  ],
  components: [
    rootComponent,
    paragraphComponent
  ]
})

// 创建根组件实例
const rootModel = rootComponent.createInstance(textbus)

// 使用 Textbus 启动渲染
textbus.render(rootModel)
