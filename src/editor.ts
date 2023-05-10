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
import { boldFormatLoader, boldFormatter } from '@/textbus/formatters/bold.formatter';
import { fontSizeFormatLoader, fontSizeFormatter } from '@/textbus/formatters/font-size.formatter';
import { alignAttribute, alignAttrLoader } from '@/textbus/attrs/align.attribute';
import { backgroundColorFormatter } from '@/textbus/formatters/background-color.formatter';

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
      attributes: [
        alignAttribute
      ],
      attributeLoaders: [
        alignAttrLoader
      ],
      formatters: [
        backgroundColorFormatter,
        boldFormatter,
        fontSizeFormatter
      ],
      formatLoaders: [
        boldFormatLoader,
        fontSizeFormatLoader
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
