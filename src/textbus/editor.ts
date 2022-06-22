import { createEditor, defaultComponentLoaders, Toolbar, defaultTools } from '@textbus/editor';
import '@textbus/editor/bundles/textbus.min.css'
import { alertComponentLoader } from './components/alert/alert.component';
import { alertTool } from './components/alert/alert.tool';
import { AtPlugin } from './components/at/at.plugin';


defaultComponentLoaders.push(alertComponentLoader)
defaultComponentLoaders.unshift(alertComponentLoader)
export function createTextbusEditor(host: HTMLElement) {
  const editor = createEditor({
    plugins: [
      () => new Toolbar([
        ...defaultTools,
        alertTool
      ]),
      () => new AtPlugin()
    ]
  })
  editor.mount(host)
  return editor
}
