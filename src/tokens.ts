import { InjectionKey } from 'vue'
import { Textbus } from '@textbus/core'
import { Adapter } from '@textbus/adapter-vue'

export const TextbusInjectToken: InjectionKey<Textbus> = Symbol('Textbus')
export const AdapterInjectToken: InjectionKey<Adapter> = Symbol('Adapter')
