import { VElement } from '@textbus/core';
declare global {
    namespace JSX {
        interface Element extends VElement {
        }
        interface IntrinsicAttributes {
            [key: string]: any
        }
        interface IntrinsicElements {
            [elemName: string]: any;
        }
        interface Attributes {
            [key: string]: any
        }
    }
}
