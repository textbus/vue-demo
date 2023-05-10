import { Attribute, RenderMode, VElement } from '@textbus/core';
import { AttributeLoader, AttributeLoaderReadResult } from '@textbus/platform-browser';

export const alignAttribute: Attribute<string> = {
  name: 'align',
  render(node: VElement, formatValue: string, renderMode: RenderMode) {
    node.styles.set('textAlign', formatValue)
  }
}

export const alignAttrLoader: AttributeLoader<string> = {
  match(element: HTMLElement): boolean {
    return !!element.style.textAlign
  },
  read(element: HTMLElement): AttributeLoaderReadResult<string> {
    return {
      attribute: alignAttribute,
      value: element.style.textAlign
    }
  }
}
