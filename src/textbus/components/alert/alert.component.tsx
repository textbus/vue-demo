import {
  ComponentInstance,
  ComponentExtends,
  ContentType,
  defineComponent, onViewInit,
  Slot,
  SlotRender, useRef,
  useSlots,
  VElement, ComponentInitData
} from '@textbus/core'
import { ComponentLoader, SlotParser } from '@textbus/browser'
import { Injector } from '@tanbo/di'

export const alertComponent = defineComponent<ComponentExtends>({
  type: ContentType.BlockComponent,
  name: 'AlertComponent',
  setup(data?: ComponentInitData): ComponentExtends {
    const slots = useSlots(data?.slots || [new Slot([
        ContentType.Text
      ])
    ])

    const box = useRef<HTMLElement>()

    onViewInit(() => {
      console.log(box.current)
    })

    return {
      render(isOutputMode: boolean, slotRender: SlotRender): VElement {
        return (
          <div class="alert" ref={box}>
            <div>这是 Alert 组件，这里的内容是不可以编辑的</div>
            {
              slotRender(slots.get(0)!, () => {
                return <div/>
              })
            }
          </div>
        )
      }
    }
  }
})

export const alertComponentLoader: ComponentLoader = {
  resources: {
    styles: [
      `.alert { border-radius: 3px; border: 1px solid #ccc; background: #eee; padding: 5px 15px}`
    ],
  },
  match(element: HTMLElement): boolean {
    return element.tagName.toLowerCase() === 'div' && element.className === 'alert'
  },
  read(element: HTMLElement, context: Injector, slotParser: SlotParser): ComponentInstance {
    const slot = new Slot([
      ContentType.Text
    ])
    slotParser(slot, element.children[1]! as HTMLElement)
    return alertComponent.createInstance(context, {
      slots: [slot]
    })
  }
}
