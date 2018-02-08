/* tslint:disable:component-class-suffix */
import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { AppState, RouteState } from '@app/state/app.state';
import { ComponentService } from '@app/services/component.service';

@Component({
  selector: 'app-list',
  template: `
    <app-big></app-big>
  `,
})
export class ComponentBuilder {

  constructor(private store: Store<RouteState>) {
    // this.store.dispatch({type: 'SET_METADATA', payload: [{ title: 'hallo', paragraph: 'test 123'}]});
   }
}
