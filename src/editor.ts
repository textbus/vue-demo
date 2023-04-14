import { Viewer } from '@textbus/platform-browser'
import {
  blockquoteComponent, blockquoteComponentLoader,
  paragraphComponent,
  paragraphComponentLoader,
  rootComponent,
  rootComponentLoader
} from '@/textbus/components/_api'

export class XNote extends Viewer {
  constructor() {
    super(rootComponent, rootComponentLoader, {
      components: [
        blockquoteComponent,
        paragraphComponent,
      ],
      componentLoaders: [
        blockquoteComponentLoader,
        paragraphComponentLoader,
      ]
    })
  }
}
