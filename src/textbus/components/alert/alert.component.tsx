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
import { ComponentLoader, SlotParser } from '@textbus/platform-browser'
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
      render(slotRender: SlotRender): VElement {
        return (
          <div class="alert" ref={box as any}>
            <div>这是 Alert 组件，这里的内容是不可以编辑的</div>
            {
              slotRender(slots.get(0)!, (children) => {
                return <div>{children}</div>
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
