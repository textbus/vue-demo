import { ButtonTool } from '@textbus/editor'
import { Commander, ContentType, Slot, Selection } from '@textbus/core'
import { alertComponent } from './alert.component'

export function alertTool() {
  return new ButtonTool(injector => {
    const commander = injector.get(Commander)
    const selection = injector.get(Selection)
    return {
      label: '插入 Alert 组件',
      onClick() {
        const slot = new Slot([
          ContentType.Text
        ])
        const component = alertComponent.createInstance(injector, {
          slots: [slot]
        })
        commander.insert(component)
        selection.setPosition(slot, 0)
      }
    }
  })
}
