import { BrowserModule } from '@textbus/platform-browser'
import { ContentType, Slot, Textbus } from '@textbus/core'
import { createApp } from 'vue'
import { VueAdapter } from '@textbus/adapter-vue'
import { RootComponent } from '@/components/root/root.component'
import { ParagraphComponent } from '@/components/paragraph/paragraph.component'

import './app.css'

import RootView from '@/components/root/root.view.vue'
import ParagraphView from '@/components/paragraph/paragraph.view.vue'
import { AdapterInjectToken, TextbusInjectToken } from '@/tokens'

// 实例化 Vue 适配器
const adapter = new VueAdapter({
  // 添加渲染组件映射关系
  [RootComponent.componentName]: RootView as any,
  [ParagraphComponent.componentName]: ParagraphView as any
}, (host, root) => {
  // 使用 Vue 渲染 Textbus 视图
  const app = createApp(root).provide(TextbusInjectToken, textbus).provide(AdapterInjectToken, adapter)
  app.mount(host)
  return () => {
    app.unmount()
  }
})
// 实例化浏览器模块
const browserModule = new BrowserModule({
  adapter, // 添加 Vue 适配器,
  renderTo (): HTMLElement {
    return document.getElementById('app')!
  }
})
// 实例化 Textbus
const textbus = new Textbus({
  imports: [
    browserModule
  ],
  components: [
    RootComponent,
    ParagraphComponent
  ]
})

// 创建根组件实例
const rootModel = new RootComponent(textbus, { slot: new Slot([ContentType.BlockComponent]) })

// 使用 Textbus 启动渲染
textbus.render(rootModel)
