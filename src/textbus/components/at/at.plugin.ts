import { Plugin } from '@textbus/browser';
import { Injector } from '@tanbo/di';
import { Commander, ContentType, Keyboard, Selection } from '@textbus/core';
import { atComponent } from './at.component';

export class AtPlugin implements Plugin {
  setup(injector: Injector) {
    const keyboard = injector.get(Keyboard)
    const selection = injector.get(Selection)
    const commander = injector.get(Commander)

    keyboard.addShortcut({
      keymap: {
        key: '@',
        shiftKey: true
      },
      action() {
        if (selection.commonAncestorSlot!.schema.includes(ContentType.InlineComponent)) {
          const component = atComponent.createInstance(injector)
          commander.insert(component)
          selection.setPosition(component.slots.get(0)!, 0)
        }
      }
    })
  }
}
