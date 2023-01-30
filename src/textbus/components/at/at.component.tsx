import {
  ComponentInitData,
  ComponentInstance,
  ContentType,
  defineComponent,
  onContentInsert, Selection,
  Slot, useContext, useSelf,
  useSlots,
} from '@textbus/core';
import { ComponentLoader, SlotParser } from '@textbus/platform-browser';
import { Injector } from '@tanbo/di';

export interface AtComponentOption {
  id: string
  username: string
}

export const atComponent = defineComponent({
  type: ContentType.InlineComponent,
  name: 'AtComponent',
  setup(initData?: ComponentInitData<void>) {
    const slots = useSlots(initData?.slots || [new Slot([
      ContentType.Text
    ])])

    const self = useSelf()

    let options: AtComponentOption[] = []

    const injector = useContext()

    const selection = injector.get(Selection)

    onContentInsert(ev => {
      const t = ev.data.content
      const text = slots.get(0)!.toString() + t
      setTimeout(() => {
        options = [{
          username: text + '张三',
          id: 'fdsafdsafdsa'
        }, {
          username: text + '李四',
          id: '543543'
        }]
        self.changeMarker.forceMarkDirtied()
      }, 1000)
    })

    return {
      render(slotRender) {
        return (
          <span component-name="AtComponent">@
            {
              slotRender(slots.get(0)!, (children) => {
                return <span>{children}</span>
              })

            }
            <span style="position:relative">
              <div style={{
                position: 'absolute'
              }}>
                {
                  options.map(option => {
                    return <div style={{
                      whiteSpace: 'nowrap'
                    }} onClick={() => {
                      const slot = slots.get(0)!
                      slot.retain(0)
                      slot.delete(slot.length)
                      slot.insert(option.username)

                      const parentSlot = self.parent!

                      const index = parentSlot.indexOf(self)

                      selection.setPosition(parentSlot, index + 1)
                    }
                    }>{option.username}</div>
                  })
                }
              </div>
            </span>
          </span>
        )
      }
    }
  }
})

export const atComponentLoader: ComponentLoader = {
  match(element: HTMLElement): boolean {
    return element.tagName === 'SPAN' && element.getAttribute('component-name') === 'AtComponent'
  },
  read(element: HTMLElement, context: Injector, slotParser: SlotParser): ComponentInstance {
    return atComponent.createInstance(context, {
      slots: [
        slotParser(new Slot([
          ContentType.Text
        ]), element.children[0] as HTMLElement)
      ]
    })
  }
}
