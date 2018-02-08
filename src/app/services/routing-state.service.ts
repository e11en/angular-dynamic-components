import { Injectable } from '@angular/core';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { Action, Store } from '@ngrx/store';

@Injectable()
export class RoutingStateService {

  constructor(private store: Store<RoutingState>) {}

  test() {
    this.store.dispatch({ type: 'NAVIGATE_TO', payload: {} });
  }

}

export interface RoutingState {
  history: Array<string>;
  currentObj: string;
  loading: boolean;
  pending: boolean;
}

export function routeReducer(state: Array<any> = [], action: Action) {
  switch (action.type) {
      case 'NAVIGATE_TO':
          return state = action.payload;
      default:
          return state;
  }
}
