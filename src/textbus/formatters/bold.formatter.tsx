import { FormatHostBindingRender, Formatter, RenderMode, VElement, VTextNode } from '@textbus/core';
import { FormatLoader, FormatLoaderReadResult } from '@textbus/platform-browser';

export const boldFormatter: Formatter<boolean> = {
  name: 'bold',
  render(children: Array<VElement | VTextNode>, formatValue: boolean, renderMode: RenderMode): VElement | FormatHostBindingRender {
    return (
      <strong>{children}</strong>
    )
  }
}

export const boldFormatLoader: FormatLoader<boolean> ={
  match(element: HTMLElement): boolean {
    // return element.tagName.toLowerCase() === 'span' && element.getAttribute('mark') === '李四'
    // element.style.fontWeight === 500
   return element.tagName=== 'B' || element.tagName.toLowerCase() === 'strong'
  },
  read(element: HTMLElement): FormatLoaderReadResult<boolean> {
    return {
      formatter: boldFormatter,
      value: true
    }
  }
}
