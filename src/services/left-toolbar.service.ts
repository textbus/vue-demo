import { ComponentInstance, distinctUntilChanged, Injectable, Observable, Subject } from '@textbus/core';

@Injectable()
export class LeftToolbarService {
  onComponentActive: Observable<ComponentInstance | null>

  private componentActiveEvent = new Subject<ComponentInstance | null>()

  constructor() {
    this.onComponentActive = this.componentActiveEvent.asObservable().pipe(distinctUntilChanged())
  }

  updateActiveComponent(current: ComponentInstance | null) {
    this.componentActiveEvent.next(current)
  }
}
