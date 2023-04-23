import { Viewer } from '@textbus/platform-browser'
import {
  blockquoteComponent, blockquoteComponentLoader,
  paragraphComponent,
  paragraphComponentLoader,
  rootComponent,
  rootComponentLoader
} from '@/textbus/components/_api'
import { LeftToolbarPlugin } from '@/plugins/left-toolbar/left-toolbar.plugin';
import { LeftToolbarService } from '@/services/left-toolbar.service';

export class Editor extends Viewer {
  constructor() {
    super(rootComponent, rootComponentLoader, {
      zenCoding: true,
      components: [
        blockquoteComponent,
        paragraphComponent,
      ],
      componentLoaders: [
        blockquoteComponentLoader,
        paragraphComponentLoader,
      ],
      providers: [
        LeftToolbarService
      ],
      plugins: [
        () => new LeftToolbarPlugin()
      ]
    })
  }
}
