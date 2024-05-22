import { InjectionKey } from 'vue'
import { Textbus } from '@textbus/core'
import { VueAdapter } from '@textbus/adapter-vue'

export const TextbusInjectToken: InjectionKey<Textbus> = Symbol('Textbus')
export const AdapterInjectToken: InjectionKey<VueAdapter> = Symbol('Adapter')
