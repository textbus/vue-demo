import { Injector, Plugin } from '@textbus/core'
import { App, createApp } from 'vue';

import LeftToolbar from './left-toolbar.vue';
import { VIEW_DOCUMENT } from '@textbus/platform-browser';
import { reflectiveInjectorPlugin } from '@tanbo/vue-di-plugin';

export class LeftToolbarPlugin implements Plugin {
  private app: App | null = null

  setup(injector: Injector) {
    this.app = createApp(LeftToolbar).use(reflectiveInjectorPlugin, injector)
    const viewDocument = injector.get(VIEW_DOCUMENT)
    const container = document.createElement('div')
    viewDocument.appendChild(container)
    this.app.mount(container)
  }

  onDestroy() {
    this.app?.unmount()
  }
}
