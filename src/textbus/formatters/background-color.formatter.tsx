import { FormatHostBindingRender, Formatter, RenderMode, VElement, VTextNode } from '@textbus/core';

export const backgroundColorFormatter: Formatter<string> = {
  name: 'backgroundColor',
  columned: true,
  render(children: Array<VElement | VTextNode>, formatValue: string, renderMode: RenderMode): VElement | FormatHostBindingRender {
    return (
      <span style={{
        backgroundColor: formatValue
      }}>{children}</span>
    )
  }
}
