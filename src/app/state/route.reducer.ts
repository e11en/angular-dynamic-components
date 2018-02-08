import { Action } from '@ngrx/store';

export function metaDataReducer(state: [{title: 'test', paragraph: 'test'}], action: Action) {
  switch (action.type) {
      case 'SET_METADATA':
          return state = action.payload;
      default:
          return state;
  }
}
